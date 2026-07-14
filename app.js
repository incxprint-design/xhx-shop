const quantity = document.querySelector('#quantity');
const product = document.querySelector('#product');
const pattern = document.querySelector('#pattern');
const shipping = document.querySelector('#shipping');
const supplyMode = document.querySelector('#supply-mode');
const polyFabric = document.querySelector('#poly-fabric');
const blockLength = document.querySelector('#block-length');
const radios = document.querySelectorAll('input[name="orderType"]');
let currentLanguage=localStorage.getItem('xhx-language')==='en'?'en':'th';
const t=(thai,english)=>currentLanguage==='en'?english:thai;
const localeNumber=value=>Number(value).toLocaleString(currentLanguage==='en'?'en-US':'th-TH');
const money = value => new Intl.NumberFormat(currentLanguage==='en'?'en-US':'th-TH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)+t(' บาท',' THB');

const translationRules=[
  ['.nav-links a',['Our fabric','Colors & patterns','Sublimation','DTF printing','Price calculator','Contact']],
  ['.nav-cta','Get a quote'],
  ['.hero .eyebrow','Fabric shop · Fabric printing · Online estimates'],
  ['.hero h1','Beautiful fabrics, ready for <em>custom printing</em>',true],
  ['.hero .lead','Shop Cotton Oxford in solid colors, stripes and checks, or print your own design on polyester with Sublimation. Fabric and printing services in one place.'],
  ['.hero-actions button',['Shop Cotton Oxford','Print polyester fabric']],
  ['.hero-notes span',['✓ Cotton starts from 1 yard','✓ Print on store or customer-supplied fabric','✓ Instant online estimates']],
  ['.print-label strong','Sublimation'],['.print-label span','Vivid and sharp printing'],
  ['.circle-stamp','3<small>services in one place</small>',true],
  ['.quick-choice-heading .eyebrow','Choose a service'],['.quick-choice-heading h2','What are you looking for today?'],['.quick-choice-heading>p:last-child','Choose a product or service to view details and calculate the price instantly.'],
  ['.quick-card small',['Fabric shop','Printing service','DTF film printing']],
  ['.quick-card h3',['Shop Cotton Oxford','Polyester sublimation printing','DTF film printing']],
  ['.quick-card p',['Solid colors, stripes and checks, 45-inch width, starting from 1 yard.','Vivid Sublimation printing. Calculate customer-supplied fabric, store fabric and block work.','58 cm wide film priced per meter, ready for heat transfer onto apparel and fabric products.']],
  ['.quick-card b',['Choose Cotton Oxford <i>→</i>','Choose Sublimation printing <i>→</i>','Choose DTF printing <i>→</i>'],true],
  ['.stats-grid span',['colors and patterns','fabric width','full-roll price / yard','minimum order']],
  ['#fabric .eyebrow','Our fabric'],['#fabric h2','Cotton Oxford'],['#fabric .section-intro','A beautifully woven, versatile fabric suitable for sewing, décor, apparel, bags and craft projects.'],
  ['#fabric .tag-row span',['Solid','Stripe','Check']],['#fabric .notice','This product is sold as finished fabric and is not available for custom printing.'],
  ['#fabric .table-head span',['Quantity','Price per yard']],['#fabric .price-table-card>div:not(.table-head):not(.highlight) span',['1–9 yards','10–49 yards','50–99 yards','100+ yards']],['#fabric .price-table-card strong',['80 THB','75 THB','60 THB','55 THB','50 THB']],['#fabric .highlight span','Full roll (approx. 120 yards)'],['#fabric .price-table-card small','* Retail yard orders may mix colors and patterns at every price tier. Full rolls cannot be mixed.'],
  ['#patterns .section-heading .eyebrow','Colors & patterns'],['#patterns .section-heading h2','Find your perfect tone'],['#patterns .section-heading>p','Photos are taken from actual samples. Screen colors may vary slightly; please confirm stock before ordering.'],
  ['.pattern-info h3',['Solid colors','Stripes','Checks']],['.pattern-info p',['Over 94 color codes, including bright, pastel, earth and deep shades. The actual code is shown on each photo.','Many stripe widths and color combinations, from fine stripes to bold stripes.','Small and large checks in soft, vivid and classic color combinations.']],
  ['.color-catalog .catalog-heading h3','Solid color chart'],['.color-catalog .catalog-heading p','94 photos · The actual code is shown on each image'],['.color-catalog .cute-label','Choose a color ♡'],
  ['#patterns .pattern-catalog .catalog-heading h3',['Stripe collections','Check collections']],['#patterns .pattern-catalog .catalog-heading p',['Multiple stripe widths and color pairs · Actual codes appear in each image','Small and large checks · Actual codes appear in each image']],['#patterns .pattern-catalog .cute-label',['Stripes ♡','Checks ♡']],
  ['#sublimation .section-heading .eyebrow','Poly sublimation'],['#sublimation .section-heading h2','Polyester printing'],['#sublimation .section-heading>p','Bring your own fabric or select polyester fabric from our 58–60 inch wide range.'],
  ['.service-steps h3',['Customer fabric','Store fabric','Block work']],['.service-steps p',['Printing fee only, based on yards per file.','Fabric price plus printing fee.','Fabric + printing + block percentage based on the fabric length used.']],
  ['.poly-tables .mini-table h3',['Printing fee, fabric excluded','Store fabric prices','Block-work percentage']],
  ['.poly-tables .mini-table:first-child span',['1–9 yards','10–19 yards','20–99 yards','100–149 yards','150+ yards']],['.poly-tables .mini-table:first-child b',['100 THB/yard','60 THB/yard','50 THB/yard','40 THB/yard','23 THB/yard']],['.poly-tables .mini-table:first-child small','Printing rates are per file'],
  ['.poly-tables .block-table span',['Up to 100 cm','Up to 200 cm','Up to 300 cm','Up to 400 cm','Over 400 cm']],['.poly-tables .block-table small','Measured by fabric length · Added to fabric + printing total'],
  ['.print-samples .catalog-heading h3','See the fabric texture and actual printed colors'],['.print-samples .catalog-heading>p','Tap an image to enlarge · Screen colors may differ slightly from the actual fabric.'],['.print-samples .cute-label','Before & after printing'],
  ['.file-examples .catalog-heading h3','Artwork preparation examples'],['.file-examples .catalog-heading>p','Examples for seamless patterns and block artwork.'],['.file-examples .cute-label','Prepare your artwork'],
  ['#dtf .eyebrow','DTF film printing'],['#dtf h2','DTF film printing'],['#dtf .section-intro','DTF film printing in 58 × 100 cm per meter, suitable for heat transfer onto apparel, bags and fabric products.'],['#dtf .dtf-calc-button','Calculate DTF price'],
  ['.dtf-table h3','Printing rate per meter'],['.dtf-table span',['1–9 meters','10–19 meters','20–49 meters','50–99 meters','100+ meters']],['.dtf-table b',['140 THB','100 THB','80 THB','70 THB','60 THB']],['.dtf-table small','58 × 100 cm per meter · Contact staff for delivery'],['.dtf-photo>span b','DTF print sample'],['.dtf-photo>span small','Vivid colors and sharp detail · Tap to enlarge'],['.dtf-video-card>span b','Watch the printing process'],['.dtf-video-card>span small','Tap play to watch DTF printing'],
  ['.calculator-heading .eyebrow','Instant estimate'],['.calculator-heading h2','Calculate your price instantly'],['.calculator-heading>p:last-child','Choose Cotton Oxford, Sublimation printing or DTF film. The system separates each cost automatically.'],
  ['label[for="product"]','Product / service'],['#product option',['Cotton Oxford, 45-inch width','Polyester Sublimation printing','DTF film, 58 × 100 cm']],
  ['.cotton-only>label:first-child','Order type'],['.choice span',['Order by yard','Full roll (approx. 120 yards)']],
  ['label[for="supply-mode"]','Printing option'],['#supply-mode option',['Customer-supplied fabric — printing fee only','Use store fabric — fabric + printing','Block work — fabric + printing + block percentage']],
  ['label[for="poly-fabric"]','Select store polyester fabric (58–60 inch width)'],
  ['#poly-fabric option',['Italian Silk 120g — 20 THB/yard','High Grade — 16 THB/yard','Sandy Chiffon — 23 THB/yard','Four-way — 24 THB/yard','Micro Smooth 145G — 25 THB/yard','Sara — 26 THB/yard','Slub — 28 THB/yard','Ribbed — 32 THB/yard','Satin Diamond — 42 THB/yard','Pepe/Bonnie — 45 THB/yard','ITY — 49 THB/yard','Solon — 55 THB/yard']],
  ['label[for="block-length"]','Fabric length used for the block (cm)'],['label[for="pattern"]','Pattern type'],['#pattern option',['Solid','Stripe','Check','Mixed colors/patterns']],
  ['label[for="shipping"]','Delivery'],['#shipping option',['Standard delivery — calculated automatically','Self pickup — free']],
  ['label[for="customer"]','Customer / shop name'],['label[for="customer-phone"]','Customer phone (optional)'],['label[for="customer-address"]','Customer address (optional)'],
  ['.summary-label','Estimate summary'],['.summary-card .line>span',['Price per yard','Fabric cost','Printing cost','Block-work charge','Delivery']],['.total-line span','Grand total'],
  ['#download-quote','Download quotation PDF'],['.line-button','Add LINE and ask us'],
  ['#contact .eyebrow','Talk to us'],['#contact h2','Let us help you choose the right fabric for your project'],['.contact-qr b','Tap or scan to add LINE'],['.contact-qr small','Ask for prices and place an order instantly'],
  ['.contact-list>a>span',['Phone','LINE','Email','Facebook']],['.contact-list>a:nth-child(2) strong','Tap to add a friend and chat ↗'],['.contact-list>div>span','Address'],
  ['.mobile-cta-bar a',['Get a quotation','Add LINE']],
  ['.sample-image span',Array.from({length:26},(_,index)=>index%2?'After printing':'Before printing')],
  ['.before-after-card h4',['Italian Silk 120g','Ribbed','Micro Smooth 145G','Sara','Pepe/Bonnie','ITY','Sandy Chiffon','Satin Diamond','Solon','Four-way','High Grade','Slub','Wool Wave']],
  ['.file-example-grid b',['Seamless pattern','Artwork dimensions','Block artwork']],['.file-example-grid small',['Tile seamlessly on all sides','Match artwork size to fabric width','Separate front, back, sleeves and components']],
  ['.quotation-title-wrap h1','Quotation'],['.quotation-meta span',['Quotation no.','Date','Valid until']],['.quotation-parties h2',['Seller information','Customer information']],
  ['.quotation-parties dt',['Customer','Phone','Address']],['.quotation-table th',['No.','Product / service','Quantity','Unit price','Amount']],
  ['.quotation-notes h2','Notes'],['.quotation-totals dt',['Subtotal','Delivery','Grand total']],['.quotation-footer h2','Contact'],['.signature>span','Prepared by']
];
const originalLanguageContent=new WeakMap();
function applyTranslationRule(selector,english,useHtml=false){
  const elements=[...document.querySelectorAll(selector)];
  const values=Array.isArray(english)?english:[english];
  elements.forEach((element,index)=>{
    if(!originalLanguageContent.has(element))originalLanguageContent.set(element,useHtml?element.innerHTML:element.textContent);
    const value=currentLanguage==='en'?(values[index]??values[values.length-1]):originalLanguageContent.get(element);
    if(useHtml)element.innerHTML=value;else element.textContent=value;
  });
}

function applyLanguage(){
  document.documentElement.lang=currentLanguage;
  translationRules.forEach(([selector,english,useHtml])=>applyTranslationRule(selector,english,useHtml));
  document.querySelectorAll('#color-grid .color-card b').forEach(element=>{
    if(!originalLanguageContent.has(element))originalLanguageContent.set(element,element.textContent);
    const code=element.textContent.match(/\d+/)?.[0]||'';
    element.textContent=currentLanguage==='en'?`Code ${code}`:originalLanguageContent.get(element);
  });
  document.querySelectorAll('#stripe-grid .color-card b,#check-grid .color-card b').forEach(element=>{
    if(!originalLanguageContent.has(element))originalLanguageContent.set(element,element.textContent);
    const code=element.textContent.match(/\d+/)?.[0]||'';
    const isStripe=element.closest('#stripe-grid');
    element.textContent=currentLanguage==='en'?`${isStripe?'Stripe':'Check'} set ${code}`:originalLanguageContent.get(element);
  });
  const toggle=document.querySelector('#language-toggle');
  toggle.querySelector('span').textContent=currentLanguage==='en'?'ไทย':'EN';
  toggle.setAttribute('aria-label',currentLanguage==='en'?'เปลี่ยนเป็นภาษาไทย':'Switch to English');
  toggle.setAttribute('aria-pressed',currentLanguage==='en'?'true':'false');
  document.querySelector('#customer').placeholder=t('ระบุชื่อสำหรับใบเสนอราคา','Name shown on the quotation');
  document.querySelector('#customer-phone').placeholder=t('เช่น 08X-XXX-XXXX','e.g. 08X-XXX-XXXX');
  document.querySelector('#customer-address').placeholder=t('ระบุที่อยู่สำหรับแสดงในใบเสนอราคา','Address shown on the quotation');
  blockLength.placeholder=t('เช่น 150','e.g. 150');
  document.title=t('XHX SHOP — ผ้าคอตตอน ราคาส่ง','XHX SHOP — Fabrics & Printing Services');
  calculate();
}
const selectedPatternLabel=()=>({solid:t('สีพื้น','Solid'),stripe:t('ลายริ้ว','Stripe'),check:t('ลายสก็อต','Check'),mixed:t('คละสี/ลาย','Mixed colors/patterns')})[pattern.value];

function calculate(){
  const isPoly = product.value === 'sublimation';
  const isDtf = product.value === 'dtf';
  const isCotton = product.value === 'cotton';
  document.querySelectorAll('.cotton-only').forEach(el=>el.classList.toggle('hidden',!isCotton));
  document.querySelectorAll('.poly-only').forEach(el=>el.classList.toggle('hidden',!isPoly));
  document.querySelector('.store-fabric-field').classList.toggle('hidden',!isPoly || supplyMode.value==='customer');
  document.querySelector('.block-field').classList.toggle('hidden',!isPoly || supplyMode.value!=='block');
  if(isPoly){ calculateSublimation(); return; }
  if(isDtf){ calculateDtf(); return; }

  const isRoll = document.querySelector('input[name="orderType"]:checked').value === 'roll';
  if(isRoll && Number(quantity.value) < 120) quantity.value = 120;
  const mixedOption=[...pattern.options].find(option=>option.value==='mixed');
  mixedOption.disabled=isRoll;
  if(isRoll && pattern.value==='mixed') pattern.value='solid';
  const qty = Math.max(1, Number(quantity.value) || 1);
  let rate = isRoll ? 50 : qty >= 100 ? 55 : qty >= 50 ? 60 : qty >= 10 ? 75 : 80;
  const fabric = qty * rate;
  const shippingFee = shipping.value === 'pickup' ? 0 : calculateCottonShipping(qty);
  document.querySelector('#unit-price').textContent = money(rate);
  document.querySelector('#quantity-label').textContent = t('จำนวน (หลา)','Quantity (yards)');
  document.querySelector('#unit-price-label').textContent = t('ราคาต่อหลา','Price per yard');
  document.querySelector('#fabric-total').textContent = money(fabric);
  document.querySelector('#print-total').textContent = '—';
  document.querySelector('#block-line').classList.add('hidden');
  document.querySelector('#shipping-total').textContent = money(shippingFee);
  document.querySelector('#grand-total').textContent = money(fabric + shippingFee);
  document.querySelector('.summary-product span').textContent = 'Cotton Oxford';
  document.querySelector('#summary-detail').textContent = `${localeNumber(qty)} ${t('หลา','yards')} · ${selectedPatternLabel()}${isRoll?t(' · ยกม้วน',' · full roll'):''}`;
  document.querySelector('#form-note').textContent = t('ค่าจัดส่งคำนวณตามจำนวนหลา: เริ่มต้น 40 บาท และเมื่อเกิน 80 หลา เพิ่มทุก 10 หลาอีก 10 บาท','Delivery is calculated by yardage: starting at 40 THB; above 80 yards, add 10 THB for every additional 10 yards.');
  document.querySelector('#summary-note').textContent = t('ยอดประมาณการรวมค่าจัดส่งมาตรฐานแล้ว และยังไม่รวมภาษี (ถ้ามี)','The estimate includes standard delivery and excludes tax, if applicable.');
}

function calculateSublimation(){
  const qty=Math.max(1,Number(quantity.value)||1);
  const printRate=qty>=150?23:qty>=100?40:qty>=20?50:qty>=10?60:100;
  const printing=qty*printRate;
  const usesStoreFabric=supplyMode.value!=='customer';
  const fabricRate=usesStoreFabric?Number(polyFabric.value):0;
  const fabric=qty*fabricRate;
  const isBlock=supplyMode.value==='block';
  const length=Math.max(1,Number(blockLength.value)||1);
  const blockPercent=isBlock?getBlockPercent(length):0;
  const blockCharge=(fabric+printing)*blockPercent;
  const total=fabric+printing+blockCharge;
  const fabricName=polyFabric.options[polyFabric.selectedIndex].text.split(' — ')[0];

  document.querySelector('#quantity-label').textContent=t('จำนวน (หลา)','Quantity (yards)');
  document.querySelector('#unit-price-label').textContent=t('ค่าพิมพ์ต่อหลา','Printing per yard');
  document.querySelector('#unit-price').textContent=money(printRate);
  document.querySelector('#fabric-total').textContent=usesStoreFabric?money(fabric):t('ลูกค้านำผ้ามาเอง','Customer-supplied fabric');
  document.querySelector('#print-total').textContent=money(printing);
  document.querySelector('#block-line').classList.toggle('hidden',!isBlock);
  document.querySelector('#block-label').textContent=`${t('ค่างานบล็อก','Block-work charge')} +${Math.round(blockPercent*100)}%`;
  document.querySelector('#block-total').textContent=money(blockCharge);
  document.querySelector('#shipping-total').textContent=t('ติดต่อเจ้าหน้าที่','Contact staff');
  document.querySelector('#grand-total').textContent=money(total);
  document.querySelector('.summary-product span').textContent=t('พิมพ์ผ้าโพลี Sublimation','Polyester Sublimation printing');
  const modeText=supplyMode.value==='customer'?t('ลูกค้านำผ้ามาเอง','Customer-supplied fabric'):supplyMode.value==='block'?`${fabricName} · ${t('ความยาวบล็อก','block length')} ${localeNumber(length)} ${t('ซม.','cm')}`:fabricName;
  document.querySelector('#summary-detail').textContent=`${localeNumber(qty)} ${t('หลา','yards')} · ${modeText}`;
  document.querySelector('#form-note').textContent=t('ค่าพิมพ์คิดต่อไฟล์และต่อหลา งานบล็อกวัดจากความยาวผ้า และคิดเปอร์เซ็นต์เพิ่มจากผลรวมค่าผ้ากับค่าพิมพ์','Printing is priced per file and per yard. Block work is measured by fabric length and adds a percentage to fabric plus printing.');
  document.querySelector('#summary-note').textContent=t('ยอดพิมพ์ผ้ายังไม่รวมค่าจัดส่งและภาษี (ถ้ามี) กรุณาให้เจ้าหน้าที่ยืนยันไฟล์ก่อนผลิต','Printing totals exclude delivery and tax, if applicable. Please have staff confirm the artwork before production.');
}

function calculateDtf(){
  const qty=Math.max(1,Number(quantity.value)||1);
  const rate=qty>=100?60:qty>=50?70:qty>=20?80:qty>=10?100:140;
  const printing=qty*rate;
  document.querySelector('#quantity-label').textContent=t('จำนวน (เมตร)','Quantity (meters)');
  document.querySelector('#unit-price-label').textContent=t('ราคาพิมพ์ต่อเมตร','Printing per meter');
  document.querySelector('#unit-price').textContent=money(rate);
  document.querySelector('#fabric-total').textContent='—';
  document.querySelector('#print-total').textContent=money(printing);
  document.querySelector('#block-line').classList.add('hidden');
  document.querySelector('#shipping-total').textContent=t('ติดต่อเจ้าหน้าที่','Contact staff');
  document.querySelector('#grand-total').textContent=money(printing);
  document.querySelector('.summary-product span').textContent=t('ปริ้นฟิล์ม DTF','DTF film printing');
  document.querySelector('#summary-detail').textContent=`${localeNumber(qty)} ${t('เมตร','meters')} · 58 × 100 ${t('ซม.','cm')}`;
  document.querySelector('#form-note').textContent=t('ฟิล์ม DTF คิดราคาเป็นเมตร ขนาดงาน 58 × 100 ซม. ค่าจัดส่งกรุณาติดต่อเจ้าหน้าที่','DTF film is priced per meter at 58 × 100 cm. Please contact staff for delivery.');
  document.querySelector('#summary-note').textContent=t('ยอดปริ้นฟิล์ม DTF ยังไม่รวมค่าจัดส่งและภาษี (ถ้ามี) กรุณาให้เจ้าหน้าที่ยืนยันไฟล์ก่อนผลิต','DTF totals exclude delivery and tax, if applicable. Please have staff confirm the artwork before production.');
}

function getBlockPercent(length){
  if(length<=100) return .20;
  if(length<=200) return .25;
  if(length<=300) return .30;
  if(length<=400) return .40;
  return .50;
}

function calculateCottonShipping(qty){
  if(qty<=0) return 0;
  if(qty<=5) return 40;
  if(qty<=10) return 50;
  if(qty<=20) return 60;
  if(qty<=30) return 70;
  if(qty<=40) return 80;
  if(qty<=50) return 90;
  if(qty<=60) return 100;
  if(qty<=70) return 120;
  if(qty<=80) return 140;
  return 140 + 10 * Math.ceil((qty-80)/10);
}

[quantity,product,pattern,shipping,supplyMode,polyFabric,blockLength,...radios].forEach(el=>el.addEventListener('change',calculate));
quantity.addEventListener('input',calculate);
blockLength.addEventListener('input',calculate);
radios.forEach(r=>r.addEventListener('change',()=>{quantity.min=r.value==='roll'?120:1;calculate()}));
document.querySelectorAll('[data-quick-product]').forEach(button=>button.addEventListener('click',()=>{
  product.value=button.dataset.quickProduct;
  calculate();
  document.querySelector('#calculator').scrollIntoView({behavior:'smooth',block:'start'});
  setTimeout(()=>quantity.focus({preventScroll:true}),500);
}));
const quoteNumber = value => new Intl.NumberFormat(currentLanguage==='en'?'en-US':'th-TH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)+t(' บาท',' THB');
const quoteDate = date => new Intl.DateTimeFormat(currentLanguage==='en'?'en-GB':'th-TH',{day:'numeric',month:'long',year:'numeric'}).format(date);

function thaiBahtText(amount){
  const numberWords=['ศูนย์','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า'];
  const positionWords=['','สิบ','ร้อย','พัน','หมื่น','แสน'];
  const readSixDigits=value=>{
    const digits=String(value);
    let result='';
    for(let index=0;index<digits.length;index++){
      const digit=Number(digits[index]);
      const position=digits.length-index-1;
      if(!digit) continue;
      if(position===1 && digit===1) result+='สิบ';
      else if(position===1 && digit===2) result+='ยี่สิบ';
      else if(position===0 && digit===1 && digits.length>1) result+='เอ็ด';
      else result+=numberWords[digit]+positionWords[position];
    }
    return result;
  };
  const readInteger=value=>{
    if(value===0) return numberWords[0];
    if(value>=1000000){
      const millions=Math.floor(value/1000000);
      const remainder=value%1000000;
      return readInteger(millions)+'ล้าน'+(remainder?readSixDigits(remainder):'');
    }
    return readSixDigits(value);
  };
  const rounded=Math.round(Number(amount)*100)/100;
  const baht=Math.floor(rounded);
  const satang=Math.round((rounded-baht)*100);
  return readInteger(baht)+'บาท'+(satang?readSixDigits(satang)+'สตางค์':'ถ้วน');
}

function englishBahtText(amount){
  const ones=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const words=value=>{
    if(value<20)return ones[value];
    if(value<100)return tens[Math.floor(value/10)]+(value%10?'-'+ones[value%10]:'');
    if(value<1000)return ones[Math.floor(value/100)]+' hundred'+(value%100?' '+words(value%100):'');
    if(value<1000000)return words(Math.floor(value/1000))+' thousand'+(value%1000?' '+words(value%1000):'');
    return words(Math.floor(value/1000000))+' million'+(value%1000000?' '+words(value%1000000):'');
  };
  const rounded=Math.round(Number(amount)*100)/100;
  const baht=Math.floor(rounded),satang=Math.round((rounded-baht)*100);
  return (words(baht)+' baht'+(satang?' and '+words(satang)+' satang':' only')).replace(/\b\w/g,char=>char.toUpperCase());
}
const quotationAmountText=amount=>currentLanguage==='en'?englishBahtText(amount):thaiBahtText(amount);

function buildQuotation(){
  const qty=Math.max(1,Number(quantity.value)||1);
  const isCotton=product.value==='cotton';
  const isPoly=product.value==='sublimation';
  const rows=[];
  let subtotal=0;
  let shippingFee=0;
  let shippingText=t('ติดต่อเจ้าหน้าที่','Contact staff');
  let note=t('ราคานี้เป็นราคาเบื้องต้น กรุณารอเจ้าหน้าที่ยืนยันรายละเอียดและไฟล์งานก่อนเริ่มผลิต','This is a preliminary estimate. Please wait for staff to confirm details and artwork before production.');

  if(isCotton){
    const isRoll=document.querySelector('input[name="orderType"]:checked').value==='roll';
    const rate=isRoll?50:qty>=100?55:qty>=50?60:qty>=10?75:80;
    const total=qty*rate;
    rows.push({name:`Cotton Oxford ${t('หน้ากว้าง 45 นิ้ว','45-inch width')} - ${selectedPatternLabel()}${isRoll?t(' (ยกม้วน)',' (full roll)'):''}`,qty:`${localeNumber(qty)} ${t('หลา','yards')}`,rate,total});
    subtotal=total;
    shippingFee=shipping.value==='pickup'?0:calculateCottonShipping(qty);
    shippingText=shipping.value==='pickup'?t('รับสินค้าเอง - ฟรี','Self pickup - free'):quoteNumber(shippingFee);
    note=t('ผ้า Cotton Oxford สามารถคละสีและลายได้สำหรับออเดอร์ปลีก ยกเว้นการสั่งยกม้วน กรุณารอทางร้านยืนยันสต๊อก','Retail Cotton Oxford orders may mix colors and patterns, except full rolls. Please wait for stock confirmation.');
  }else if(isPoly){
    const printRate=qty>=150?23:qty>=100?40:qty>=20?50:qty>=10?60:100;
    const printing=qty*printRate;
    const usesStoreFabric=supplyMode.value!=='customer';
    if(usesStoreFabric){
      const fabricRate=Number(polyFabric.value);
      const fabricName=polyFabric.options[polyFabric.selectedIndex].text.split(' — ')[0];
      const fabricTotal=qty*fabricRate;
      rows.push({name:`${fabricName} ${t('หน้ากว้าง 58-60 นิ้ว','58-60 inch width')}`,qty:`${localeNumber(qty)} ${t('หลา','yards')}`,rate:fabricRate,total:fabricTotal});
      subtotal+=fabricTotal;
    }
    rows.push({name:`${t('ค่าพิมพ์ผ้าโพลี Sublimation','Polyester Sublimation printing')}${supplyMode.value==='customer'?t(' (ลูกค้านำผ้ามาเอง)',' (customer-supplied fabric)'):''}`,qty:`${localeNumber(qty)} ${t('หลา','yards')}`,rate:printRate,total:printing});
    subtotal+=printing;
    if(supplyMode.value==='block'){
      const length=Math.max(1,Number(blockLength.value)||1);
      const percent=getBlockPercent(length);
      const charge=subtotal*percent;
      rows.push({name:`${t('ค่างานบล็อก ความยาว','Block work, length')} ${localeNumber(length)} ${t('ซม.','cm')} (+${Math.round(percent*100)}%)`,qty:t('1 งาน','1 job'),rate:null,total:charge});
      subtotal+=charge;
    }
    note=t('ราคาพิมพ์คิดต่อไฟล์และต่อหลา งานบล็อกวัดจากความยาวผ้า ค่าจัดส่งกรุณาติดต่อเจ้าหน้าที่','Printing is priced per file and per yard. Block work is measured by fabric length. Please contact staff for delivery.');
  }else{
    const rate=qty>=100?60:qty>=50?70:qty>=20?80:qty>=10?100:140;
    const total=qty*rate;
    rows.push({name:t('ปริ้นฟิล์ม DTF ขนาด 58 x 100 ซม.','DTF film printing, 58 x 100 cm'),qty:`${localeNumber(qty)} ${t('เมตร','meters')}`,rate,total});
    subtotal=total;
    note=t('ค่าจัดส่งงานปริ้นฟิล์ม DTF กรุณาติดต่อเจ้าหน้าที่ และโปรดตรวจสอบไฟล์งานก่อนเริ่มผลิต','Please contact staff for DTF delivery and confirm the artwork before production.');
  }

  const today=new Date();
  const validDate=new Date(today);
  validDate.setDate(validDate.getDate()+7);
  const pad=value=>String(value).padStart(2,'0');
  const quoteId=`XHX-${today.getFullYear()}${pad(today.getMonth()+1)}${pad(today.getDate())}-${pad(today.getHours())}${pad(today.getMinutes())}`;
  const grandTotal=subtotal+shippingFee;
  document.querySelector('#quote-number').textContent=quoteId;
  document.querySelector('#quote-date').textContent=quoteDate(today);
  document.querySelector('#quote-valid-date').textContent=quoteDate(validDate);
  document.querySelector('#quote-sign-date').textContent=quoteDate(today);
  const customerName=document.querySelector('#customer').value.trim()||t('ลูกค้าทั่วไป','General customer');
  const customerPhone=document.querySelector('#customer-phone').value.trim()||'-';
  const customerAddress=document.querySelector('#customer-address').value.trim()||'-';
  document.querySelector('#quote-customer').textContent=customerName;
  document.querySelector('#quote-customer-phone').textContent=customerPhone;
  document.querySelector('#quote-customer-address').textContent=customerAddress;
  document.querySelector('#quote-items').innerHTML=rows.map((row,index)=>`<tr><td>${index+1}</td><td>${row.name}</td><td>${row.qty}</td><td>${row.rate===null?'-':quoteNumber(row.rate)}</td><td>${quoteNumber(row.total)}</td></tr>`).join('');
  document.querySelector('#quote-subtotal').textContent=quoteNumber(subtotal);
  document.querySelector('#quote-shipping').textContent=shippingText;
  document.querySelector('#quote-grand-total').textContent=quoteNumber(grandTotal);
  document.querySelector('#quote-amount-text').textContent=quotationAmountText(grandTotal);
  document.querySelector('#quote-note').textContent=note;
  return {quoteId,today,validDate,rows,subtotal,shippingFee,shippingText,grandTotal,note,customerName,customerPhone,customerAddress,language:currentLanguage};
}

const loadQuoteImage=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src});

