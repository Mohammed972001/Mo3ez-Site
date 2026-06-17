/* =========================================================================
   app.js — render data sections, inject gallery, wire switchers + interactions
   ========================================================================= */
(function(){
'use strict';

/* resolved palettes (mirror the CSS [data-theme] blocks incl. derived values) */
const PAL = {
 1:{bg:'#FAF9F6',surface:'#F1EEE8',text:'#1B1A17',muted:'#6F6B63',border:'#E4E0D8',primary:'#1B1A17',onP:'#FFFFFF',accent:'#BF5B3E',onA:'#FFFFFF',accent2:'#BF5B3E',success:'#2E7D5B',sale:'#C0392B'},
 2:{bg:'#FBF6EE',surface:'#F4ECDD',text:'#16213A',muted:'#5C6173',border:'#E6DDCF',primary:'#16213A',onP:'#FFFFFF',accent:'#E0683F',onA:'#FFFFFF',accent2:'#F2A900',success:'#1E6E54',sale:'#D14836'},
 3:{bg:'#F6EEE3',surface:'#EFE4D4',text:'#2E251F',muted:'#7A6E61',border:'#DBCBB4',primary:'#8E3B2C',onP:'#FFFFFF',accent:'#1E6E68',onA:'#FFFFFF',accent2:'#8E3B2C',success:'#1E6E68',sale:'#B23A2E'},
 4:{bg:'#FCFBF9',surface:'#EDE9E2',text:'#2C2925',muted:'#837C72',border:'#E6E1D8',primary:'#5E6B5A',onP:'#FFFFFF',accent:'#B98E6B',onA:'#2C2925',accent2:'#5E6B5A',success:'#4E7A5E',sale:'#B5503C'},
 5:{bg:'#14110E',surface:'#1F1A16',text:'#F0EAE0',muted:'#A39B8E',border:'#312A23',primary:'#C9A24B',onP:'#14110E',accent:'#C9A24B',onA:'#14110E',accent2:'#7E4A35',success:'#5FA882',sale:'#E0654E'},
};

let activeTheme = 1, activeType = 1;

/* ---------------- render: palette swatch sets ---------------- */
function renderPalettes(){
  const wrap = document.getElementById('paletteSets');
  let html = '';
  for(const id of [1,2,3,4,5]){
    const s = SCHEMES[id];
    html += `<div style="margin-bottom:26px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:13px;flex-wrap:wrap;">
        <span class="tag-pill">Scheme ${id}</span>
        <h3 style="font-family:var(--serif);font-size:19px;font-weight:600;margin:0;white-space:nowrap;">${s.name}</h3>
        <span class="cap">${s.tag}</span>
      </div>
      <div class="swatch-set">
        ${s.tokens.map(tk=>`
          <div class="swatch">
            <div class="chip" style="background:${tk.h};${_light(tk.h)?'box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)':''}"></div>
            <div class="meta">
              <div class="nm">${tk.n}</div>
              <div class="tok">${tk.t}</div>
              <div class="hex">${tk.h}</div>
              <div class="use">${tk.u}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  }
  wrap.innerHTML = html;
}
function _light(hex){ return contrast(hex,'#FFFFFF') < 1.6; }

/* ---------------- render: live contrast table ---------------- */
function aaBadge(r, large){
  const thr = large?3:4.5;
  if(!large){ if(r>=7) return '<span class="aa aaa">AAA '+r.toFixed(1)+'</span>'; if(r>=4.5) return '<span class="aa pass">AA '+r.toFixed(1)+'</span>'; return '<span class="aa fail">FAIL '+r.toFixed(1)+'</span>'; }
  return r>=3 ? '<span class="aa large">AA '+r.toFixed(1)+'</span>' : '<span class="aa fail">FAIL '+r.toFixed(1)+'</span>';
}
function renderContrast(){
  const p = PAL[activeTheme];
  const pairs = [
    {l:'Text → bg', fg:p.text, bg:p.bg, s:'نص'},
    {l:'Muted → bg', fg:p.muted, bg:p.bg, s:'ثانوي'},
    {l:'Primary → bg', fg:p.primary, bg:p.bg, s:'عنوان'},
    {l:'Accent → bg', fg:p.accent, bg:p.bg, s:'رابط'},
  ];
  if(activeTheme===2||activeTheme===5) pairs.push({l:'Accent-2 → bg', fg:p.accent2, bg:p.bg, s:'تمييز'});
  pairs.push({l:'Success → bg', fg:p.success, bg:p.bg, s:'متوفر'});
  pairs.push({l:'Sale → bg', fg:p.sale, bg:p.bg, s:'خصم'});
  pairs.push({l:'On-primary → primary (btn)', fg:p.onP, bg:p.primary, s:'زر'});
  pairs.push({l:'On-accent → accent (btn)', fg:p.onA, bg:p.accent, s:'زر'});
  document.getElementById('contrastBody').innerHTML = pairs.map(pr=>{
    const r = contrast(pr.fg, pr.bg);
    return `<tr>
      <td><b>${pr.l}</b></td>
      <td><span class="contrast-chip" style="background:${pr.bg};color:${pr.fg}">${pr.s}</span></td>
      <td class="ratio">${r.toFixed(2)}</td>
      <td>${aaBadge(r,false)}</td>
      <td>${aaBadge(r,true)}</td>
    </tr>`;
  }).join('');
}

/* ---------------- render: type pairings + scale ---------------- */
function renderPairings(){
  const wrap = document.getElementById('pairingCards');
  wrap.innerHTML = Object.entries(PAIRINGS).map(([id,p])=>`
    <button class="pairing-card ${id==activeType?'active':''}" data-type="${id}">
      <div class="pt-top"><span class="pt-n">PAIRING ${id}</span><span class="live-dot">● live</span></div>
      <div class="pt-disp" style="font-family:'${p.lat[0]}','${p.ar[0]}',serif;">Aa<span class="ar">أبجد</span></div>
      <div class="pt-row"><b>Display</b> ${p.lat[0]} / ${p.ar[0]}</div>
      <div class="pt-row"><b>Body</b> ${p.lat[1]} / ${p.ar[1]}</div>
      <div class="pt-note">${p.note}</div>
    </button>`).join('');
}
function renderScale(){
  document.getElementById('typeScale').innerHTML = SCALE.map(r=>{
    const fam = r.role==='display' ? 'var(--font-display)' : 'var(--font-body)';
    return `<div class="ts-row">
      <div style="font-family:${fam};font-size:${r.sz}px;font-weight:${r.w};line-height:${r.lh};color:var(--c-text);">${r.ar}</div>
      <div class="ts-spec">${r.lt}</div>
    </div>`;
  }).join('');
}

/* ---------------- render: spacing / radius / grid / shadow ---------------- */
function renderSpace(){
  document.getElementById('spaceScale').innerHTML = SPACE.map(s=>`
    <div class="space-bar"><span class="nm">${s.n}</span><span class="bar" style="width:${s.v*2}px"></span><span class="px">${s.v}px</span></div>`).join('');
  document.getElementById('radiusScale').innerHTML = RADII.map(r=>`
    <div class="radius-wrap"><div class="radius-box" style="border-radius:${r.v}px"><span>${r.v===999?'∞':r.v}</span></div><span class="mono">${r.n}</span></div>`).join('');
  const gd = document.getElementById('gridDemo');
  gd.innerHTML = Array.from({length:12}).map(()=>`<div style="height:46px;background:color-mix(in srgb,var(--chrome-accent) 10%,transparent);border:1px dashed color-mix(in srgb,var(--chrome-accent) 35%,transparent);border-radius:5px;"></div>`).join('');
  document.getElementById('shadowScale').innerHTML = SHADOWS.map(s=>`
    <div class="shadow-card" style="box-shadow:${s.v}"><div class="sh-n">${s.n}</div><div class="sh-v">${s.v}</div></div>`).join('');
}

/* ---------------- inject gallery markup ---------------- */
function injectGallery(){
  document.getElementById('componentsArea').innerHTML = MARKUP.components;
  document.getElementById('iconsArea').innerHTML = MARKUP.icons;
  document.getElementById('motionArea').innerHTML = MARKUP.motion;
  document.getElementById('a11yArea').innerHTML = MARKUP.a11y;
}

/* ---------------- switchers ---------------- */
function applyTheme(id){
  activeTheme = id;
  document.querySelectorAll('.live-theme:not([data-lock])').forEach(el=> el.setAttribute('data-theme', id));
  document.querySelectorAll('#paletteSeg button').forEach(b=> b.setAttribute('aria-pressed', b.dataset.theme==id));
  document.getElementById('roPal').textContent = id;
  document.getElementById('roPalName').textContent = SCHEMES[id].name;
  renderContrast();
}
function applyType(id){
  activeType = id;
  document.documentElement.setAttribute('data-type', id);
  document.querySelectorAll('#typeSeg button').forEach(b=> b.setAttribute('aria-pressed', b.dataset.type==id));
  document.querySelectorAll('.pairing-card').forEach(c=> c.classList.toggle('active', c.dataset.type==id));
  document.getElementById('roType').textContent = id;
  document.getElementById('roTypeName').textContent = PAIRINGS[id].lat[0]+' + '+PAIRINGS[id].ar[0];
}

/* ---------------- interactions (event delegation) ---------------- */
function wireInteractions(){
  document.body.addEventListener('click', e=>{
    const t = e.target;

    // quantity stepper
    const qBtn = t.closest('#qtyDemo button, .qty button');
    if(qBtn && qBtn.dataset.q){
      const val = qBtn.parentElement.querySelector('.val');
      let n = parseInt(val.textContent.replace(/[^\d]/g,'')) || toAr2en(val.textContent) || 1;
      n = Math.max(1, n + parseInt(qBtn.dataset.q));
      val.textContent = en2ar(n);
      return;
    }
    // color swatch select
    const sw = t.closest('#swatchDemo .swcolor');
    if(sw && !sw.classList.contains('disabled')){
      sw.parentElement.querySelectorAll('.swcolor').forEach(x=>x.classList.remove('sel'));
      sw.classList.add('sel'); return;
    }
    // size select
    const sz = t.closest('#sizeDemo .size');
    if(sz && !sz.classList.contains('oos') && !sz.disabled){
      sz.parentElement.querySelectorAll('.size').forEach(x=>x.classList.remove('sel'));
      sz.classList.add('sel'); return;
    }
    // tabs
    const tab = t.closest('#tabsDemo button');
    if(tab){
      const tabs=[...tab.parentElement.children]; const i=tabs.indexOf(tab);
      tabs.forEach(x=>x.setAttribute('aria-selected','false'));
      tab.setAttribute('aria-selected','true');
      const bodies=['سجادة كليم مغربية منسوجة يدويًا من صوف طبيعي ١٠٠٪، بألوان نباتية ثابتة وملمس مسطّح متين يناسب المناطق كثيرة الحركة. تتحسّن مع الوقت ويسهل تنظيفها.','تتوفّر بالمقاسات: ٨٠×١٥٠ · ١٢٠×١٧٠ · ١٦٠×٢٣٠ · ٢٠٠×٣٠٠ سم. سُمك الوبر ٨ مم تقريبًا.','شحن مجاني للطلبات فوق ٣٠٠ ر.س خلال ٢–٤ أيام عمل. إرجاع مجاني خلال ١٤ يومًا.','متوسط التقييم ٤٫٧ من ٥ بناءً على ٣١٢ تقييمًا موثّقًا من المشترين.'];
      document.getElementById('tabBody').textContent = bodies[i]||'';
      return;
    }
    // pagination
    const pg = t.closest('#pagerDemo button');
    if(pg && !pg.disabled && pg.getAttribute('aria-label')===null){
      pg.parentElement.querySelectorAll('button').forEach(x=>x.removeAttribute('aria-current'));
      pg.setAttribute('aria-current','true'); return;
    }
    // wishlist toggle
    const wish = t.closest('.pcard .wish');
    if(wish){ wish.classList.toggle('on'); return; }
    // removable chip
    const x = t.closest('.chip.removable');
    if(x && t.closest('.x')){ x.remove(); return; }
    // chip activate
    const chip = t.closest('.chips .chip:not(.removable)');
    if(chip){ chip.parentElement.querySelectorAll('.chip:not(.removable)').forEach(c=>c.classList.remove('active')); chip.classList.add('active'); return; }
    // toast close
    const tc = t.closest('.toast .close');
    if(tc){ const to=tc.closest('.toast'); to.style.transition='opacity .2s'; to.style.opacity='0'; setTimeout(()=>{to.style.opacity='1';},900); return; }
    // modal open
    if(t.closest('#openModalBtn')){
      const m = document.querySelector('.modal-demo'); m.style.outline='2px solid var(--c-accent)'; m.style.outlineOffset='3px';
      setTimeout(()=>{m.style.outline='none';},700); return;
    }
    // pairing card pick
    const pc = t.closest('.pairing-card');
    if(pc){ applyType(parseInt(pc.dataset.type)); return; }
  });

  document.getElementById('paletteSeg').addEventListener('click', e=>{ const b=e.target.closest('button'); if(b) applyTheme(parseInt(b.dataset.theme)); });
  document.getElementById('typeSeg').addEventListener('click', e=>{ const b=e.target.closest('button'); if(b) applyType(parseInt(b.dataset.type)); });
}

/* arabic-indic numeral helpers */
const _A='٠١٢٣٤٥٦٧٨٩';
function en2ar(n){ return String(n).replace(/\d/g,d=>_A[+d]); }
function toAr2en(s){ let r=''; for(const ch of s){ const i=_A.indexOf(ch); r+= i>=0? i : (/\d/.test(ch)?ch:''); } return parseInt(r)||0; }

/* ---------------- scroll spy ---------------- */
function wireScrollSpy(){
  const links=[...document.querySelectorAll('.sidenav a')];
  const map={}; links.forEach(l=>map[l.getAttribute('href').slice(1)]=l);
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ links.forEach(l=>l.classList.remove('active')); const a=map[en.target.id]; if(a)a.classList.add('active'); } });
  },{rootMargin:'-20% 0px -70% 0px'});
  document.querySelectorAll('.section').forEach(s=>obs.observe(s));
}

/* ---------------- init ---------------- */
function init(){
  renderPalettes();
  renderPairings();
  renderScale();
  renderSpace();
  injectGallery();
  applyTheme(1);
  applyType(1);
  wireInteractions();
  wireScrollSpy();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
