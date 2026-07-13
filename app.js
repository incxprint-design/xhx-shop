const quantity = document.querySelector('#quantity');
const product = document.querySelector('#product');
const pattern = document.querySelector('#pattern');
const shipping = document.querySelector('#shipping');
const supplyMode = document.querySelector('#supply-mode');
const polyFabric = document.querySelector('#poly-fabric');
const blockLength = document.querySelector('#block-length');
const radios = document.querySelectorAll('input[name="orderType"]');
const money = value => new Intl.NumberFormat('th-TH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)+' บาท';

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
  const mixedOption=[...pattern.options].find(option=>option.value==='คละสี/ลาย');
  mixedOption.disabled=isRoll;
  if(isRoll && pattern.value==='คละสี/ลาย') pattern.value='สีพื้น';
  const qty = Math.max(1, Number(quantity.value) || 1);
  let rate = isRoll ? 50 : qty >= 100 ? 55 : qty >= 50 ? 60 : qty >= 10 ? 75 : 80;
  const fabric = qty * rate;
  const shippingFee = shipping.value === 'pickup' ? 0 : calculateCottonShipping(qty);
  document.querySelector('#unit-price').textContent = money(rate);
  document.querySelector('#quantity-label').textContent = 'จำนวน (หลา)';
  document.querySelector('#unit-price-label').textContent = 'ราคาต่อหลา';
  document.querySelector('#fabric-total').textContent = money(fabric);
  document.querySelector('#print-total').textContent = '—';
  document.querySelector('#block-line').classList.add('hidden');
  document.querySelector('#shipping-total').textContent = money(shippingFee);
  document.querySelector('#grand-total').textContent = money(fabric + shippingFee);
  document.querySelector('.summary-product span').textContent = 'Cotton Oxford';
  document.querySelector('#summary-detail').textContent = `${qty.toLocaleString('th-TH')} หลา · ${pattern.value}${isRoll?' · ยกม้วน':''}`;
  document.querySelector('#form-note').textContent = 'ค่าจัดส่งคำนวณตามจำนวนหลา: เริ่มต้น 40 บาท และเมื่อเกิน 80 หลา เพิ่มทุก 10 หลาอีก 10 บาท';
  document.querySelector('#summary-note').textContent = 'ยอดประมาณการรวมค่าจัดส่งมาตรฐานแล้ว และยังไม่รวมภาษี (ถ้ามี)';
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

  document.querySelector('#quantity-label').textContent='จำนวน (หลา)';
  document.querySelector('#unit-price-label').textContent='ค่าพิมพ์ต่อหลา';
  document.querySelector('#unit-price').textContent=money(printRate);
  document.querySelector('#fabric-total').textContent=usesStoreFabric?money(fabric):'ลูกค้านำผ้ามาเอง';
  document.querySelector('#print-total').textContent=money(printing);
  document.querySelector('#block-line').classList.toggle('hidden',!isBlock);
  document.querySelector('#block-label').textContent=`ค่างานบล็อก +${Math.round(blockPercent*100)}%`;
  document.querySelector('#block-total').textContent=money(blockCharge);
  document.querySelector('#shipping-total').textContent='ติดต่อเจ้าหน้าที่';
  document.querySelector('#grand-total').textContent=money(total);
  document.querySelector('.summary-product span').textContent='พิมพ์ผ้าโพลี Sublimation';
  const modeText=supplyMode.value==='customer'?'ลูกค้านำผ้ามาเอง':supplyMode.value==='block'?`${fabricName} · ความยาวบล็อก ${length} ซม.`:fabricName;
  document.querySelector('#summary-detail').textContent=`${qty.toLocaleString('th-TH')} หลา · ${modeText}`;
  document.querySelector('#form-note').textContent='ค่าพิมพ์คิดต่อไฟล์และต่อหลา งานบล็อกวัดจากความยาวผ้า และคิดเปอร์เซ็นต์เพิ่มจากผลรวมค่าผ้ากับค่าพิมพ์';
  document.querySelector('#summary-note').textContent='ยอดพิมพ์ผ้ายังไม่รวมค่าจัดส่งและภาษี (ถ้ามี) กรุณาให้เจ้าหน้าที่ยืนยันไฟล์ก่อนผลิต';
}