function drawQuoteImage(context,image,x,y,width,height){
  const scale=Math.max(width/image.width,height/image.height);
  const sourceWidth=width/scale;
  const sourceHeight=height/scale;
  context.save();
  context.beginPath();context.rect(x,y,width,height);context.clip();
  context.drawImage(image,(image.width-sourceWidth)/2,(image.height-sourceHeight)/2,sourceWidth,sourceHeight,x,y,width,height);
  context.restore();
}

function drawQuotePdfCanvas(data,logoImage,qrImage){
  const canvas=document.createElement('canvas');
  canvas.width=1240;canvas.height=1754;
  const ctx=canvas.getContext('2d');
  const q=(thai,english)=>data.language==='en'?english:thai;
  const blue='#526f94',pink='#d47a86',ink='#24364f',muted='#667085',line='#d9e0e8',pale='#eef3f8';
  ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle=blue;ctx.fillRect(0,0,38,1260);ctx.fillStyle=pink;ctx.fillRect(0,1260,38,494);
  [1510,1570,1630].forEach(y=>{ctx.beginPath();ctx.arc(19,y,8,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill()});
  const font=(size,weight=400)=>`${weight} ${size}px Tahoma, "Noto Sans Thai", sans-serif`;
  const text=(value,x,y,size=24,weight=400,color=ink,align='left')=>{
    const content=String(value);
    ctx.font=font(size,weight);ctx.fillStyle=color;ctx.textAlign='left';ctx.textBaseline='alphabetic';
    const measuredWidth=ctx.measureText(content).width;
    const safeX=align==='right'?x-measuredWidth:align==='center'?x-measuredWidth/2:x;
    ctx.fillText(content,safeX,y);
  };
  const rule=(x1,y1,x2,y2,color=line,width=2)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()};
  const wrap=(value,x,y,maxWidth,lineHeight,size=22,weight=400,color=muted,maxLines=3)=>{
    ctx.font=font(size,weight);ctx.fillStyle=color;ctx.textAlign='left';ctx.textBaseline='alphabetic';
    const units=data.language==='en'?String(value).split(/(\s+)/).filter(Boolean):Array.from(String(value));let lineText='',lines=[];
    units.forEach(unit=>{const trial=lineText+unit;if(ctx.measureText(trial).width>maxWidth&&lineText){lines.push(lineText.trim());lineText=unit.trimStart()}else lineText=trial});
    if(lineText)lines.push(lineText);
    lines.slice(0,maxLines).forEach((lineValue,index)=>ctx.fillText(index===maxLines-1&&lines.length>maxLines?lineValue.slice(0,-1)+'…':lineValue,x,y+index*lineHeight));
    return Math.min(lines.length,maxLines)*lineHeight;
  };

  ctx.save();ctx.beginPath();ctx.arc(145,115,62,0,Math.PI*2);ctx.clip();drawQuoteImage(ctx,logoImage,83,53,124,124);ctx.restore();
  text('XHX SHOP',230,78,19,700,muted);text(q('ใบเสนอราคา','QUOTATION'),230,142,data.language==='en'?43:54,700,blue);text(q('QUOTATION','PRICE ESTIMATE'),232,184,20,700,pink);
  const metaX=845;[[q('เลขที่ใบเสนอราคา','Quotation no.'),data.quoteId],[q('วันที่','Date'),quoteDate(data.today)],[q('ยืนราคาถึงวันที่','Valid until'),quoteDate(data.validDate)]].forEach(([label,value],index)=>{const y=75+index*47;text(label,metaX,y,18,400,muted);text(value,1160,y,19,700,ink,'right');rule(metaX,y+15,1160,y+15)});
  rule(85,225,1160,225,blue,6);

  text(q('ข้อมูลผู้เสนอราคา','Seller information'),85,282,22,700,blue);rule(85,300,565,300,blue,2);text('XHX SHOP',85,345,23,700,ink);wrap(q('115/12 หมู่ 1 ตำบลแคราย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74110','115/12 Moo 1, Khae Rai, Krathum Baen, Samut Sakhon 74110, Thailand'),85,382,460,29,19,400,muted,3);text(q('โทรศัพท์ / LINE: 096-887-5517','Phone / LINE: 096-887-5517'),85,466,19,400,muted);text(q('อีเมล: incxprint@gmail.com','Email: incxprint@gmail.com'),85,495,19,400,muted);
  text(q('ข้อมูลลูกค้า','Customer information'),665,282,22,700,blue);rule(665,300,1160,300,blue,2);
  [[q('ชื่อลูกค้า','Customer'),data.customerName],[q('เบอร์โทรศัพท์','Phone'),data.customerPhone],[q('ที่อยู่','Address'),data.customerAddress]].forEach(([label,value],index)=>{const y=345+index*54;text(label,665,y,18,400,muted);wrap(value,815,y,330,27,19,700,ink,index===2?2:1)});

  let tableY=555;ctx.fillStyle=blue;ctx.fillRect(85,tableY,1075,58);text(q('ลำดับ','No.'),112,592,18,700,'#fff');text(q('รายการสินค้า / บริการ','Product / service'),190,592,18,700,'#fff');text(q('จำนวน','Quantity'),785,592,18,700,'#fff','right');text(q('ราคา/หน่วย','Unit price'),985,592,18,700,'#fff','right');text(q('ราคารวม','Amount'),1145,592,18,700,'#fff','right');
  tableY+=58;data.rows.forEach((row,index)=>{const rowHeight=72;if(index%2){ctx.fillStyle='#f6f8fb';ctx.fillRect(85,tableY,1075,rowHeight)}text(index+1,130,tableY+43,19,400,ink,'center');wrap(row.name,190,tableY+35,470,26,18,400,ink,2);text(row.qty,785,tableY+43,18,400,ink,'right');text(row.rate===null?'-':quoteNumber(row.rate),985,tableY+43,18,400,ink,'right');text(quoteNumber(row.total),1145,tableY+43,18,400,ink,'right');rule(85,tableY+rowHeight,1160,tableY+rowHeight);tableY+=rowHeight});

  const totalsY=tableY+54;text(q('หมายเหตุ','Notes'),85,totalsY,21,700,blue);rule(85,totalsY+17,645,totalsY+17,blue,2);wrap(data.note,85,totalsY+53,540,28,18,400,muted,3);wrap(q('ใบเสนอราคานี้ไม่ใช่ใบกำกับภาษี และยอดข้างต้นยังไม่รวมภาษี (ถ้ามี)','This quotation is not a tax invoice. The above amount excludes tax, if applicable.'),85,totalsY+145,540,27,17,400,muted,2);
  const totalX=700;[[q('รวมเป็นเงิน','Subtotal'),quoteNumber(data.subtotal)],[q('ค่าจัดส่ง','Delivery'),data.shippingText]].forEach(([label,value],index)=>{const y=totalsY+8+index*52;text(label,totalX,y,18,400,muted);text(value,1145,y,19,700,ink,'right');rule(totalX,y+18,1145,y+18)});ctx.fillStyle=blue;ctx.fillRect(totalX,totalsY+112,445,68);text(q('ยอดรวมทั้งสิ้น','Grand total'),totalX+18,totalsY+155,21,700,'#fff');text(quoteNumber(data.grandTotal),1125,totalsY+155,23,700,'#fff','right');
  ctx.fillStyle=pale;ctx.fillRect(85,totalsY+220,1060,62);ctx.fillStyle=pink;ctx.fillRect(85,totalsY+220,7,62);text(q('จำนวนเงินรวม:','Amount in words:'),115,totalsY+259,18,400,muted);text(data.language==='en'?englishBahtText(data.grandTotal):thaiBahtText(data.grandTotal),data.language==='en'?285:265,totalsY+259,19,700,ink);

  const footerY=1460;rule(85,footerY,1160,footerY,blue,2);drawQuoteImage(ctx,qrImage,85,1490,130,130);text(q('กดลิงก์หรือสแกน QR เพื่อเพิ่ม LINE','Tap the link or scan QR to add LINE'),245,1525,20,700,blue);text(q('โทรศัพท์ / LINE: 096-887-5517','Phone / LINE: 096-887-5517'),245,1565,18,400,muted);text(q('Facebook: ขายผ้าพับ ผ้าหลา ผ้าม้วน ราคาส่ง','Facebook: XHX SHOP wholesale fabrics'),245,1597,18,400,muted);rule(830,1500,1150,1500,muted,1);text(q('ผู้เสนอราคา','Prepared by'),990,1550,17,400,muted,'center');text('XHX SHOP',990,1586,19,700,ink,'center');text(`${q('วันที่','Date')} ${quoteDate(data.today)}`,990,1620,16,400,muted,'center');
  return canvas;
}

