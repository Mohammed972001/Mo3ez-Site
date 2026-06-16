/* =========================================================================
   data.js — scheme data, type pairings, icon set, scales
   ========================================================================= */

/* ---- ICONS: single line set, 1.75 stroke ---- */
const ICON = {
  search:'<path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="m21 21-4.3-4.3"/>',
  heart:'<path d="M12 20.5 4.5 13a5 5 0 0 1 7-7l.5.5.5-.5a5 5 0 0 1 7 7Z"/>',
  cart:'<path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 8H6"/><circle cx="9.5" cy="20.5" r="1.2"/><circle cx="17.5" cy="20.5" r="1.2"/>',
  user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
  chevDown:'<path d="m6 9 6 6 6-6"/>',
  chevLeft:'<path d="m15 6-6 6 6 6"/>',
  chevRight:'<path d="m9 6 6 6-6 6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  x:'<path d="M6 6 18 18M18 6 6 18"/>',
  check:'<path d="m5 12 5 5L20 6"/>',
  checkCircle:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  filter:'<path d="M3 5h18M6 12h12M10 19h4"/>',
  star:'<path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8Z"/>',
  truck:'<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
  shield:'<path d="M12 3 5 6v5c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6Z"/>',
  ruler:'<path d="M3 8h18v8H3z"/><path d="M7 8v3M11 8v4M15 8v3M19 8v4"/>',
  bag:'<path d="M6 8h12l-1 12H7Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  trash:'<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  grid:'<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
  swatch:'<circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><circle cx="12" cy="15" r="4"/>',
  sparkle:'<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
  ar:'<path d="M4 12h16M12 4v16"/>',
  arrowL:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
};
function icon(name, cls){
  return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]||''}</svg>`;
}
function starSVG(fill){
  return `<svg viewBox="0 0 24 24" fill="${fill?'currentColor':'none'}" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" class="${fill?'':'empty'}">${ICON.star}</svg>`;
}

/* ---- COLOR SCHEMES ---- */
const SCHEMES = {
 1:{name:'Modern Gallery', tag:'Minimal Luxe', tokens:[
   {n:'Background',t:'--color-bg',h:'#FAF9F6',u:'App canvas — soft warm white'},
   {n:'Surface',t:'--color-surface',h:'#F1EEE8',u:'Cards, inputs, raised fills'},
   {n:'Text',t:'--color-text',h:'#1B1A17',u:'Body & headings'},
   {n:'Muted',t:'--color-muted',h:'#6F6B63',u:'Captions, secondary text'},
   {n:'Border',t:'--color-border',h:'#E4E0D8',u:'Dividers, input outlines'},
   {n:'Primary',t:'--color-primary',h:'#1B1A17',u:'Primary buttons / key actions'},
   {n:'Accent',t:'--color-accent',h:'#BF5B3E',u:'Links, active, highlights · UI/large text only'},
   {n:'Success',t:'--color-success',h:'#2E7D5B',u:'In-stock, confirmations'},
   {n:'Sale',t:'--color-sale',h:'#C0392B',u:'Sale price, discounts, errors'},
 ]},
 2:{name:'Editorial Bold', tag:'Magazine', tokens:[
   {n:'Background',t:'--color-bg',h:'#FBF6EE',u:'Warm paper canvas'},
   {n:'Surface',t:'--color-surface',h:'#F4ECDD',u:'Cards & fills (derived)'},
   {n:'Ink / Primary',t:'--color-primary',h:'#16213A',u:'Headings, primary buttons'},
   {n:'Muted',t:'--color-muted',h:'#5C6173',u:'Secondary text'},
   {n:'Border',t:'--color-border',h:'#E6DDCF',u:'Dividers, outlines'},
   {n:'Accent',t:'--color-accent',h:'#E0683F',u:'CTAs, active · UI/large only'},
   {n:'Accent 2',t:'--color-accent-2',h:'#F2A900',u:'Amber highlight — fills/icons ONLY, fails as text'},
   {n:'Success',t:'--color-success',h:'#1E6E54',u:'In-stock'},
   {n:'Sale',t:'--color-sale',h:'#D14836',u:'Sale, errors · UI/large only'},
 ]},
 3:{name:'Warm Artisan', tag:'Handwoven', tokens:[
   {n:'Background',t:'--color-bg',h:'#F6EEE3',u:'Sand canvas'},
   {n:'Surface',t:'--color-surface',h:'#EFE4D4',u:'Cards & fills'},
   {n:'Primary',t:'--color-primary',h:'#8E3B2C',u:'Terracotta — buttons, headings'},
   {n:'Accent',t:'--color-accent',h:'#1E6E68',u:'Teal — links, active, contrast pop'},
   {n:'Text',t:'--color-text',h:'#2E251F',u:'Body & headings'},
   {n:'Muted',t:'--color-muted',h:'#7A6E61',u:'Secondary · borderline on surface'},
   {n:'Border',t:'--color-border',h:'#DBCBB4',u:'Dividers, outlines'},
 ]},
 4:{name:'Soft Nordic', tag:'Muted Calm', tokens:[
   {n:'Background',t:'--color-bg',h:'#FCFBF9',u:'Near-white canvas'},
   {n:'Surface',t:'--color-surface',h:'#EDE9E2',u:'Cards & fills'},
   {n:'Primary',t:'--color-primary',h:'#5E6B5A',u:'Sage — buttons, headings'},
   {n:'Accent',t:'--color-accent',h:'#B98E6B',u:'Camel — fills w/ dark text · fails as text/white-on'},
   {n:'Text',t:'--color-text',h:'#2C2925',u:'Body & headings'},
   {n:'Muted',t:'--color-muted',h:'#837C72',u:'Secondary · large/UI only'},
   {n:'Border',t:'--color-border',h:'#E6E1D8',u:'Dividers, outlines'},
 ]},
 5:{name:'Dark Premium', tag:'Dark Mode', tokens:[
   {n:'Background',t:'--color-bg',h:'#14110E',u:'Deep espresso canvas'},
   {n:'Surface',t:'--color-surface',h:'#1F1A16',u:'Cards & raised fills'},
   {n:'Text',t:'--color-text',h:'#F0EAE0',u:'Body & headings'},
   {n:'Muted',t:'--color-muted',h:'#A39B8E',u:'Secondary text'},
   {n:'Accent',t:'--color-accent',h:'#C9A24B',u:'Gold — primary action, w/ dark text'},
   {n:'Accent 2',t:'--color-accent-2',h:'#7E4A35',u:'Copper — fills only, fails as text'},
   {n:'Border',t:'--color-border',h:'#312A23',u:'Dividers, outlines'},
 ]},
};

