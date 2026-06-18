const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const C = {
  orange:'#FF9200', magenta:'#FF009C', teal:'#00B88A', yellow:'#E6B800', lilac:'#7C6AD0',
  bg:'#0c0c14', frame:'#1a1a26', white:'#ffffff', dim:'rgba(255,255,255,0.4)'
};

// phone frame + header + layer bar; `play` is inner SVG markup for the play area
function phone({accent, section, title, echo1, echo2, play, layersOn}){
  const segs = [C.orange,C.teal,C.lilac,C.magenta,C.yellow];
  let bar = '';
  for(let i=0;i<5;i++){
    const on = i < layersOn;
    bar += `<rect x="${20+i*70}" y="712" width="62" height="5" rx="2.5" fill="${on?segs[i]:'rgba(255,255,255,0.12)'}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="380" height="760" viewBox="0 0 380 760" font-family="Helvetica, Arial, sans-serif">
  <rect x="2" y="2" width="376" height="756" rx="40" fill="${C.bg}" stroke="${C.frame}" stroke-width="3"/>
  <rect x="135" y="2" width="110" height="22" rx="11" fill="${C.frame}"/>
  <text x="190" y="58" text-anchor="middle" fill="${accent}" font-size="11" font-weight="bold" letter-spacing="1.5">${section}</text>
  <text x="190" y="82" text-anchor="middle" fill="${C.white}" font-size="20" font-weight="bold">${title}</text>
  <rect x="22" y="98" width="336" height="48" rx="10" fill="${C.lilac}" fill-opacity="0.16" stroke="${C.lilac}" stroke-opacity="0.35"/>
  <text x="38" y="119" fill="#cfc7f0" font-size="11.5"><tspan font-weight="bold" fill="#fff">ECHO  </tspan>${echo1}</text>
  <text x="38" y="135" fill="#cfc7f0" font-size="11.5">${echo2}</text>
  ${play}
  ${bar}
</svg>`;
}

// ---------- STAGE 1: drums falling tiles, 4 lanes ----------
function stage1play(){
  const lanes = 4, x0=24, w=332, gap=8, lw=(w-gap*(lanes-1))/lanes, top=168, h=486;
  let s='';
  for(let i=0;i<lanes;i++){
    s+=`<rect x="${x0+i*(lw+gap)}" y="${top}" width="${lw}" height="${h}" rx="8" fill="rgba(255,255,255,0.03)"/>`;
  }
  const tile=(lane,y,c)=>`<rect x="${x0+lane*(lw+gap)+5}" y="${y}" width="${lw-10}" height="46" rx="6" fill="${c}"/>`;
  s+=tile(0,210,C.orange)+tile(0,470,C.orange);
  s+=tile(1,300,'#ffb44d');
  s+=tile(2,250,C.orange)+tile(2,540,C.orange);
  s+=tile(3,380,'#ffb44d');
  const hy=590;
  s+=`<rect x="${x0}" y="${hy}" width="${w}" height="3" fill="rgba(255,255,255,0.5)"/>`;
  const labels=['KICK','SNARE','KICK','SNARE'];
  for(let i=0;i<4;i++){
    s+=`<text x="${x0+i*(lw+gap)+lw/2}" y="${hy+22}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9" font-weight="bold" letter-spacing="0.6">${labels[i]}</text>`;
  }
  return s;
}

// ---------- STAGE 2: bass grid, drums row + bass row ----------
function stage2play(){
  let s='';
  const x0=24, w=332, cols=8, gap=5, cw=(w-gap*(cols-1))/cols;
  function row(y, label, lc, pattern, color, sweep){
    s+=`<text x="${x0}" y="${y-8}" fill="${lc}" font-size="9" font-weight="bold" letter-spacing="1">${label}</text>`;
    for(let i=0;i<cols;i++){
      const on=pattern[i];
      const fill = on?color:'rgba(255,255,255,0.06)';
      const stroke = on?color:'rgba(255,255,255,0.1)';
      const op = (color===C.orange && on)?'0.55':'1';
      s+=`<rect x="${x0+i*(cw+gap)}" y="${y}" width="${cw}" height="${cw}" rx="7" fill="${fill}" fill-opacity="${op}" stroke="${stroke}"/>`;
      if(sweep===i) s+=`<rect x="${x0+i*(cw+gap)-2}" y="${y-2}" width="${cw+4}" height="${cw+4}" rx="8" fill="none" stroke="#fff" stroke-width="2"/>`;
    }
  }
  row(300,'DRUMS — PLAYING', 'rgba(255,255,255,0.4)', [1,0,0,0,1,0,0,0], C.orange, -1);
  row(420,'BASS — YOU TAP', C.teal, [1,0,1,0,1,0,1,0], C.teal, 3);
  s+=`<text x="190" y="540" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11">Your pattern loops as you build it</text>`;
  return s;
}

// ---------- STAGE 3: chord pads ----------
function stage3play(){
  let s='';
  s+=`<text x="190" y="200" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11">Press one or more pads</text>`;
  const pad=(y,label,col,fillop,glow,mark)=>{
    return `<rect x="40" y="${y}" width="300" height="86" rx="14" fill="${col}" fill-opacity="${fillop}" stroke="${col}" stroke-width="2" ${glow?`stroke-opacity="1"`:`stroke-opacity="0.5"`}/>
    <text x="190" y="${y+50}" text-anchor="middle" fill="${col}" font-size="16" font-weight="bold" letter-spacing="1">${label}${mark?'  ✦':''}</text>`;
  };
  s+=pad(225,'HIGH','#8fd6ff',0.1,false,false);
  s+=pad(330,'MID','#a99af0',0.24,true,true);
  s+=pad(435,'LOW','#8fd6ff',0.1,false,false);
  s+=`<text x="190" y="560" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11">Mid + Low together = a warm chord ✦</text>`;
  return s;
}

// ---------- STAGE 4: ECHO IT BACK (call & response) ----------
function stage4play(){
  let s='';
  // top: ECHO's phrase strip
  s+=`<text x="40" y="195" fill="rgba(255,255,255,0.5)" font-size="10" font-weight="bold" letter-spacing="1">ECHO PLAYS THIS</text>`;
  s+=`<rect x="40" y="208" width="300" height="70" rx="12" fill="rgba(255,255,255,0.04)"/>`;
  // three glowing notes in sequence
  const notes=[{c:C.orange,n:'1'},{c:C.teal,n:'2'},{c:C.magenta,n:'3'}];
  notes.forEach((nt,i)=>{
    const cx=110+i*80, cy=243;
    s+=`<circle cx="${cx}" cy="${cy}" r="22" fill="${nt.c}"/>`;
    s+=`<text x="${cx}" y="${cy+6}" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold">${nt.n}</text>`;
    if(i<2) s+=`<text x="${cx+40}" y="${cy+6}" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="18">›</text>`;
  });
  // turn arrow
  s+=`<text x="190" y="330" text-anchor="middle" fill="${C.magenta}" font-size="13" font-weight="bold">↓  NOW PLAY IT BACK  ↓</text>`;
  // bottom: 5 trumpet pads
  s+=`<text x="40" y="375" fill="rgba(255,255,255,0.5)" font-size="10" font-weight="bold" letter-spacing="1">YOUR TRUMPET PADS</text>`;
  const cols=['#8fd6ff',C.orange,C.teal,C.lilac,C.magenta];
  const labels=['do','re','mi','so','la'];
  const x0=40,w=300,gap=10,pw=(w-gap*4)/5;
  for(let i=0;i<5;i++){
    const lit = i<3; // showing the player tapping back
    s+=`<rect x="${x0+i*(pw+gap)}" y="388" width="${pw}" height="150" rx="12" fill="${cols[i]}" fill-opacity="${lit?'0.85':'0.12'}" stroke="${cols[i]}" stroke-opacity="${lit?'1':'0.4'}" stroke-width="2"/>`;
    s+=`<text x="${x0+i*(pw+gap)+pw/2}" y="525" text-anchor="middle" fill="${lit?'#0c0c14':cols[i]}" font-size="13" font-weight="bold">${labels[i]}</text>`;
  }
  s+=`<text x="190" y="575" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="11">Miss it? ECHO just plays it again, slower.</text>`;
  return s;
}

// ---------- STAGE 5: lyric words ----------
function stage5play(){
  let s='';
  const pill=(x,y,t,placed)=>{
    const w=t.length*9+24;
    return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${placed?C.yellow:'rgba(255,255,255,0.06)'}" stroke="${placed?C.yellow:'rgba(255,255,255,0.2)'}"/>
    <text x="${x+w/2}" y="${y+20}" text-anchor="middle" fill="${placed?'#1a1a22':'#fff'}" font-size="13" font-weight="bold">${t}</text>`;
  };
  s+=pill(40,200,'Let',true);
  s+=pill(250,250,'music',false);
  s+=pill(60,330,'find',false);
  s+=pill(240,400,'the',false);
  s+=pill(90,470,'you',false);
  // bottom slots
  const slots=['Let','','','',''];
  const x0=44,w=292,gap=6,sw=(w-gap*4)/5;
  for(let i=0;i<5;i++){
    const filled=!!slots[i];
    s+=`<rect x="${x0+i*(sw+gap)}" y="600" width="${sw}" height="30" rx="6" fill="${filled?C.yellow:'none'}" stroke="${filled?C.yellow:'rgba(255,255,255,0.25)'}" stroke-dasharray="${filled?'0':'4 3'}"/>`;
    if(filled) s+=`<text x="${x0+i*(sw+gap)+sw/2}" y="620" text-anchor="middle" fill="#1a1a22" font-size="11" font-weight="bold">${slots[i]}</text>`;
  }
  return s;
}

const stages=[
  {file:'stage-1', accent:C.orange, section:'STAGE 1 · RHYTHM RUINS', title:'The Pulse — Drums',
   echo1:'Tap the tiles when they', echo2:'hit the line. Give it a heartbeat.', play:stage1play(), layersOn:1},
  {file:'stage-2', accent:C.teal, section:'STAGE 2 · GROOVE RIVER', title:'The Groove — Bass',
   echo1:'Tap the buttons to build a', echo2:'bassline over the drums.', play:stage2play(), layersOn:2},
  {file:'stage-3', accent:C.lilac, section:'STAGE 3 · CHORD FIELDS', title:'The Color — Chords',
   echo1:'Press the pads together. Find', echo2:'the chord that lights up the world.', play:stage3play(), layersOn:3},
  {file:'stage-4', accent:C.magenta, section:'STAGE 4 · MELODY HEIGHTS', title:'The Melody — Trumpet',
   echo1:'I\'ll play a little phrase.', echo2:'Listen, then play it back to me.', play:stage4play(), layersOn:4},
  {file:'stage-5', accent:C.yellow, section:'STAGE 5 · STATIC CITADEL', title:'The Voice — Vocals',
   echo1:'The words are scattered. Tap', echo2:'them in order to rebuild the hook.', play:stage5play(), layersOn:5},
];

fs.mkdirSync('docs/assets', {recursive:true});
const b64={};
for(const st of stages){
  const svg=phone(st);
  const png=new Resvg(svg, {fitTo:{mode:'width', value:760}}).render().asPng();
  fs.writeFileSync(`docs/assets/${st.file}.png`, png);
  b64[st.file]=png.toString('base64');
  console.log('rendered', st.file, png.length, 'bytes');
}
fs.writeFileSync('docs/assets/_b64.json', JSON.stringify(b64));
console.log('done');
