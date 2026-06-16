/* =========================================================================
   gallery.js — component gallery markup (consumes icon() from data.js)
   ========================================================================= */
(function(){
const st = t => `<span class="state-tag">${t}</span>`;
const sar = '<span class="sar">ر.س</span>';

/* ----- reusable bits ----- */
const stars = (n,half)=>{let s='';for(let i=1;i<=5;i++){s+=`<span>${starSVG(i<=n)}</span>`;}return `<span class="stars">${s}</span>`;};

const productCard = (opts)=>`
  <article class="pcard" tabindex="0">
    <div class="media">
      <div class="rug rug-${opts.rug}"></div>
      <div class="badges">${opts.badges||''}</div>
      <button class="wish ${opts.wish?'on':''}" aria-label="أضف إلى المفضّلة">${icon('heart')}</button>
      <div class="quick"><button class="btn btn-primary btn-block btn-sm">${icon('cart')} أضف للسلة</button></div>
    </div>
    <div class="body">
      <span class="eyebrow">${opts.cat}</span>
      <h4 class="title">${opts.title}</h4>
      <div class="rating">${stars(opts.rate)}<span class="count">(${opts.count})</span></div>
      <div class="price">
        <span class="now ${opts.was?'sale':''}">${opts.price} ${sar}</span>
        ${opts.was?`<span class="was">${opts.was} ${sar}</span><span class="off">−${opts.off}٪</span>`:''}
      </div>
      <div class="swrow">
        <span class="swcolor" style="background:#BF5B3E"></span>
        <span class="swcolor" style="background:#1E6E68"></span>
        <span class="swcolor" style="background:#3A5A78"></span>
        <span class="swcolor" style="background:#D9C3A0"></span>
      </div>
    </div>
  </article>`;

/* =================== COMPONENTS =================== */
const components = `
<h3 class="subhead">Buttons — أزرار</h3>
<div class="live-theme framed">
  <div class="row-t" style="gap:26px;">
    <div class="demo-cell">${st('Primary · default')}<button class="btn btn-primary">${icon('cart')} أضف للسلة</button></div>
    <div class="demo-cell fx-hover">${st('Primary · hover')}<button class="btn btn-primary">${icon('cart')} أضف للسلة</button></div>
    <div class="demo-cell fx-active">${st('Primary · active')}<button class="btn btn-primary">${icon('cart')} أضف للسلة</button></div>
    <div class="demo-cell fx-focus">${st('Primary · focus')}<button class="btn btn-primary">${icon('cart')} أضف للسلة</button></div>
    <div class="demo-cell">${st('Primary · disabled')}<button class="btn btn-primary" disabled>${icon('cart')} أضف للسلة</button></div>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  <div class="row-t" style="gap:26px;">
    <div class="demo-cell">${st('Secondary')}<button class="btn btn-secondary">عرض التفاصيل</button></div>
    <div class="demo-cell">${st('Accent')}<button class="btn btn-accent">${icon('sparkle')} تسوّق العروض</button></div>
    <div class="demo-cell">${st('Ghost')}<button class="btn btn-ghost">متابعة التسوّق ${icon('chevLeft')}</button></div>
    <div class="demo-cell">${st('Icon')}<button class="btn btn-icon" aria-label="المفضّلة">${icon('heart')}</button></div>
    <div class="demo-cell">${st('Small / Large')}<div class="row"><button class="btn btn-primary btn-sm">صغير</button><button class="btn btn-primary btn-lg">كبير</button></div></div>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  <div style="max-width:340px;">${st('Full-width — عرض كامل')}<button class="btn btn-primary btn-block">${icon('bag')} أتمم الشراء — 1٬240 ${sar}</button></div>
</div>

<h3 class="subhead">Inputs &amp; forms — الحقول</h3>
<div class="live-theme framed">
  <div class="grid-auto" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:22px;">
    <div class="field">${st('Text · default')}<label class="lbl">الاسم الكامل</label><input class="input" placeholder="مثال: نورة العتيبي" /></div>
    <div class="field fx-focus">${st('Text · focus')}<label class="lbl">رقم الجوال</label><input class="input" value="05X XXX XXXX" /></div>
    <div class="field">${st('Text · error')}<label class="lbl">الرمز البريدي</label><input class="input is-error" value="00" /><span class="err">الرمز غير صالح</span></div>
    <div class="field">${st('Text · disabled')}<label class="lbl">الدولة</label><input class="input" value="المملكة العربية السعودية" disabled /></div>
    <div class="field">${st('Select')}<label class="lbl">المدينة</label><div class="select-wrap"><select class="input"><option>الرياض</option><option>جدة</option><option>الدمام</option></select>${icon('chevDown')}</div></div>
    <div class="field">${st('Search bar')}<label class="lbl">ابحث</label><div class="search">${icon('search','lead')}<input class="input" placeholder="ابحث عن سجاد، كليم، مقاسات…" /></div></div>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  <div class="row-t" style="gap:34px;">
    <div>${st('Checkbox')}<div class="stack" style="gap:11px;">
      <label class="choice"><input type="checkbox" checked /><span class="box"></span> منسوج يدويًا</label>
      <label class="choice"><input type="checkbox" /><span class="box"></span> مقاوم للبقع</label>
      <label class="choice is-disabled"><input type="checkbox" disabled /><span class="box"></span> غير متوفر</label>
    </div></div>
    <div>${st('Radio')}<div class="stack" style="gap:11px;">
      <label class="choice"><input type="radio" name="ship" checked /><span class="dot"></span> شحن قياسي · مجاني</label>
      <label class="choice"><input type="radio" name="ship" /><span class="dot"></span> شحن سريع · 25 ر.س</label>
      <label class="choice is-disabled"><input type="radio" name="ship" disabled /><span class="dot"></span> استلام من المتجر</label>
    </div></div>
  </div>
</div>

<h3 class="subhead">Badges &amp; Price — الشارات والسعر</h3>
<div class="live-theme framed">
  <div class="row" style="gap:10px;">
    <span class="badge badge-sale">خصم ٢٥٪ · SALE</span>
    <span class="badge badge-new">جديد · NEW</span>
    <span class="badge badge-low badge-dot">ينفد قريبًا · LOW STOCK</span>
    <span class="badge badge-soft">منسوج يدويًا</span>
    <span class="badge badge-soft">${icon('truck')} شحن مجاني</span>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  <div class="row-t" style="gap:40px;">
    <div>${st('Price · regular')}<div class="price price-lg"><span class="now">890 ${sar}</span></div></div>
    <div>${st('Price · on sale')}<div class="price price-lg"><span class="now sale">1٬240 ${sar}</span><span class="was">1٬650 ${sar}</span><span class="off">−٢٥٪</span></div></div>
    <div>${st('Rating + reviews')}<div class="rating"><span class="score">4.7</span>${stars(5)}<span class="count">(٣١٢ تقييم)</span></div>
      <div class="rating" style="margin-top:10px;">${stars(3)}<span class="count">(١٨)</span></div></div>
  </div>
</div>

<h3 class="subhead">Product cards — بطاقات المنتج</h3>
<div class="live-theme framed">
  <div class="grid-auto" style="grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:16px;">
    ${productCard({rug:1,cat:'كليم · Kilim',title:'سجادة كليم مغربية',rate:5,count:'٣١٢',price:'1٬240',was:'1٬650',off:'٢٥',badges:'<span class="badge badge-sale">خصم ٢٥٪</span>',wish:true})}
    ${productCard({rug:2,cat:'شاج · Shaggy',title:'سجاد شاج ناعم',rate:4,count:'٨٧',price:'890',badges:'<span class="badge badge-new">جديد</span>'})}
    ${productCard({rug:5,cat:'فينتيج · Vintage',title:'سجادة فينتيج مغسولة',rate:5,count:'٤٤',price:'2٬980',badges:'<span class="badge badge-low badge-dot">ينفد قريبًا</span>'})}
    ${productCard({rug:3,cat:'عصري · Modern',title:'سجاد هندسي عصري',rate:4,count:'١٥٦',price:'640'})}
  </div>
  <p class="cap" style="margin:14px 0 0;">Hover a card: image zoom, lift shadow, and the quick «أضف للسلة» bar reveals from the bottom. Wishlist heart fills on toggle.</p>
</div>

<h3 class="subhead">Category &amp; room cards — الفئات والغرف</h3>
<div class="live-theme framed">
  <div class="grid-auto" style="grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:14px; margin-bottom:18px;">
    <a class="ccard"><div class="rug rug-1"></div><div class="scrim"></div><div class="cap"><div class="t">كليم</div><div class="c">١٢٤ منتج</div></div></a>
    <a class="ccard"><div class="rug rug-2"></div><div class="scrim"></div><div class="cap"><div class="t">شاج ناعم</div><div class="c">٨٦ منتج</div></div></a>
    <a class="ccard"><div class="rug rug-5"></div><div class="scrim"></div><div class="cap"><div class="t">فينتيج</div><div class="c">٤٢ منتج</div></div></a>
    <a class="ccard"><div class="rug rug-3"></div><div class="scrim"></div><div class="cap"><div class="t">عصري</div><div class="c">٢٠٣ منتج</div></div></a>
  </div>
  ${st('Shop by room — تسوّق حسب الغرفة')}
  <div class="grid-auto" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:12px;">
    <a class="roomcard"><span class="thumb"><span class="rug rug-4"></span></span><span><span class="t">المجلس</span><span class="c">سجاد واسع وفخم</span></span><span class="arr">${icon('arrowL')}</span></a>
    <a class="roomcard"><span class="thumb"><span class="rug rug-1"></span></span><span><span class="t">غرفة المعيشة</span><span class="c">دافئ ومريح</span></span><span class="arr">${icon('arrowL')}</span></a>
    <a class="roomcard"><span class="thumb"><span class="rug rug-2"></span></span><span><span class="t">غرفة النوم</span><span class="c">ناعم تحت القدم</span></span><span class="arr">${icon('arrowL')}</span></a>
  </div>
</div>

<h3 class="subhead">Variant selectors &amp; stepper — الخيارات</h3>
<div class="live-theme framed">
  <div class="row-t" style="gap:40px;">
    <div>${st('Color swatch · selected / disabled')}
      <div class="swatches" id="swatchDemo">
        <span class="swcolor sel" style="background:#BF5B3E" title="طوبي"></span>
        <span class="swcolor" style="background:#1E6E68" title="أزرق مخضر"></span>
        <span class="swcolor" style="background:#3A5A78" title="كحلي"></span>
        <span class="swcolor" style="background:#D9C3A0" title="رملي"></span>
        <span class="swcolor disabled" style="background:#7A6E61" title="غير متوفر"></span>
      </div>
    </div>
    <div>${st('Quantity stepper')}
      <div class="qty" id="qtyDemo"><button data-q="-1" aria-label="إنقاص">${icon('minus')}</button><span class="val">٢</span><button data-q="1" aria-label="زيادة">${icon('plus')}</button></div>
    </div>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  ${st('Size selector · selected / out-of-stock / disabled')}
  <div class="sizes" id="sizeDemo">
    <button class="size">٨٠×١٥٠<small>سم</small></button>
    <button class="size sel">١٦٠×٢٣٠<small>سم</small></button>
    <button class="size">٢٠٠×٣٠٠<small>سم</small></button>
    <button class="size oos">٢٤٠×٣٤٠<small>نفد</small></button>
    <button class="size disabled" disabled>دائري ٢٠٠<small>قريبًا</small></button>
  </div>
</div>

<h3 class="subhead">Navigation — التنقّل</h3>
<div class="live-theme framed">
  ${st('Breadcrumb')}
  <nav class="crumbs" style="margin-bottom:18px;">
    <a>الرئيسية</a>${icon('chevLeft','sep')}<a>السجاد</a>${icon('chevLeft','sep')}<a>كليم</a>${icon('chevLeft','sep')}<span class="cur">كليم مغربي</span>
  </nav>
  ${st('Navbar + mega-menu (open)')}
  <div class="nav">
    <div class="row">
      <span class="logo">رُقعة</span>
      <div class="links">
        <a class="active">السجاد ${icon('chevDown')}</a>
        <a>الغرف</a><a>كليم</a><a>العروض</a><a>جديدنا</a>
      </div>
      <div class="tools">
        <button class="icon-btn" aria-label="بحث">${icon('search')}</button>
        <button class="icon-btn" aria-label="حسابي">${icon('user')}</button>
        <button class="icon-btn" aria-label="المفضّلة">${icon('heart')}</button>
        <button class="icon-btn" aria-label="السلة">${icon('cart')}<span class="cnt">٣</span></button>
      </div>
    </div>
    <div class="mega">
      <div class="col"><h5>حسب النوع</h5><a>كليم مغربي</a><a>شاج ناعم</a><a>فينتيج مغسول</a><a>عصري هندسي</a><a>تقليدي فارسي</a></div>
      <div class="col"><h5>حسب الغرفة</h5><a>المجلس</a><a>غرفة المعيشة</a><a>غرفة النوم</a><a>الممر</a><a>مدخل المنزل</a></div>
      <div class="col"><h5>حسب المقاس</h5><a>صغير · حتى ١٢٠×١٧٠</a><a>متوسط · ١٦٠×٢٣٠</a><a>كبير · ٢٠٠×٣٠٠</a><a>دائري</a><a>ممرات</a></div>
      <a class="promo"><span class="rug rug-5" style="position:absolute;inset:0;"></span><span class="scrim"></span><span class="txt"><b>خصم حتى ٤٠٪</b><span>تشكيلة الكليم المختارة</span></span></a>
    </div>
  </div>
</div>

<h3 class="subhead">Filters, sort, tabs &amp; pagination</h3>
<div class="live-theme framed">
  ${st('Filter chips · active / removable')}
  <div class="chips" style="margin-bottom:18px;">
    <span class="chip active">${icon('filter')} الكل <span class="chip-count">٤٢٠</span></span>
    <span class="chip">كليم</span>
    <span class="chip">شاج</span>
    <span class="chip removable">طوبي ${icon('x','x')}</span>
    <span class="chip removable">١٦٠×٢٣٠ ${icon('x','x')}</span>
  </div>
  <div class="row" style="justify-content:space-between; align-items:center; gap:14px; margin-bottom:20px;">
    <span class="cap" style="color:var(--c-muted);">عرض ٤٢٠ منتجًا</span>
    <div class="select-wrap" style="width:200px;"><select class="input"><option>الترتيب: الأكثر رواجًا</option><option>السعر: من الأقل</option><option>السعر: من الأعلى</option><option>الأحدث</option></select>${icon('chevDown')}</div>
  </div>
  <div class="tabs" id="tabsDemo">
    <button aria-selected="true">الوصف</button>
    <button aria-selected="false">المقاسات</button>
    <button aria-selected="false">الشحن والإرجاع</button>
    <button aria-selected="false">التقييمات (٣١٢)</button>
  </div>
  <div class="tab-body" id="tabBody">سجادة كليم مغربية منسوجة يدويًا من صوف طبيعي ١٠٠٪، بألوان نباتية ثابتة وملمس مسطّح متين يناسب المناطق كثيرة الحركة. تتحسّن مع الوقت ويسهل تنظيفها.</div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  ${st('Pagination')}
  <div class="pager" id="pagerDemo">
    <button aria-label="السابق">${icon('chevRight')}</button>
    <button aria-current="true">١</button><button>٢</button><button>٣</button>
    <span class="gap">…</span><button>١٢</button>
    <button aria-label="التالي">${icon('chevLeft')}</button>
  </div>
</div>

<h3 class="subhead">Feedback — التنبيهات</h3>
<div class="live-theme framed">
  <div class="row-t" style="gap:18px; align-items:flex-start;">
    <div class="demo-cell">${st('Toast · success')}
      <div class="toast"><span class="ic">${icon('checkCircle')}</span><div class="tx"><b>أُضيف إلى السلة</b><span>سجادة كليم مغربية · ١٦٠×٢٣٠</span></div><button class="close">${icon('x')}</button></div>
    </div>
    <div class="demo-cell">${st('Toast · error')}
      <div class="toast err"><span class="ic">${icon('info')}</span><div class="tx"><b>نفدت الكمية</b><span>هذا المقاس غير متوفر حاليًا</span></div><button class="close">${icon('x')}</button></div>
    </div>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  ${st('Modal — try the live trigger')}
  <button class="btn btn-secondary" id="openModalBtn">افتح النافذة</button>
  <div class="modal-demo" style="margin-top:14px;">
    <div class="modal">
      <div class="mhead"><div><div class="t">إتمام الإضافة للسلة</div><div class="s">سجادة كليم مغربية · ١٦٠×٢٣٠ سم</div></div><button class="close">${icon('x')}</button></div>
      <div class="mbody">تمت إضافة المنتج إلى سلتك. لديك الآن ٣ منتجات بقيمة 3٬370 ر.س. الشحن مجاني للطلبات فوق ٣٠٠ ر.س.</div>
      <div class="mfoot"><button class="btn btn-ghost">متابعة التسوّق</button><button class="btn btn-primary">عرض السلة</button></div>
    </div>
  </div>
</div>

<h3 class="subhead">Empty state &amp; loading skeletons</h3>
<div class="live-theme framed">
  <div class="row-t" style="gap:24px; align-items:stretch;">
    <div style="flex:1; min-width:260px; border:1px solid var(--c-border); border-radius:14px;">
      ${st('<span style=\"padding-inline-start:14px;display:inline-block;padding-top:12px\">Empty state</span>')}
      <div class="empty">
        <div class="ill">${icon('bag')}</div>
        <h4>سلتك فارغة</h4>
        <p>لم تُضِف أي سجاد بعد. استكشف تشكيلتنا وابدأ بتنسيق مساحتك.</p>
        <button class="btn btn-primary">${icon('grid')} تصفّح السجاد</button>
      </div>
    </div>
    <div style="flex:1; min-width:260px;">
      ${st('Card skeleton')}
      <div class="grid-auto" style="grid-template-columns:1fr 1fr; gap:14px;">
        ${[0,1].map(()=>`<div class="skel-card"><div class="skel sk-img"></div><div class="sk-body"><div class="skel" style="height:12px;width:60%;"></div><div class="skel" style="height:16px;width:90%;"></div><div class="skel" style="height:14px;width:40%;"></div></div></div>`).join('')}
      </div>
    </div>
  </div>
  <hr style="border:0;border-top:1px solid var(--c-border);margin:20px 0;" />
  ${st('Page skeleton (PDP)')}
  <div class="grid-auto" style="grid-template-columns:1.2fr 1fr; gap:24px;">
    <div class="skel" style="height:240px; border-radius:14px;"></div>
    <div class="stack" style="gap:13px;">
      <div class="skel" style="height:13px;width:35%;"></div>
      <div class="skel" style="height:28px;width:80%;"></div>
      <div class="skel" style="height:18px;width:50%;"></div>
      <div class="skel" style="height:1px;width:100%;margin:6px 0;"></div>
      <div class="skel" style="height:44px;width:60%;border-radius:10px;"></div>
      <div class="skel" style="height:48px;width:100%;border-radius:10px;"></div>
    </div>
  </div>
</div>
`;

/* =================== ICONS & IMAGERY =================== */
const iconsList = ['search','heart','cart','user','bag','truck','shield','ruler','filter','swatch','grid','trash','star','sparkle','chevLeft','plus'];
const icons = `
<div class="panel panel-pad">
  <div class="row" style="justify-content:space-between; align-items:flex-end; margin-bottom:18px;">
    <div><div class="state-tag" style="color:var(--chrome-tag)">Line set · 1.75px stroke · round caps &amp; joins · 24px grid</div></div>
  </div>
  <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(76px,1fr)); gap:10px;">
    ${iconsList.map(n=>`<div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 6px;border:1px solid var(--chrome-line);border-radius:12px;color:var(--chrome-ink);"><span style="width:24px;height:24px;display:grid;place-items:center;">${icon(n)}</span><span class="mono" style="font-size:9.5px;color:var(--chrome-tag)">${n}</span></div>`).join('')}
  </div>
  <div class="row-t" style="gap:26px; margin-top:22px; padding-top:18px; border-top:1px solid var(--chrome-line);">
    <div><div class="state-tag" style="color:var(--chrome-tag)">Line — default</div><span style="color:var(--chrome-ink)">${icon('heart')}</span></div>
    <div><div class="state-tag" style="color:var(--chrome-tag)">Filled — active/selected only</div><span style="color:#C0392B"><svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.4" style="width:24px;height:24px">${ICON.heart}</svg></span></div>
    <div style="flex:1; min-width:240px;"><div class="state-tag" style="color:var(--chrome-tag)">Rule</div><p class="cap" style="margin:0;color:var(--chrome-ink-2)">Icons stay line by default; switch to filled only to signal an active or selected state (wishlist on, rating filled). Never mix weights in one cluster.</p></div>
  </div>
</div>
<h3 class="subhead">Imagery &amp; photo treatment</h3>
<div class="panel panel-pad">
  <div class="grid-auto" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:14px; margin-bottom:18px;">
    <div class="live-theme" data-lock data-theme="1" style="border-radius:12px;overflow:hidden"><div class="rug rug-1" style="aspect-ratio:4/5"></div></div>
    <div class="live-theme" data-lock data-theme="2" style="border-radius:12px;overflow:hidden"><div class="rug rug-2" style="aspect-ratio:4/5"></div></div>
    <div class="live-theme" data-lock data-theme="3" style="border-radius:12px;overflow:hidden"><div class="rug rug-5" style="aspect-ratio:4/5"></div></div>
    <div class="live-theme" data-lock data-theme="5" style="border-radius:12px;overflow:hidden"><div class="rug rug-3" style="aspect-ratio:4/5"></div></div>
  </div>
  <p class="cap" style="margin:0;color:var(--chrome-ink-2);max-width:70ch;">These tiles are abstract weave placeholders standing in for photography. Guidance for real assets:</p>
  <ul class="principles" style="margin-top:14px;">
    <li><b>Two shot types.</b> Cutout-on-surface for catalogue (consistent 4:5, rug flat on a tonal floor); lifestyle for hero &amp; room cards (rug in a styled interior).</li>
    <li><b>Crop &amp; ratio.</b> Catalogue 4:5, lifestyle 3:2 or 16:9. Keep the rug centred with even margin; never crop the border off a catalogue shot.</li>
    <li><b>Background.</b> Neutral warm floor (concrete, oak, travertine). Avoid pure white — it fights the warm UI.</li>
    <li><b>Shadow.</b> One soft contact shadow under the rug; no drop-shadows on the card itself beyond the system elevation.</li>
    <li><b>Colour truth.</b> Shoot in even daylight; the on-site swatch dots must match the woven colour exactly.</li>
  </ul>
</div>
`;

/* =================== MOTION =================== */
const motion = `
<div class="panel panel-pad">
  <table class="contrast-table" style="margin-bottom:8px;">
    <thead><tr><th>Interaction</th><th>Duration</th><th>Easing</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><b>Hover feedback</b> (buttons, links, chips)</td><td class="mono">120–160ms</td><td class="mono">ease</td><td class="cap">colour / border only, no movement</td></tr>
      <tr><td><b>Card lift</b> (product card)</td><td class="mono">250ms</td><td class="mono">cubic-bezier(.2,.7,.3,1)</td><td class="cap">translateY(−4px) + shadow + 1.045 image zoom</td></tr>
      <tr><td><b>Quick-add reveal</b></td><td class="mono">250ms</td><td class="mono">ease</td><td class="cap">slides up from card base on hover/focus</td></tr>
      <tr><td><b>Dropdown / mega-menu</b></td><td class="mono">180ms</td><td class="mono">ease-out</td><td class="cap">fade + 4px rise</td></tr>
      <tr><td><b>Modal / drawer</b></td><td class="mono">220ms</td><td class="mono">cubic-bezier(.2,.7,.3,1)</td><td class="cap">scrim fade + scale 0.98→1</td></tr>
      <tr><td><b>Page / section transition</b></td><td class="mono">300ms</td><td class="mono">ease</td><td class="cap">stays under ⅓ s; content fades up 8px</td></tr>
      <tr><td><b>Skeleton shimmer</b></td><td class="mono">1.4s loop</td><td class="mono">ease</td><td class="cap">disabled under reduced-motion</td></tr>
    </tbody>
  </table>
  <div class="live-theme framed" style="margin-top:16px;">
    <div class="state-tag">Live — hover the card &amp; button</div>
    <div class="row-t" style="gap:20px; align-items:flex-start;">
      <div style="width:190px;">${productCard({rug:1,cat:'كليم',title:'سجادة كليم',rate:5,count:'٣١٢',price:'1٬240',was:'1٬650',off:'٢٥',badges:'<span class=\"badge badge-sale\">خصم ٢٥٪</span>'})}</div>
      <button class="btn btn-primary">${icon('cart')} مرّر فوقي</button>
    </div>
  </div>
  <p class="cap" style="margin:14px 0 0;color:var(--chrome-ink-2)">All transitions are wrapped so that <span class="mono">@media (prefers-reduced-motion: reduce)</span> removes movement and shimmer, keeping only instant colour state changes.</p>
</div>
`;

/* =================== ACCESSIBILITY =================== */
const a11y = `
<div class="grid-auto" style="grid-template-columns:1fr 1fr; gap:18px;">
  <div class="panel panel-pad">
    <h3 class="subhead" style="margin-top:0;">Contrast &amp; focus</h3>
    <ul class="principles">
      <li><b>Text contrast ≥ 4.5:1</b> for body, ≥ 3:1 for large (≥24px / bold ≥18.66px) &amp; UI. Accents flagged in §2 are restricted to large/UI use.</li>
      <li><b>Visible focus ring</b> — 2px offset ring in <span class="mono">--color-accent</span> on a <span class="mono">--color-bg</span> halo, never removed.</li>
      <li><b>Don't rely on colour alone</b> — sale carries «خصم/−%» text, low-stock carries a dot + label, errors carry text.</li>
    </ul>
    <div class="live-theme framed" style="margin-top:14px;"><div class="state-tag">Focus ring</div><button class="btn btn-primary focus-demo">حقل مُركّز</button></div>
  </div>
  <div class="panel panel-pad">
    <h3 class="subhead" style="margin-top:0;">Targets &amp; RTL / bidi</h3>
    <ul class="principles">
      <li><b>Tap targets ≥ 44×44px</b> — icon buttons, steppers, swatches and pagination all meet the minimum.</li>
      <li><b>RTL-native</b> — all spacing/borders use logical properties (<span class="mono">inline-start/end</span>); layouts mirror automatically. Chevrons flip direction.</li>
      <li><b>Bidi numbers</b> — wrap mixed runs in <span class="mono">dir="auto"</span>; keep prices as <span class="mono">1٬240 ر.س</span> with the symbol trailing and <span class="mono">tabular-nums</span> for alignment.</li>
      <li><b>Latin inside Arabic</b> — SKUs/sizes like «160×230» and «SALE» render LTR within the RTL line via isolation.</li>
    </ul>
    <div class="live-theme framed" style="margin-top:14px;"><div class="state-tag">Min 44px targets</div>
      <div class="row"><button class="btn btn-icon" aria-label="مفضلة">${icon('heart')}</button><div class="qty"><button>${icon('minus')}</button><span class="val">١</span><button>${icon('plus')}</button></div></div>
    </div>
  </div>
</div>
`;

window.MARKUP = { components, icons, motion, a11y };
})();
