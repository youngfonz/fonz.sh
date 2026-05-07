import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0f',
          color: '#e0e0e0',
          fontFamily: 'monospace',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 24,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#C15F3C',
                      marginBottom: 32,
                    },
                    children: '> fonz.sh',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 96,
                      fontWeight: 700,
                      lineHeight: 1.05,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                    },
                    children: 'Fonz Morris',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 36,
                      color: '#888899',
                      marginTop: 16,
                      letterSpacing: '-0.01em',
                    },
                    children: 'Builder of AI apps and tools.',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                fontSize: 22,
                color: '#888899',
              },
              children: [
                { type: 'div', props: { children: 'Portfolio · 20+ shipped projects' } },
                { type: 'div', props: { style: { color: '#C15F3C' }, children: 'fonz.sh' } },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}
