/* =========================================================================
   store-cards.js — render helpers for the Rugat storefront mocks.
   Depends on data.js (icon(), starSVG()). Returns HTML strings + hydrates
   any [data-products] container with a JSON product array.
   ========================================================================= */

/* price: value + trailing SAR symbol (ر.س). Western numerals, grouped. */
function riyal(n){
  const v = Number(n).toLocaleString('en-US');
  return `${v} <span class="sar">ر.س</span>`;
}

/* star row from a 0–5 rating */
function stars(r){
  let s = '';
  for (let i=1;i<=5;i++) s += starSVG(i <= Math.round(r));
  return `<span class="stars">${s}</span>`;
}

function ratingBlock(r, count){
  return `<span class="rating"><span class="score">${r.toFixed(1)}</span>${stars(r)}<span class="count">(${count})</span></span>`;
}

/* color swatch dots for a card */
function swatchDots(colors){
  if(!colors||!colors.length) return '';
  const dots = colors.slice(0,4).map(c=>`<span class="swcolor" style="width:18px;height:18px;background:${c}"></span>`).join('');
  const extra = colors.length>4 ? `<span class="cap" style="font-size:11px;color:var(--c-muted);align-self:center">+${colors.length-4}</span>` : '';
  return `<div class="swrow" style="gap:6px">${dots}${extra}</div>`;
}

function badgeFor(p){
  if(p.badge==='sale' && p.was) {
    const off = Math.round((1 - p.price/p.was)*100);
    return `<span class="badge badge-sale">خصم ${off}%</span>`;
  }
  if(p.badge==='new') return `<span class="badge badge-new">جديد</span>`;
  if(p.badge==='low') return `<span class="badge badge-low">قطع محدودة</span>`;
  if(p.badge==='best') return `<span class="badge badge-soft badge-dot">الأكثر مبيعاً</span>`;
  return '';
}

function priceBlock(p){
  if(p.was){
    const off = Math.round((1 - p.price/p.was)*100);
    return `<span class="price"><span class="now sale tnum">${riyal(p.price)}</span><span class="was tnum">${riyal(p.was)}</span><span class="off">−${off}%</span></span>`;
  }
  return `<span class="price"><span class="now tnum">${riyal(p.price)}</span></span>`;
}

/* full product card. opts.quick adds a hover quick-view add button */
function productCard(p, opts){
  opts = opts || {};
  const sid = (opts.idp||'')+p.id;
  const badges = badgeFor(p);
  const quick = opts.quick ? `
    <div class="quick">
      <button class="btn btn-primary btn-sm btn-block">${icon('cart')} أضف للسلة</button>
    </div>` : '';
  return `
  <article class="pcard">
    <div class="media">
      <image-slot id="${sid}" placeholder="صورة المنتج" radius="0"></image-slot>
      <div class="badges">${badges}</div>
      <button class="wish" aria-label="أضف للمفضلة">${icon('heart')}</button>
      ${quick}
    </div>
    <div class="body">
      ${p.eyebrow?`<span class="eyebrow">${p.eyebrow}</span>`:''}
      <h3 class="title">${p.title}</h3>
      ${ratingBlock(p.rating, p.count)}
      ${priceBlock(p)}
      ${swatchDots(p.colors)}
    </div>
  </article>`;
}

/* compact card for dense / masonry layouts (variable aspect optional) */
function productCardCompact(p, aspect, idp){
  const sid = (idp||'')+p.id;
  const badges = badgeFor(p);
  return `
  <article class="pcard">
    <div class="media" style="aspect-ratio:${aspect||'4/5'}">
      <image-slot id="${sid}" placeholder="صورة" radius="0"></image-slot>
      <div class="badges">${badges}</div>
      <button class="wish" aria-label="أضف للمفضلة">${icon('heart')}</button>
    </div>
    <div class="body" style="padding:11px 12px 13px;gap:6px">
      <h3 class="title" style="font-size:15px">${p.title}</h3>
      ${ratingBlock(p.rating, p.count)}
      ${priceBlock(p)}
    </div>
  </article>`;
}

/* skeleton card */
function skelCard(){
  return `<div class="skel-card"><div class="skel sk-img"></div><div class="sk-body">
    <div class="skel" style="height:13px;width:55%"></div>
    <div class="skel" style="height:13px;width:80%"></div>
    <div class="skel" style="height:18px;width:42%"></div></div></div>`;
}

/* room shortcut card (image + caption overlay) */
function roomCard(r){
  return `
  <a class="ccard" href="#" style="aspect-ratio:${r.aspect||'1/1'}">
    <image-slot id="${r.id}" placeholder="${r.title}"></image-slot>
    <div class="scrim"></div>
    <div class="cap"><div class="t">${r.title}</div><div class="c">${r.count} منتج</div></div>
  </a>`;
}

/* =========================================================================
   Shared storefront chrome — utility bar, navbar, footer.
   Injected into [data-ubar] / [data-nav data-active] / [data-foot].
   ========================================================================= */
