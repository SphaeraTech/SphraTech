import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION } from '@/utils/constants';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'SpheraTech — web development agency';

/**
 * The default social card, inherited by every page that doesn't set its own.
 * Colours are the DESIGN.md tokens; the red is the single accent, used as a
 * thin circuit rule rather than a fill.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#0A0D14',
          padding: '80px',
        }}
      >
        {/* circuit rule */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
          <div style={{ width: 120, height: 3, backgroundColor: '#EC3234' }} />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: '#EC3234',
              marginLeft: 8,
            }}
          />
        </div>

        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: '#F4F6F9',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            display: 'flex',
          }}
        >
          SpheraTech
        </div>

        <div
          style={{
            fontSize: 34,
            color: '#9AA3B2',
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.35,
            display: 'flex',
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    size
  );
}
