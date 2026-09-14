import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const BLUE = '#2A52FF';

// Google Fonts serves a static TTF instance to user agents without variable-font support.
async function loadFont(family, weight) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
    { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0' } }
  ).then(r => r.text());
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font URL for ${family} ${weight}`);
  return fetch(url).then(r => r.arrayBuffer());
}

const fontsPromise = Promise.all([
  loadFont('Bricolage+Grotesque', 800),
  loadFont('Plus+Jakarta+Sans', 500),
]).then(([display, body]) => [
  { name: 'Bricolage', data: display, weight: 800, style: 'normal' },
  { name: 'Jakarta', data: body, weight: 500, style: 'normal' },
]);

export default async function handler() {
  let fonts = [];
  try { fonts = await fontsPromise; } catch (_) { fonts = []; }

  const word = (text, color, alignRight) => ({
    type: 'div',
    props: {
      style: {
        fontFamily: fonts.length ? 'Bricolage' : 'sans-serif',
        fontSize: 168,
        fontWeight: 800,
        lineHeight: 0.84,
        letterSpacing: '-0.03em',
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
          fontFamily: fonts.length ? 'Jakarta' : 'sans-serif',
          fontWeight: 500,
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
