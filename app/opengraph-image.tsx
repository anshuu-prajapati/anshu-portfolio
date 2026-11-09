import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/data';

export const alt = `${SITE.name}, AI Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  const tags = ['Agentic AI', 'RAG', 'Voice AI', 'MCP', 'Computer Vision'];
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0D1120', color: '#E7EBF5', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#9AA3BB' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#22B573' }} />
          anshu.tech
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 128, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95 }}>Anshu Prajapati</div>
          <div style={{ fontSize: 52, color: '#7686FF', marginTop: 18, fontWeight: 700 }}>AI Engineer</div>
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {tags.map((t) => (
            <div key={t} style={{ fontSize: 26, padding: '10px 22px', borderRadius: 999, border: '2px solid #283049', background: '#161B2D' }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