/* ---- TYPE PAIRINGS ---- */
const PAIRINGS = {
 1:{lat:['Fraunces','Inter'], ar:['Readex Pro','IBM Plex Sans Arabic'], note:'Literary serif + neutral grotesque — gallery editorial.'},
 2:{lat:['Playfair Display','Manrope'], ar:['El Messiri','Tajawal'], note:'High-contrast display + geometric body — bold magazine.'},
 3:{lat:['Fraunces','Sora'], ar:['Reem Kufi','Cairo'], note:'Serif headline + crisp Kufi — artisan with structure.'},
 4:{lat:['Sora','Manrope'], ar:['Almarai','Tajawal'], note:'All-sans, quiet and even — Nordic calm.'},
 5:{lat:['Cormorant','Inter'], ar:['El Messiri','IBM Plex Sans Arabic'], note:'Elegant high-contrast serif — premium, luxury.'},
};

/* ---- TYPE SCALE ---- */
const SCALE = [
 {k:'display', sz:56, w:600, lh:1.05, role:'display', ar:'سجادٌ يروي حكاية', lt:'Display · 56 / 600 / 1.05'},
 {k:'h1', sz:40, w:600, lh:1.1, role:'display', ar:'مجموعة الكليم المغربي', lt:'H1 · 40 / 600 / 1.1'},
 {k:'h2', sz:32, w:600, lh:1.15, role:'display', ar:'سجاد عصري للمجلس', lt:'H2 · 32 / 600 / 1.15'},
 {k:'h3', sz:26, w:600, lh:1.2, role:'display', ar:'أحجام ومقاسات متعددة', lt:'H3 · 26 / 600 / 1.2'},
 {k:'h4', sz:21, w:600, lh:1.3, role:'display', ar:'تفاصيل المنتج', lt:'H4 · 21 / 600 / 1.3'},
 {k:'h5', sz:18, w:600, lh:1.35, role:'display', ar:'الشحن والإرجاع', lt:'H5 · 18 / 600 / 1.35'},
 {k:'h6', sz:16, w:700, lh:1.4, role:'display', ar:'أضف إلى السلة', lt:'H6 · 16 / 700 / 1.4'},
 {k:'body-lg', sz:18, w:400, lh:1.7, role:'body', ar:'سجادة منسوجة يدويًا من صوف طبيعي، تمنح الغرفة دفئًا وملمسًا غنيًا يدوم لسنوات.', lt:'Body-lg · 18 / 400 / 1.7'},
 {k:'body', sz:15, w:400, lh:1.7, role:'body', ar:'متوفرة بأحجام متعددة وألوان تناسب المجلس وغرف المعيشة، مع ضمان وإرجاع مجاني خلال ١٤ يومًا.', lt:'Body · 15 / 400 / 1.7'},
 {k:'caption', sz:13, w:400, lh:1.6, role:'body', ar:'يشمل السعر ضريبة القيمة المضافة · شحن مجاني فوق ٣٠٠ ر.س', lt:'Caption · 13 / 400 / 1.6'},
 {k:'label', sz:12, w:700, lh:1.4, role:'body', ar:'أضف للسلة · ADD TO CART', lt:'Label · 12 / 700 — letter-spacing off for Arabic'},
];

/* ---- SPACING / RADIUS / SHADOW ---- */
const SPACE = [
 {n:'2xs',v:4},{n:'xs',v:8},{n:'sm',v:12},{n:'md',v:16},{n:'lg',v:24},{n:'xl',v:32},{n:'2xl',v:48},{n:'3xl',v:64},
];
const RADII = [
 {n:'sm',v:6},{n:'md',v:10},{n:'lg',v:14},{n:'xl',v:16},{n:'pill',v:999},
];
const SHADOWS = [
 {n:'sm · resting card', v:'0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.05)'},
 {n:'md · dropdown', v:'0 4px 10px -2px rgba(0,0,0,.10), 0 2px 6px -2px rgba(0,0,0,.08)'},
 {n:'lg · card hover', v:'0 16px 34px -16px rgba(0,0,0,.30)'},
 {n:'xl · modal', v:'0 30px 60px -24px rgba(0,0,0,.45)'},
];

/* ---- contrast helpers ---- */
function _lum(hex){
  const c=hex.replace('#','');const r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;
  const f=x=>x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
function contrast(a,b){const L1=_lum(a),L2=_lum(b),hi=Math.max(L1,L2),lo=Math.min(L1,L2);return (hi+0.05)/(lo+0.05);}
