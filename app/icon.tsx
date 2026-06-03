import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#faf6ec',
          color: '#7d5a1f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 600,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-1px',
          borderRadius: 4,
          border: '1px solid #1a1814',
        }}
      >
        H
      </div>
    ),
    { ...size },
  )
}
