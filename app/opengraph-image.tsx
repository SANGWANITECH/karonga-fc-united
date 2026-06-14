import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Karonga United FC — The Crocodiles of Karonga'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #0a0f1a 100%)',
          position: 'relative',
        }}
      >
        {/* Yellow top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: '#FFC72C',
          }}
        />

        {/* Club name */}
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-2px',
            lineHeight: 1,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>KARONGA</span>
          <span style={{ color: '#FFC72C', fontSize: 130 }}>UNITED FC</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          The Crocodiles of Karonga
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            fontSize: 24,
            color: '#FFC72C',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          TNM Super League · Est. 2008
        </div>

        {/* Yellow bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: '#FFC72C',
          }}
        />
      </div>
    ),
    { ...size }
  )
}