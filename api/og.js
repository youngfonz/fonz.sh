import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const BLUE = '#2A52FF';

export default function handler() {
  const word = (text, color, alignRight) => ({
    type: 'div',
    props: {
      style: {
        fontSize: 158,
        fontWeight: 800,
        lineHeight: 0.86,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        color,
        alignSelf: alignRight ? 'flex-end' : 'flex-start',
        display: 'flex',
      },
      children: text,
    },
  });

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
          background: WHITE,
          color: BLACK,
          fontFamily: 'sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                padding: '22px 40px',
                borderBottom: `2px solid ${BLACK}`,
                fontSize: 20,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              },
              children: [
                { type: 'div', props: { children: 'Fonz Morris' } },
                { type: 'div', props: { children: 'Consulting · Forward Deploy on YouTube' } },
                { type: 'div', props: { children: 'fonz.sh' } },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', padding: '0 40px' },
              children: [
                word('Forward', BLACK, false),
                word('Deployed', BLACK, true),
                word('Engineer.', BLUE, false),
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
                padding: '22px 40px 36px',
                borderTop: `2px solid ${BLACK}`,
                fontSize: 26,
              },
              children: [
                { type: 'div', props: { style: { maxWidth: 760, lineHeight: 1.25 }, children: 'I deploy AI inside your business. Then I prove it moved a number.' } },
                { type: 'div', props: { style: { color: BLUE, fontWeight: 700 }, children: 'hello@fonzmorris.com' } },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630 }
  );
}