function utilBar(){
  return `<div class="ubar"><div class="wrap">
    <span class="uitem">${icon('truck')} شحن مجاني للطلبات فوق 300 ر.س</span>
    <span class="uitem">${icon('shield')} إرجاع مجاني خلال 14 يوماً</span>
    <span class="spacer"></span>
    <div class="ulinks">
      <a href="#">تتبّع طلبك</a><a href="#">المساعدة</a><a href="#">العربية · AR</a>
    </div>
  </div></div>`;
}
function storeNav(active){
  const A = n => active===n ? ' class="active"' : '';
  return `<nav class="snav"><div class="wrap"><div class="row">
    <a class="logo" href="Home.html">رُقعة<small>RUGAT · CARPETS</small></a>
    <div class="links">
      <a href="Home.html"${A('home')}>الرئيسية</a>
      <a href="Shop.html"${A('shop')}>السجاد ${icon('chevDown')}</a>
      <a href="#"${A('rooms')}>تسوّق حسب الغرفة</a>
      <a href="#"${A('offers')}>العروض</a>
      <a href="#"${A('inspo')}>إلهام</a>
    </div>
    <div class="tools">
      <button class="icon-btn" aria-label="بحث">${icon('search')}</button>
      <button class="icon-btn" aria-label="المفضلة">${icon('heart')}</button>
      <button class="icon-btn" aria-label="حسابي">${icon('user')}</button>
      <button class="icon-btn" aria-label="السلة">${icon('cart')}<span class="cnt">3</span></button>
    </div>
  </div></div></nav>`;
}
function storeFooter(){
  const col = (h, links) => `<div><h5>${h}</h5>${links.map(l=>`<a class="fl" href="#">${l}</a>`).join('')}</div>`;
  return `<footer class="foot"><div class="wrap" style="padding:0">
    <div class="top">
      <div>
        <div class="logo">رُقعة</div>
        <p class="desc">وجهتك للسجاد المنسوج يدويًا والمصنوع بعناية — كليم، شاج، فينتيج وتصاميم عصرية تليق ببيتك.</p>
        <div class="pay"><span>مدى</span><span>Visa</span><span>Mastercard</span><span>Apple Pay</span><span>تابي</span><span>تمارا</span></div>
      </div>
      ${col('تسوّق', ['كل السجاد','كليم','شاج','فينتيج','سجاد الممرات','وصل حديثاً'])}
      ${col('المساعدة', ['تواصل معنا','الشحن والتوصيل','الإرجاع والاستبدال','دليل المقاسات','الأسئلة الشائعة'])}
      ${col('رُقعة', ['من نحن','المتاجر','المدوّنة','الوظائف','الشروط والخصوصية'])}
    </div>
    <div class="bottom">
      <span>© 2026 رُقعة · جميع الحقوق محفوظة · أسعار شاملة ضريبة القيمة المضافة</span>
      <div class="social">
        <a href="#" aria-label="Instagram">${icon('sparkle')}</a>
        <a href="#" aria-label="Pinterest">${icon('grid')}</a>
        <a href="#" aria-label="WhatsApp">${icon('user')}</a>
      </div>
    </div>
  </div></footer>`;
}
function hydrateChrome(){
  document.querySelectorAll('[data-ubar]').forEach(el=>el.innerHTML=utilBar());
  document.querySelectorAll('[data-nav]').forEach(el=>el.innerHTML=storeNav(el.getAttribute('data-active')));
  document.querySelectorAll('[data-foot]').forEach(el=>el.innerHTML=storeFooter());
}
document.addEventListener('DOMContentLoaded', hydrateChrome);

/* hydrate containers: <div data-grid class="pgrid c4">…</div> with a sibling
   <script type="application/json" data-for="<id>">[…]</script> OR data-products attr */
function hydrateGrids(){
  document.querySelectorAll('[data-products]').forEach(el=>{
    let list;
    try { list = JSON.parse(el.getAttribute('data-products')); } catch(e){ return; }
    const quick = el.hasAttribute('data-quick');
    const compact = el.hasAttribute('data-compact');
    const idp = el.getAttribute('data-idp') || '';
    el.innerHTML = list.map(p=> compact? productCardCompact(p,null,idp) : productCard(p,{quick,idp})).join('');
  });
  document.querySelectorAll('[data-rooms]').forEach(el=>{
    let list; try { list = JSON.parse(el.getAttribute('data-rooms')); } catch(e){ return; }
    el.innerHTML = list.map(roomCard).join('');
  });
}

document.addEventListener('DOMContentLoaded', hydrateGrids);

/* =========================================================================
   Auto-fill image-slots with generated rug textures / styled scenes.
   Sets the author `src` (which a user drop overrides). Scenes (rug-on-floor
   flat-lays) go to room/hero/lifestyle slots; rug textures fill product +
   gallery slots. Runs after all grids hydrate.
   ========================================================================= */
const RUG_IMGS = ['rug-kilim','rug-stripes','rug-medallion','rug-trellis','rug-kilim2','rug-berber','rug-shag','rug-shag-sage','rug-chevron','rug-lattice'].map(n=>'images/'+n+'.png');
const SCENE_IMGS = ['scene-majlis','scene-living','scene-bedroom','scene-kids','scene-dining','scene-entry','scene-hero','scene-promo'].map(n=>'images/'+n+'.png');
const SCENE_SEL = '.hero-full,.hero-split .feat,.gallery-row,.inspo,.promo-banner,.budget-card,.style-tile,.room-tile,.ccard,.roomcard,.mpromo,.rail .rcard,.shop-banner';
function paintSlots(){
  let ri=0, si=0;
  document.querySelectorAll('image-slot').forEach(el=>{
    if(el.getAttribute('src')) return;
    if(el.closest(SCENE_SEL)) el.setAttribute('src', SCENE_IMGS[si++ % SCENE_IMGS.length]);
    else el.setAttribute('src', RUG_IMGS[ri++ % RUG_IMGS.length]);
  });
}
window.paintSlots = paintSlots;
document.addEventListener('DOMContentLoaded', ()=> setTimeout(paintSlots, 50));
