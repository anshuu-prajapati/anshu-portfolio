'use client';

import { useEffect } from 'react';
import { SITE } from '@/lib/data';

// A faithful port of the original index.html script, attached to server-rendered markup.
export default function Effects() {
  useEffect(() => {
    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const psig = { signal: ac.signal, passive: true };
    const observers: IntersectionObserver[] = [];
    const timers: number[] = [];
    let raf = 0;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector(s) as T;
    const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const mouse = { x: -9999, y: -9999, in: false };
    addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') { mouse.x = e.clientX; mouse.y = e.clientY; mouse.in = true; } }, psig);
    document.addEventListener('pointerleave', () => { mouse.in = false; mouse.x = mouse.y = -9999; }, sig);

    /* ---------- light / dark toggle ---------- */
    $('#themeBtn').addEventListener('click', () => {
      const root = document.documentElement;
      const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    }, sig);

    /* ---------- hero: name letters as attention weights ---------- */
    const letters = [...document.querySelectorAll<HTMLElement>('#name span[aria-hidden]')].map((el) => ({ el, w: 700 }));
    function tickLetters() {
      for (const l of letters) {
        let target = 700;
        if (mouse.in) {
          const r = l.el.getBoundingClientRect();
          const d = Math.hypot(mouse.x - (r.left + r.width / 2), mouse.y - (r.top + r.height / 2));
          target = 260 + Math.max(0, 1 - d / 340) * 540;
        }
        l.w += (target - l.w) * 0.14;
        l.el.style.setProperty('--w', l.w.toFixed(0));
      }
    }

    /* ---------- hero: neural network canvas ---------- */
    const cv = $<HTMLCanvasElement>('#net'), ctx = cv.getContext('2d')!;
    type N = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: N[] = [], W = 0, H = 0, heroVisible = true;
    function sizeNet() {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(95, Math.round((W * H) / 15000));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: 1.2 + Math.random() * 1.8 }));
    }
    const hexA = (hex: string, a: number) => {
      const h = hex.replace('#', '');
      const v = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
      return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
    };
    function drawNet() {
      const ink = css('--ink'), acc = css('--accent');
      const rect = cv.getBoundingClientRect();
      const mx = mouse.x - rect.left, my = mouse.y - rect.top;
      ctx.clearRect(0, 0, W, H);
      for (const p of nodes) {
        if (reduce) break;
        const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
        if (mouse.in && d < 180 && d > 0) { p.vx += (dx / d) * 0.02; p.vy += (dy / d) * 0.02; }
        p.vx *= 0.985; p.vy *= 0.985;
        p.vx += (Math.random() - 0.5) * 0.02; p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y));
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) { ctx.strokeStyle = hexA(ink, (1 - d / 130) * 0.16); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const dm = Math.hypot(a.x - mx, a.y - my);
        if (mouse.in && dm < 200) { ctx.strokeStyle = hexA(acc, (1 - dm / 200) * 0.7); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke(); }
        ctx.fillStyle = mouse.in && dm < 200 ? acc : hexA(ink, 0.35);
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    const heroIO = new IntersectionObserver((e) => { heroVisible = e[0].isIntersecting; });
    heroIO.observe(cv); observers.push(heroIO);

    /* ---------- hero: streamed tagline ---------- */
    const streamEl = $('#stream');
    const text = streamEl.dataset.text || '';
    streamEl.setAttribute('aria-label', text);
    streamEl.innerHTML = '<span aria-hidden="true" id="st"></span><span class="caret" aria-hidden="true"></span>';
    const st = $('#st');
    if (reduce) st.textContent = text;
    else {
      const toks = text.split(/(\s+)/); let k = 0;
      const next = () => { if (k < toks.length) { st.textContent += toks[k++]; timers.push(window.setTimeout(next, 30 + Math.random() * 70)); } };
      timers.push(window.setTimeout(next, 650));
    }

    /* ---------- impact count-up ---------- */
    const mio = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const m = en.target as HTMLElement; mio.unobserve(m); m.classList.add('on');
      const v = m.querySelector('.m-val') as HTMLElement, to = +(v.dataset.to || 0), suf = v.dataset.suffix || '';
      if (reduce) { v.textContent = to.toLocaleString('en-US') + suf; return; }
      const t0 = performance.now(), dur = 1500;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        v.textContent = Math.round(to * e).toLocaleString('en-US') + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      step(t0);
    }), { threshold: 0.4 });
    observers.push(mio);
    document.querySelectorAll('.metric').forEach((m) => mio.observe(m));

    /* ---------- work: pinned horizontal scroll + tilt ---------- */
    const work = $('#work'), track = $('#track'), pin = $('#pin'), bar = $('#workbar'), workLede = $('#workLede');
    let workDist = 0, pinned = false;
    function setupWork() {
      pinned = innerWidth >= 900 && !reduce;
      work.classList.toggle('pinned', pinned);
      workLede.textContent = pinned
        ? 'Keep scrolling to move through the projects. Hover a card to run its pipeline.'
        : 'Swipe sideways through the projects. Tap a card to run its pipeline.';
      track.style.transform = '';
      if (pinned) {
        const last = track.lastElementChild as HTMLElement;
        const padL = parseFloat(getComputedStyle(track).paddingLeft);
        workDist = Math.max(0, last.offsetLeft + last.offsetWidth + padL - pin.clientWidth);
        work.style.height = `${innerHeight + workDist}px`;
      } else work.style.height = '';
      onScroll();
    }
    document.querySelectorAll<HTMLElement>('.proj').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-py * 9).toFixed(2)}deg`);
      }, psig);
      card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }, sig);
    });

    /* ---------- experience flow line ---------- */
    const flow = $('#flow'), flowFill = $('#flowfill'), flowNodes = [...flow.querySelectorAll<HTMLElement>('.node')];
    function onScroll() {
      if (pinned) {
        const total = work.offsetHeight - innerHeight;
        const p = Math.max(0, Math.min(1, (scrollY - work.offsetTop) / (total || 1)));
        track.style.transform = `translate3d(${-p * workDist}px,0,0)`;
        bar.style.transform = `scaleX(${p})`;
      }
      const r = flow.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.62 - r.top) / r.height));
      flowFill.style.transform = `scaleY(${p})`;
      const reach = p * r.height;
      flowNodes.forEach((n) => n.classList.toggle('on', n.offsetTop <= reach + 4));
    }
    addEventListener('scroll', onScroll, psig);

    /* ---------- achievements: physics ID badges ---------- */
    const stage = $('#stage');
    const CARD_W = 200, CARD_H = 292;
    type Drag = { sx: number; sy: number; moved: boolean; off: number; pt: number; pth: number };
    const items = [...stage.querySelectorAll<HTMLElement>('.pend')].map((el, i) => ({
      el, card: el.querySelector('.card') as HTMLElement, strap: el.querySelector('.strap') as HTMLElement,
      theta: 0, omega: 0, len: -520, lenV: 0, target: 110 + [0, 34, 14, 40, 8, 26][i % 6], dropped: false,
      x: 0, y: 0, s: 1, tgt: 110, drag: null as Drag | null, dragged: false,
    }));
    let rails: HTMLElement[] = [];
    function layoutBadges() {
      const Wd = stage.clientWidth, gap = 26;
      let per = Math.floor((Wd - 32 + gap) / (CARD_W + gap));
      per = Math.max(2, Math.min(per, items.length));
      const rows = Math.ceil(items.length / per);
      per = Math.ceil(items.length / rows);
      const s = Math.min(1, (Wd - gap * (per + 1)) / per / CARD_W);
      const cw = CARD_W * s;
      const sp = Math.max(gap, Math.min(70, (Wd - per * cw) / (per + 1)));
      const rowH = 150 * s + 40 + CARD_H * s + 70;
      stage.style.height = `${rows * rowH}px`;
      rails.forEach((r) => r.remove()); rails = [];
      items.forEach((it, i) => {
        const row = Math.floor(i / per), col = i % per;
        const inRow = Math.min(per, items.length - row * per);
        const used = inRow * cw + (inRow - 1) * sp;
        const x0 = (Wd - used) / 2;
        it.x = x0 + col * (cw + sp) + cw / 2; it.y = row * rowH + 10; it.s = s;
        it.el.style.left = `${it.x}px`; it.el.style.top = `${it.y}px`;
        it.tgt = it.target * s;
        if (col === 0) {
          const rail = document.createElement('div'); rail.className = 'rail';
          rail.style.left = `${x0 - 20}px`; rail.style.width = `${used + 40}px`; rail.style.top = `${it.y}px`;
          stage.appendChild(rail); rails.push(rail);
        }
        const peg = document.createElement('div'); peg.className = 'peg';
        peg.style.left = `${it.x}px`; peg.style.top = `${it.y}px`;
        stage.appendChild(peg); rails.push(peg);
        if (reduce) { it.dropped = true; it.len = it.tgt; }
      });
    }
    const bio = new IntersectionObserver((en) => {
      if (!en[0].isIntersecting) return;
      bio.disconnect();
      if (!reduce) items.forEach((it, i) => timers.push(window.setTimeout(() => { it.dropped = true; it.omega = (i % 2 ? 1 : -1) * (0.6 + Math.random() * 0.5); }, i * 150)));
    }, { threshold: 0.2 });
    bio.observe(stage); observers.push(bio);

    items.forEach((it) => {
      const c = it.card;
      c.addEventListener('pointerdown', (e) => {
        if ((e.target as Element).closest('a')) return;
        const r = stage.getBoundingClientRect();
        const ang = -Math.atan2(e.clientX - (r.left + it.x), e.clientY - (r.top + it.y));
        it.drag = { sx: e.clientX, sy: e.clientY, moved: false, off: ang - it.theta, pt: performance.now(), pth: it.theta };
        c.setPointerCapture(e.pointerId);
      }, sig);
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width).toFixed(3));
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height).toFixed(3));
        const d = it.drag;
        if (!d) return;
        if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 6) d.moved = true;
        if (d.moved) {
          const sr = stage.getBoundingClientRect();
          const ang = -Math.atan2(e.clientX - (sr.left + it.x), e.clientY - (sr.top + it.y));
          const now = performance.now(), nt = Math.max(-1.25, Math.min(1.25, ang - d.off));
          const dt = Math.max(1, now - d.pt) / 1000;
          it.omega = ((nt - d.pth) / dt) * 0.6 + it.omega * 0.4;
          d.pt = now; d.pth = nt; it.theta = nt;
        }
      }, psig);
      const end = () => { if (it.drag) { it.dragged = it.drag.moved; it.omega = Math.max(-9, Math.min(9, it.omega)); it.drag = null; } };
      c.addEventListener('pointerup', end, sig); c.addEventListener('pointercancel', end, sig);
      c.addEventListener('pointerenter', (e) => { c.classList.add('hot'); if (e.pointerType === 'mouse' && !reduce) it.omega += (Math.random() - 0.5) * 0.5; }, sig);
      c.addEventListener('pointerleave', () => c.classList.remove('hot'), sig);
      const flip = () => { c.classList.toggle('flipped'); c.setAttribute('aria-pressed', String(c.classList.contains('flipped'))); };
      c.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) return; if (it.dragged) { it.dragged = false; return; } flip(); }, sig);
      c.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); it.omega += 2.2; }
        if (e.key === 'ArrowRight') { e.preventDefault(); it.omega -= 2.2; }
      }, sig);
    });
    function tickBadges(dt: number) {
      for (const it of items) {
        if (it.dropped) { const a = 170 * (it.tgt - it.len) - 11 * it.lenV; it.lenV += a * dt; it.len += it.lenV * dt; }
        if (!it.drag) {
          const L = Math.max(it.len, 0) + CARD_H * it.s * 0.55;
          const alpha = -(2600 / L) * Math.sin(it.theta) - 1.05 * it.omega;
          it.omega += alpha * dt; it.theta += it.omega * dt;
        }
        it.strap.style.height = `${Math.max(0, it.len)}px`;
        it.card.style.transform = `translateY(${Math.min(0, it.len)}px) scale(${it.s})`;
        it.card.style.opacity = String(Math.max(0, Math.min(1, (it.len + 360) / 260)));
        it.el.style.transform = `rotate(${it.theta}rad)`;
      }
    }

    /* ---------- skills embedding space ---------- */
    const svg = $<SVGSVGElement>('#space'), linksG = $('#links'), info = $('#spaceInfo');
    const NS = 'http://www.w3.org/2000/svg';
    const pts = [...svg.querySelectorAll<SVGGElement>('.pt')].map((g) => ({ g, n: g.dataset.n!, x: +g.dataset.x!, y: +g.dataset.y! }));
    function focusPt(p: (typeof pts)[number]) {
      const near = pts.filter((q) => q !== p).map((q) => ({ q, d: Math.hypot(q.x - p.x, q.y - p.y) })).sort((a, b) => a.d - b.d).slice(0, 3).map((o) => o.q);
      linksG.innerHTML = '';
      near.forEach((q) => {
        const l = document.createElementNS(NS, 'line');
        l.setAttribute('x1', String(p.x)); l.setAttribute('y1', String(p.y));
        l.setAttribute('x2', String(q.x)); l.setAttribute('y2', String(q.y)); l.setAttribute('class', 'lk');
        linksG.appendChild(l);
      });
      svg.classList.add('focus');
      pts.forEach((q) => { q.g.classList.toggle('hot', q === p || near.includes(q)); q.g.classList.toggle('me', q === p); });
      info.innerHTML = `<b>${p.n}</b> sits closest to ${near[0].n}, ${near[1].n} and ${near[2].n}.`;
    }
    pts.forEach((p) => (['pointerenter', 'focus', 'click'] as const).forEach((ev) => p.g.addEventListener(ev, () => focusPt(p), sig)));
    svg.addEventListener('pointerleave', () => { svg.classList.remove('focus'); linksG.innerHTML = ''; pts.forEach((q) => q.g.classList.remove('hot', 'me')); }, sig);

    /* ---------- terminal ---------- */
    const out = $('#tout'), tin = $<HTMLInputElement>('#tin');
    const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
    const print = (html: string, cls?: string) => {
      const d = document.createElement('div'); if (cls) d.className = cls; d.innerHTML = html;
      out.appendChild(d); out.scrollTop = out.scrollHeight;
    };
    const ext = (href: string, label: string) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
    const CMDS: Record<string, () => string> = {
      help: () => 'Commands: about, projects, skills, resume, email, github, linkedin,\nleetcode, kaggle, huggingface, x, clear\nTry this one too: sudo hire anshu',
      about: () => 'AI Engineer at Maaze Underwriting, Delhi; before that AI Full Stack Developer at DMAC.\nI build voice agents, WhatsApp agents, RAG systems, MCP servers and\nreal-time computer vision, and I keep them running in production.',
      projects: () => 'DocuSentinel      fake-document screening, SIH finalist\nGPS Voice Agent   Hindi and Hinglish calling agent\nClipForge         long video to ranked shorts, clip.anshu.tech\nMe (MCP)          my MCP server, me.anshu.tech\nTransitCount      live bus passenger counting\nStore Analytics   privacy-first CCTV metrics\nYT ASCII Player   pip install ytascii-player',
      skills: () => 'LangGraph, AWS Bedrock, RAG, MCP, Pinecone, Qdrant, YOLOv8, ByteTrack, Whisper,\nFastAPI, Docker, Kubernetes, PostgreSQL, Python, TypeScript',
      resume: () => `<span class="ok">Downloading.</span> <a href="${SITE.resumePdf}" download>Anshu_Prajapati_AI_Engineer_Resume.pdf</a>`,
      email: () => `<a href="mailto:${SITE.email}">${SITE.email}</a>`,
      github: () => ext('https://github.com/anshuu-prajapati', 'github.com/anshuu-prajapati'),
      linkedin: () => ext('https://www.linkedin.com/in/anshuu-prajapati', 'linkedin.com/in/anshuu-prajapati'),
      leetcode: () => `89 solved, 16 of them Hard. ${ext('https://leetcode.com/u/anshuu-prajapati/', 'leetcode.com/u/anshuu-prajapati')}`,
      kaggle: () => ext('https://www.kaggle.com/anshuuprajapati', 'kaggle.com/anshuuprajapati'),
      huggingface: () => ext('https://huggingface.co/anshuu-prajapati', 'huggingface.co/anshuu-prajapati'),
      x: () => ext('https://x.com/anshuuprajapati', 'x.com/anshuuprajapati'),
      'sudo hire anshu': () => `<span class="ok">Permission granted.</span> Opening a draft to <a href="mailto:${SITE.email}?subject=Let%E2%80%99s%20work%20together">${SITE.email}</a>`,
    };
    out.innerHTML = '';
    print('Welcome. Type <span class="cmd">help</span> and press Enter.');
    $('#tform').addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = tin.value.trim(); tin.value = '';
      if (!raw) return;
      print(`$ ${esc(raw)}`, 'cmd');
      const key = raw.toLowerCase().replace(/\s+/g, ' ');
      if (key === 'clear') { out.innerHTML = ''; return; }
      if (key.startsWith('sudo') && key !== 'sudo hire anshu') { print('Only one sudo command works here. Hint: it involves hiring.'); return; }
      const f = CMDS[key];
      print(f ? f() : `Command not found: ${esc(raw)}. Type help to see what works.`);
      if (key === 'resume') { const a = document.createElement('a'); a.href = SITE.resumePdf; a.download = ''; a.click(); }
    }, sig);
    $('#term').addEventListener('click', (e) => { if (!(e.target as Element).closest('a')) tin.focus({ preventScroll: true }); }, sig);

    /* ---------- main loop ---------- */
    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(0.033, (now - last) / 1000); last = now;
      if (heroVisible) { drawNet(); tickLetters(); }
      tickBadges(dt);
      raf = requestAnimationFrame(frame);
    }
    const relayout = () => { sizeNet(); setupWork(); layoutBadges(); };
    let rt = 0;
    addEventListener('resize', () => { clearTimeout(rt); rt = window.setTimeout(relayout, 120); }, psig);
    relayout();
    document.fonts?.ready.then(() => { if (!ac.signal.aborted) setupWork(); });
    raf = requestAnimationFrame(frame);

    return () => {
      ac.abort();
      observers.forEach((o) => o.disconnect());
      timers.forEach(clearTimeout);
      clearTimeout(rt);
      cancelAnimationFrame(raf);
      rails.forEach((r) => r.remove());
    };
  }, []);

  return null;
}
