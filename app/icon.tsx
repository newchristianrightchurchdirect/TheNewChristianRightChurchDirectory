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
          background: '#0d0b07',
          color: '#d8b76a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 600,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-1px',
          borderRadius: 4,
          border: '1px solid #2c2519',
        }}
      >
        H
      </div>
    ),
    { ...size },
  )
}
