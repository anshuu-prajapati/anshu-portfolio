import type { CSSProperties } from 'react';
import Effects from '@/components/Effects';
import { BADGES, CLUSTERS, FLOW, ICONS, KEYWORDS, METRICS, PROJECTS, SITE, SKILLS, SOCIALS } from '@/lib/data';

type V = CSSProperties & Record<`--${string}`, string | number>;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: SITE.name,
      alternateName: ['Anshu', 'anshuu-prajapati'],
      jobTitle: 'AI Engineer',
      description: SITE.description,
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      email: `mailto:${SITE.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
      worksFor: { '@type': 'Organization', name: 'Maaze Underwriting Pvt Solutions' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indira Gandhi National Open University' },
      knowsAbout: KEYWORDS.slice(2),
      award: ['Winner, DS2S International Hackathon', 'Smart India Hackathon finalist', 'GDG Program Achievement'],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', name: 'AI/ML Certification', recognizedBy: { '@type': 'Organization', name: 'IBM' } },
        { '@type': 'EducationalOccupationalCredential', name: 'AI/ML Certification', recognizedBy: { '@type': 'Organization', name: 'Cisco' } },
      ],
      sameAs: [...SOCIALS.map((s) => s.href), 'https://clip.anshu.tech', 'https://me.anshu.tech'],
    },
    { '@type': 'ProfilePage', '@id': `${SITE.url}/#profile`, url: SITE.url, name: SITE.title, mainEntity: { '@id': `${SITE.url}/#person` } },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: `${SITE.name} – AI Engineer`, publisher: { '@id': `${SITE.url}/#person` } },
  ],
};