function calculateDtf(){
  const qty=Math.max(1,Number(quantity.value)||1);
  const rate=qty>=100?60:qty>=50?70:qty>=20?80:qty>=10?100:140;
  const printing=qty*rate;
  document.querySelector('#quantity-label').textContent='จำนวน (เมตร)';
  document.querySelector('#unit-price-label').textContent='ราคาพิมพ์ต่อเมตร';
  document.querySelector('#unit-price').textContent=money(rate);
  document.querySelector('#fabric-total').textContent='—';
  document.querySelector('#print-total').textContent=money(printing);
  document.querySelector('#block-line').classList.add('hidden');
  document.querySelector('#shipping-total').textContent='ติดต่อเจ้าหน้าที่';
  document.querySelector('#grand-total').textContent=money(printing);
  document.querySelector('.summary-product span').textContent='ปริ้นฟิล์ม DTF';
  document.querySelector('#summary-detail').textContent=`${qty.toLocaleString('th-TH')} เมตร · ขนาด 58 × 100 ซม.`;
  document.querySelector('#form-note').textContent='ฟิล์ม DTF คิดราคาเป็นเมตร ขนาดงาน 58 × 100 ซม. ค่าจัดส่งกรุณาติดต่อเจ้าหน้าที่';
  document.querySelector('#summary-note').textContent='ยอดปริ้นฟิล์ม DTF ยังไม่รวมค่าจัดส่งและภาษี (ถ้ามี) กรุณาให้เจ้าหน้าที่ยืนยันไฟล์ก่อนผลิต';
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
const quoteNumber = value => new Intl.NumberFormat('th-TH',{minimumFractionDigits:2,maximumFractionDigits:2}).format(value)+' บาท';
const quoteDate = date => new Intl.DateTimeFormat('th-TH',{day:'numeric',month:'long',year:'numeric'}).format(date);

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

function buildQuotation(){
  const qty=Math.max(1,Number(quantity.value)||1);
  const isCotton=product.value==='cotton';
  const isPoly=product.value==='sublimation';
  const rows=[];
  let subtotal=0;
  let shippingFee=0;
  let shippingText='ติดต่อเจ้าหน้าที่';
  let note='ราคานี้เป็นราคาเบื้องต้น กรุณารอเจ้าหน้าที่ยืนยันรายละเอียดและไฟล์งานก่อนเริ่มผลิต';

  if(isCotton){
    const isRoll=document.querySelector('input[name="orderType"]:checked').value==='roll';
    const rate=isRoll?50:qty>=100?55:qty>=50?60:qty>=10?75:80;
    const total=qty*rate;
    rows.push({name:`Cotton Oxford หน้ากว้าง 45 นิ้ว - ${pattern.value}${isRoll?' (ยกม้วน)':''}`,qty:`${qty.toLocaleString('th-TH')} หลา`,rate,total});
    subtotal=total;
    shippingFee=shipping.value==='pickup'?0:calculateCottonShipping(qty);
    shippingText=shipping.value==='pickup'?'รับสินค้าเอง - ฟรี':quoteNumber(shippingFee);
    note='ผ้า Cotton Oxford สามารถคละสีและลายได้สำหรับออเดอร์ปลีก ยกเว้นการสั่งยกม้วน กรุณารอทางร้านยืนยันสต๊อก';
  }else if(isPoly){
    const printRate=qty>=150?23:qty>=100?40:qty>=20?50:qty>=10?60:100;
    const printing=qty*printRate;
    const usesStoreFabric=supplyMode.value!=='customer';
    if(usesStoreFabric){
      const fabricRate=Number(polyFabric.value);
      const fabricName=polyFabric.options[polyFabric.selectedIndex].text.split(' — ')[0];
      const fabricTotal=qty*fabricRate;
      rows.push({name:`${fabricName} หน้ากว้าง 58-60 นิ้ว`,qty:`${qty.toLocaleString('th-TH')} หลา`,rate:fabricRate,total:fabricTotal});
      subtotal+=fabricTotal;
    }
    rows.push({name:`ค่าพิมพ์ผ้าโพลี Sublimation${supplyMode.value==='customer'?' (ลูกค้านำผ้ามาเอง)':''}`,qty:`${qty.toLocaleString('th-TH')} หลา`,rate:printRate,total:printing});
    subtotal+=printing;
    if(supplyMode.value==='block'){
      const length=Math.max(1,Number(blockLength.value)||1);
      const percent=getBlockPercent(length);
      const charge=subtotal*percent;
      rows.push({name:`ค่างานบล็อก ความยาว ${length.toLocaleString('th-TH')} ซม. (+${Math.round(percent*100)}%)`,qty:'1 งาน',rate:null,total:charge});
      subtotal+=charge;
    }
    note='ราคาพิมพ์คิดต่อไฟล์และต่อหลา งานบล็อกวัดจากความยาวผ้า ค่าจัดส่งกรุณาติดต่อเจ้าหน้าที่';
  }else{
    const rate=qty>=100?60:qty>=50?70:qty>=20?80:qty>=10?100:140;
    const total=qty*rate;
    rows.push({name:'ปริ้นฟิล์ม DTF ขนาด 58 x 100 ซม.',qty:`${qty.toLocaleString('th-TH')} เมตร`,rate,total});
    subtotal=total;
    note='ค่าจัดส่งงานปริ้นฟิล์ม DTF กรุณาติดต่อเจ้าหน้าที่ และโปรดตรวจสอบไฟล์งานก่อนเริ่มผลิต';
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
  document.querySelector('#quote-customer').textContent=document.querySelector('#customer').value.trim()||'ลูกค้าทั่วไป';
  document.querySelector('#quote-customer-phone').textContent=document.querySelector('#customer-phone').value.trim()||'-';
  document.querySelector('#quote-customer-address').textContent=document.querySelector('#customer-address').value.trim()||'-';
  document.querySelector('#quote-items').innerHTML=rows.map((row,index)=>`<tr><td>${index+1}</td><td>${row.name}</td><td>${row.qty}</td><td>${row.rate===null?'-':quoteNumber(row.rate)}</td><td>${quoteNumber(row.total)}</td></tr>`).join('');
  document.querySelector('#quote-subtotal').textContent=quoteNumber(subtotal);
  document.querySelector('#quote-shipping').textContent=shippingText;
  document.querySelector('#quote-grand-total').textContent=quoteNumber(grandTotal);
  document.querySelector('#quote-amount-text').textContent=thaiBahtText(grandTotal);
  document.querySelector('#quote-note').textContent=note;
  return quoteId;
}

document.querySelector('#download-quote').addEventListener('click',()=>{
  const customer=document.querySelector('#customer').value.trim();
  const quoteId=buildQuotation();
  document.title=customer?`ใบเสนอราคา ${quoteId} - ${customer}`:`ใบเสนอราคา ${quoteId} - XHX SHOP`;
  window.print();
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
  ['ผ้าโฟร์เวย์',942,944],['ผ้าไฮเกรด',945,946],['ผ้าสลาฟ',947,948]
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
calculate();
