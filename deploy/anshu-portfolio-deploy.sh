#!/usr/bin/env bash
# Installed on the server as /usr/local/bin/anshu-portfolio-deploy (root-owned).
# The GitHub Actions deploy key is locked to this command: it streams a release
# tarball on stdin, and this script unpacks it, switches the "current" symlink,
# restarts the service and rolls back if the new release fails its health check.
set -euo pipefail

APP_DIR=/opt/anshu-portfolio
RELEASES="$APP_DIR/releases"
SERVICE=anshu-portfolio
APP_USER=anshu-web
PORT=3010
KEEP=3

stamp="$(date -u +%Y%m%d%H%M%S)"
new="$RELEASES/$stamp"
tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

cat > "$tmp"
if [ ! -s "$tmp" ]; then echo "deploy: empty upload" >&2; exit 1; fi

mkdir -p "$new"
tar -xzf "$tmp" -C "$new"
test -f "$new/server.js" || { echo "deploy: server.js missing from bundle" >&2; rm -rf "$new"; exit 1; }
chown -R "$APP_USER:$APP_USER" "$new"

prev="$(readlink -f "$APP_DIR/current" 2>/dev/null || true)"
ln -sfn "$new" "$APP_DIR/current.tmp" && mv -Tf "$APP_DIR/current.tmp" "$APP_DIR/current"
systemctl restart "$SERVICE"

ok=0
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://127.0.0.1:$PORT/"; then ok=1; break; fi
  sleep 1
done

if [ "$ok" != 1 ]; then
  echo "deploy: health check failed for $stamp" >&2
  journalctl -u "$SERVICE" -n 30 --no-pager >&2 || true
  if [ -n "$prev" ] && [ -d "$prev" ]; then
    ln -sfn "$prev" "$APP_DIR/current.tmp" && mv -Tf "$APP_DIR/current.tmp" "$APP_DIR/current"
    systemctl restart "$SERVICE"
    echo "deploy: rolled back to $(basename "$prev")" >&2
  fi
  rm -rf "$new"
  exit 1
fi

# Keep the newest $KEEP releases.
ls -1dt "$RELEASES"/*/ 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -rf
echo "deploy: $stamp is live"