async function downloadQuotationPdf(data,mobileWindow){
  if(!window.PDFLib) throw new Error('PDF library unavailable');
  const [logoImage,qrImage]=await Promise.all([loadQuoteImage('assets/logo.jpg'),loadQuoteImage('assets/line-qr.jpg')]);
  const canvas=drawQuotePdfCanvas(data,logoImage,qrImage);
  const pdf=await PDFLib.PDFDocument.create();
  const jpg=await pdf.embedJpg(canvas.toDataURL('image/jpeg',0.94));
  const page=pdf.addPage([595.28,841.89]);
  page.drawImage(jpg,{x:0,y:0,width:595.28,height:841.89});
  const bytes=await pdf.save();
  const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
  if(mobileWindow){mobileWindow.location.replace(url)}else{
    const link=document.createElement('a');link.href=url;link.download=`${data.language==='en'?'Quotation':'ใบเสนอราคา'}-${data.quoteId}.pdf`;document.body.appendChild(link);link.click();link.remove();
  }
  setTimeout(()=>URL.revokeObjectURL(url),60000);
}

document.querySelector('#download-quote').addEventListener('click',async event=>{
  const button=event.currentTarget;
  const isMobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||window.innerWidth<700;
  const mobileWindow=isMobile?window.open('','_blank'):null;
  if(mobileWindow)mobileWindow.document.write(`<p style="font:18px sans-serif;padding:24px">${t('กำลังสร้างใบเสนอราคา PDF...','Generating quotation PDF...')}</p>`);
  const data=buildQuotation();
  document.title=`${t('ใบเสนอราคา','Quotation')} ${data.quoteId} - ${data.customerName}`;
  button.disabled=true;button.textContent=t('กำลังสร้าง PDF...','Generating PDF...');
  try{await downloadQuotationPdf(data,mobileWindow)}catch(error){
    if(mobileWindow)mobileWindow.close();
    console.error(error);window.print();
  }finally{button.disabled=false;button.textContent=t('ดาวน์โหลดใบเสนอราคา PDF','Download quotation PDF')}
});
document.querySelector('.menu-button').addEventListener('click',e=>{const links=document.querySelector('.nav-links');links.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',links.classList.contains('open'))});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav-links').classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();
const imageDialog=document.querySelector('#image-dialog');
const colorGrid=document.querySelector('.color-grid');
const actualColorCodes=[
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,
  30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46,47,48,49,50,51,52,54,55,56,57,
  58,59,60,61,62,63,64,65,66,67,69,70,71,72,73,74,75,76,77,79,81,82,83,84,85,86,
  87,88,89,91,96,97,99,100,101,102,103,45,78,53
];
colorGrid.innerHTML='';
actualColorCodes
  .map((actual,index)=>({actual,file:index+1}))
  .sort((a,b)=>a.actual-b.actual)
  .forEach(({actual,file})=>{
  const fileCode=String(file).padStart(2,'0');
  const card=document.createElement('button');
  card.className='color-card';
  card.dataset.image=`assets/solid-color-${fileCode}.jpg`;
  card.innerHTML=`<img src="assets/solid-color-${fileCode}.jpg" alt="ผ้าสีพื้น รหัส ${actual}" loading="lazy"><b>รหัส ${actual}</b>`;
  colorGrid.appendChild(card);
});
function addPatternCards(gridId,prefix,count,label){
  const grid=document.querySelector(gridId);
  for(let number=1;number<=count;number++){
    const code=String(number).padStart(2,'0');
    const card=document.createElement('button');
    card.className='color-card pattern-photo';
    card.dataset.image=`assets/${prefix}-${code}.jpg`;
    card.innerHTML=`<img src="assets/${prefix}-${code}.jpg" alt="${label} ชุดที่ ${number}" loading="lazy"><b>${label} · ชุดที่ ${code}</b><small>ดูรหัสในภาพ</small>`;
    grid.appendChild(card);
  }
}
addPatternCards('#stripe-grid','stripe-set',8,'ลายริ้ว');
addPatternCards('#check-grid','check-set',5,'ลายสก็อต');
const printPairs=[
  ['ไหมอิตาลี 120g',922,923],['ผ้าร่อง',924,925],['ไมโครเรียบ 145G',926,927],
  ['ผ้าซาร่า',928,929],['ผ้าเปเป้/บอนนี่',930,931],['ผ้า ITY',933,934],
  ['ผ้าชีฟองทราย',935,937],['ซาตินไดมอน',938,939],['ผ้าโซล่อน',940,941],
  ['ผ้าโฟร์เวย์',942,944],['ผ้าไฮเกรด',945,946],['ผ้าสลาฟ',947,948],
  ['ผ้าวูลเวฟ',949,'wool-wave-printed']
];
const beforeAfterGrid=document.querySelector('#before-after-grid');
printPairs.forEach(([name,before,after])=>{
  const card=document.createElement('article');
  card.className='before-after-card';
  card.innerHTML=`<div><button class="sample-image" data-image="assets/sublimation-${before}.jpg"><img src="assets/sublimation-${before}.jpg" alt="${name} ก่อนพิมพ์" loading="lazy"><span>ก่อนพิมพ์</span></button><button class="sample-image" data-image="assets/sublimation-${after}.jpg"><img src="assets/sublimation-${after}.jpg" alt="${name} หลังพิมพ์" loading="lazy"><span>หลังพิมพ์</span></button></div><h4>${name}</h4>`;
  beforeAfterGrid.appendChild(card);
});
document.querySelectorAll('.color-card').forEach(card=>card.addEventListener('click',()=>{
  imageDialog.querySelector('img').src=card.dataset.image;
  imageDialog.showModal();
}));
document.querySelectorAll('.sample-image').forEach(card=>card.addEventListener('click',()=>{
  imageDialog.querySelector('img').src=card.dataset.image;
  imageDialog.showModal();
}));
imageDialog.querySelector('button').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)imageDialog.close()});
document.querySelector('#language-toggle').addEventListener('click',()=>{
  currentLanguage=currentLanguage==='th'?'en':'th';
  localStorage.setItem('xhx-language',currentLanguage);
  applyLanguage();
});
applyLanguage();

