import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const BLUE = '#2A52FF';

// Latin subsets of the site's own display and body faces, served as static files.
async function loadFonts(origin) {
  const [display, body] = await Promise.all([
    fetch(`${origin}/fonts/og/new-york-xl-bold.otf`).then(r => r.arrayBuffer()),
    fetch(`${origin}/fonts/og/sf-pro-text-regular.otf`).then(r => r.arrayBuffer()),
  ]);
  return [
    { name: 'New York', data: display, weight: 700, style: 'normal' },
    { name: 'SF Pro Text', data: body, weight: 400, style: 'normal' },
  ];
}

export default async function handler(req) {
  let fonts = [];
  try { fonts = await loadFonts(new URL(req.url).origin); } catch (_) { fonts = []; }

  const word = (text, color, alignRight) => ({
    type: 'div',
    props: {
      style: {
        fontFamily: fonts.length ? 'New York' : 'serif',
        fontSize: 150,
        fontWeight: 700,
        lineHeight: 0.9,
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
          fontFamily: fonts.length ? 'SF Pro Text' : 'sans-serif',
          fontWeight: 400,
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
                { type: 'div', props: { style: { maxWidth: 820, lineHeight: 1.25 }, children: 'I deploy AI inside your business. Then I prove it moved a number.' } },
                { type: 'div', props: { style: { color: BLUE, fontWeight: 700 }, children: 'hello@fonzmorris.com' } },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, fonts }
  );
}
