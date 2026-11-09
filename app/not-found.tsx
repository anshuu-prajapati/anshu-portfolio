import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="nf">
      <p className="status"><i />404</p>
      <h1>This page wandered off.</h1>
      <p className="lede">The agent looked everywhere. It is not here.</p>
      <Link className="btn primary" href="/">Back to the portfolio</Link>
    </main>
  );
}