const letters = (word: string) => [...word].map((ch, i) => <span key={i} aria-hidden="true">{ch}</span>);

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav" aria-label="Main">
        <div className="nav-in">
          <a className="mark" href="#top">anshu</a>
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#achievements">Achievements</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href={SITE.resumePdf} download>Résumé</a></li>
          </ul>
          <div className="nav-r">
            <button className="theme" id="themeBtn" type="button" aria-label="Switch between light and dark theme" title="Light / dark">
              <svg className="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
              <svg className="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            </button>
            <a className="hello" href="#contact">Say hello</a>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <canvas id="net" aria-hidden="true" />
        <div className="hero-in wrap">
          <p className="status"><i />AI Engineer at Maaze Underwriting, Delhi</p>
          <h1 id="name">
            <span className="sr-only">Anshu Prajapati, AI Engineer</span>
            {letters('Anshu')}<br />{letters('Prajapati')}
          </h1>
          <p className="stream" id="stream" data-text={SITE.tagline}>{SITE.tagline}</p>
          <div className="ctas">
            <a className="btn primary" href="#work">See the work</a>
            <a className="btn" href={SITE.resumePdf} download>Download résumé</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </div>
        <p className="hint">Move your cursor over my name. The letters pay attention to you.</p>
      </header>

      <main>
        <section className="impact" aria-labelledby="impact-h">
          <div className="wrap">
            <div className="panel">
              <div className="panel-head">
                <span className="live" id="impact-h"><i />Running in production</span>
                <span>Maaze Underwriting, since January 2026</span>
              </div>
              <div className="metrics">
                {METRICS.map((m) => (
                  <div className="metric" key={m.text}>
                    <div className="m-val" data-to={m.to} data-suffix={m.suffix}>{m.to.toLocaleString('en-US')}{m.suffix}</div>
                    <p>{m.text}</p>
                    <svg className="spark" viewBox="0 0 120 38" preserveAspectRatio="none" aria-hidden="true"><path pathLength={1} d={m.d} /></svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-h">
          <div className="pin" id="pin">
            <div className="wrap work-head">
              <h2 id="work-h">Selected work</h2>
              <p className="lede" id="workLede">Keep scrolling to move through the projects. Hover a card to run its pipeline.</p>
            </div>
            <div className="track" id="track">
              {PROJECTS.map((p) => (
                <article className="proj" key={p.title}>
                  <div className="proj-top"><span>{p.kind}</span>{p.award && <span className="award">{p.award}</span>}</div>
                  <h3>{p.title}</h3>
                  <p className="proj-what">{p.what}</p>
                  <ol className="pipe">{p.pipe.map((s, i) => <li key={s} style={{ '--i': i } as V}>{s}</li>)}</ol>
                  <p className="proj-detail">{p.detail}{p.code && <> <code>{p.code}</code></>}</p>
                  <ul className="tech">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="proj-links">
                    {p.links.map(([label, href]) => <a key={href} className="proj-link" href={href} target="_blank" rel="noopener">{label}</a>)}
                  </div>
                </article>
              ))}
            </div>
            <div className="progress" aria-hidden="true"><span id="workbar" /></div>
          </div>
        </section>

        <section className="exp" id="experience" aria-labelledby="exp-h">
          <div className="wrap exp-grid">
            <div className="exp-side">
              <h2 id="exp-h">What I’ve shipped</h2>
              <div className="job">
                <h3>AI Engineer</h3>
                <p>Maaze Underwriting Pvt Solutions, Delhi</p>
                <p>January 2026 to now</p>
              </div>
              <div className="job">
                <h3>AI Full Stack Developer</h3>
                <p>DMAC</p>
                <p>January 2025 to January 2026</p>
              </div>
              <div className="job edu">
                <h3>B.Sc. Computer Science</h3>
                <p>IGNOU, New Delhi, 2023 to 2026</p>
                <p>CGPA 8.2 out of 10</p>
              </div>
            </div>
            <div className="flow" id="flow">
              <div className="flow-line"><span id="flowfill" /></div>
              {FLOW.map((n) => (
                <div className="node" key={n.h}><h4>{n.h}</h4><p dangerouslySetInnerHTML={{ __html: n.p }} /></div>
              ))}
            </div>
          </div>
        </section>

        <section className="badges" id="achievements" aria-labelledby="ach-h">
          <div className="wrap">
            <h2 id="ach-h">Achievements</h2>
            <p className="lede">Each one comes with an access badge. Drag a badge to swing it, hover it to catch the light, click it to flip it over.</p>
          </div>
          <div className="stage" id="stage">
            {BADGES.map((b) => (
              <div className="pend" key={b.code} style={{ '--c': b.c, '--on': b.on } as V}>
                <div className="strap" />
                <div className="card" style={{ opacity: 0 }} role="button" tabIndex={0} aria-pressed="false" aria-label={`${b.issuer} ${b.tier}: ${b.title}. Press to flip, arrow keys to swing.`}>
                  <div className="card-in">
                    <div className="face front">
                      <div className="band"><b>{b.issuer}</b><span>{b.tier}</span></div>
                      <div className="photo"><svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[b.icon] }} /></div>
                      <div className="who">Anshu Prajapati</div>
                      <div className="title">{b.title}</div>
                      <div className="foot"><span className="bar" /><span className="code">{b.code}</span></div>
                      <div className="holo" /><div className="glare" />
                    </div>
                    <div className="face back">
                      <h5>{b.head}</h5>
                      <p>{b.body}</p>
                      {'link' in b && <a href={b.link[1]} target="_blank" rel="noopener">{b.link[0]}</a>}
                      <small>Click to flip back</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="wrap leet">Also solving on LeetCode: <b>89 problems</b>, including <b>16 Hard</b>, with the 50 Days Badge 2026.</p>
        </section>

        <section className="skills" id="skills" aria-labelledby="sk-h">
          <div className="wrap">
            <h2 id="sk-h">Skills, as an embedding space</h2>
            <p className="lede">
              <span className="map-only">Tools I use together sit close together. Hover or tap one to see its nearest neighbours.</span>
              <span className="list-only">The tools I use, grouped by what they work on together.</span>
            </p>
            <div className="space-wrap">
              <svg id="space" viewBox="0 0 1000 580" role="img" aria-label="Map of skills grouped by area">
                {Object.entries(CLUSTERS).map(([k, c]) => <text key={k} x={c.x} y={c.y} className="cl">{c.name}</text>)}
                <g id="links" />
                {SKILLS.map(([n, x, y, c]) => (
                  <g className="pt" key={n} tabIndex={0} role="button" aria-label={n} data-n={n} data-x={x} data-y={y}>
                    <circle cx={x} cy={y} r={6} className={CLUSTERS[c].k} />
                    <text x={x + 11} y={y + 5}>{n}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="sk-groups">
              {Object.entries(CLUSTERS).map(([k, c]) => (
                <div className="sk-group" key={k}>
                  <h3><i className={`i-${k}`} />{c.name}</h3>
                  <ul>{SKILLS.filter((s) => s[3] === k).map(([n]) => <li key={n}>{n}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="space-info" id="spaceInfo" aria-live="polite">Seven clusters: agents and LLMs, retrieval, vision, speech, backend, data and languages.</p>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="ct-h">
          <div className="wrap contact-grid">
            <div>
              <h2 id="ct-h">Let’s build something that survives real users.</h2>
              <p className="lede">Open to AI engineering roles, freelance agent and voice AI work, and computer vision collaborations.</p>
              <ul className="links">
                <li><a href={`mailto:${SITE.email}`}>Email <span>{SITE.email}</span></a></li>
                {SOCIALS.map((s) => (
                  <li key={s.key}><a href={s.href} target="_blank" rel="noopener me">{s.label} <span>{s.handle}</span></a></li>
                ))}
                <li><a href={SITE.resumePdf} download>Résumé <span>Download PDF</span></a></li>
              </ul>
            </div>
            <div className="term" id="term">
              <div className="term-bar"><i /><i /><i /><span>anshu@portfolio ~</span></div>
              <div className="term-out" id="tout" aria-live="polite" />
              <form id="tform" autoComplete="off">
                <label htmlFor="tin">$</label>
                <input id="tin" spellCheck={false} placeholder="type help and press Enter" />
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer><div className="wrap"><span>Anshu Prajapati, AI Engineer, Delhi</span><q>If it doesn’t survive real users, real edge cases and real load, it isn’t done.</q></div></footer>

      <Effects />
    </>
  );
}