const scrollProgress=document.createElement('div');
scrollProgress.id='scroll-progress';
scrollProgress.setAttribute('aria-hidden','true');
document.body.appendChild(scrollProgress);
const updateScrollProgress=()=>{
  const available=document.documentElement.scrollHeight-window.innerHeight;
  scrollProgress.style.width=`${available>0?Math.min(100,(window.scrollY/available)*100):0}%`;
};
window.addEventListener('scroll',updateScrollProgress,{passive:true});
updateScrollProgress();

const revealTargets=document.querySelectorAll('.section-heading,.split>*,.quick-card,.service-steps article,.mini-table,.pattern-info article,.before-after-card,.dtf-media>*,.calculator-grid>*');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
  }),{threshold:.08,rootMargin:'0px 0px -45px'});
  revealTargets.forEach((element,index)=>{element.classList.add('reveal-ready');element.style.transitionDelay=`${Math.min(index%3,2)*70}ms`;revealObserver.observe(element)});
}

const navAnchors=[...document.querySelectorAll('.nav-links a[href^="#"]')];
const observedSections=navAnchors.map(anchor=>document.querySelector(anchor.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){
  const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){navAnchors.forEach(anchor=>anchor.classList.toggle('active',anchor.getAttribute('href')===`#${entry.target.id}`))}
  }),{rootMargin:'-30% 0px -60% 0px',threshold:0});
  observedSections.forEach(section=>navObserver.observe(section));
}

const heroVisual=document.querySelector('.hero-visual');
if(heroVisual&&window.matchMedia('(pointer:fine)').matches){
  heroVisual.addEventListener('pointermove',event=>{
    const bounds=heroVisual.getBoundingClientRect();
    const x=((event.clientX-bounds.left)/bounds.width-.5)*8;
    const y=((event.clientY-bounds.top)/bounds.height-.5)*8;
    heroVisual.style.transform=`translate(${x}px,${y}px)`;
  });
  heroVisual.addEventListener('pointerleave',()=>{heroVisual.style.transform='translate(0,0)'});
}
