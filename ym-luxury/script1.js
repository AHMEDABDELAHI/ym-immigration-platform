
/* ═══ PARTICLES ═══ */
(function(){
  const wrap = document.getElementById('heroParticles');
  for(let i=0;i<18;i++){
    const p=document.createElement('div');
    p.className='particle';
    const size=Math.random()*3+1;
    p.style.cssText=`
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      bottom:${Math.random()*30}%;
      animation-duration:${8+Math.random()*16}s;
      animation-delay:${Math.random()*10}s;
      opacity:0;
    `;
    wrap.appendChild(p);
  }
})();

/* ═══ NAV SCROLL ═══ */
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
}, {passive:true});

/* ═══ MOBILE MENU ═══ */
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}

/* ═══ LANGUAGE SYSTEM (EN / AR / TR) ═══ */
const LANGS = ['en','ar','tr'];
const LANG_META = {
  en: {label:'🇸🇦 عربي', dir:'ltr', next:'ar'},
  ar: {label:'🇹🇷 Türkçe', dir:'rtl', next:'tr'},
  tr: {label:'🇺🇸 English', dir:'ltr', next:'en'}
};
let lang = localStorage.getItem('ymLang') || 'en';

function cycleLang(){
  lang = LANG_META[lang].next;
  localStorage.setItem('ymLang', lang);
  applyLang();
}

function applyLang(){
  const m = LANG_META[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = m.dir;
  const btn = document.getElementById('langBtn');
  if(btn) btn.innerHTML = m.label;

  document.querySelectorAll('[data-en]').forEach(el=>{
    const val = el.getAttribute('data-'+lang) || el.getAttribute('data-en');
    if(val !== null) el.innerHTML = val;
  });
  document.querySelectorAll('[data-ph-en]').forEach(el=>{
    const val = el.getAttribute('data-ph-'+lang) || el.getAttribute('data-ph-en');
    if(val !== null) el.placeholder = val;
  });
  document.querySelectorAll('select option[data-en]').forEach(opt=>{
    const val = opt.getAttribute('data-'+lang) || opt.getAttribute('data-en');
    if(val !== null) opt.textContent = val;
  });
  document.querySelectorAll('.dest-card span[data-en]').forEach(el=>{
    const val = el.getAttribute('data-'+lang) || el.getAttribute('data-en');
    if(val !== null) el.textContent = val;
  });
  renderCountries();
  // re-init counters on language change
  if(window._countersStarted) animateCounters();
}

/* ═══ COUNTRIES DATA ═══ */
const countries={
  usa:{flag:'🇺🇸',en:'USA',ar:'أمريكا',tr:'ABD',tagEn:'Your dream needs a strong file.',tagAr:'حلمك يحتاج ملف قوي.',tagTr:'Hayaliniz güçlü bir dosya gerektiriyor.',summaryEn:'America can be a family visit, a first trip, or a life-changing opportunity.',summaryAr:'أمريكا قد تكون زيارة عائلية أو أول رحلة أو فرصة تغير حياتك.',summaryTr:'Amerika aile ziyareti, ilk seyahat veya önemli bir fırsat olabilir.',focusEn:'YM focuses on purpose, DS-160 consistency, ties, and interview confidence.',focusAr:'YM تركز على الغرض، تناسق DS-160، الروابط، وثقة المقابلة.',focusTr:'YM amaç, DS-160 tutarlılığı, bağlar ve mülakat güvenine odaklanır.'},
  schengen:{flag:'🇪🇺',en:'Schengen',ar:'شنغن',tr:'Schengen',tagEn:'One visa. Many European stories.',tagAr:'تأشيرة واحدة. قصص أوروبية كثيرة.',tagTr:'Tek vize. Pek çok Avrupa hikayesi.',summaryEn:'Europe attracts travelers for culture, shopping, tourism, and unforgettable cities.',summaryAr:'أوروبا تجذب المسافرين للثقافة والتسوق والسياحة وتجارب المدن المميزة.',summaryTr:'Avrupa kültür, alışveriş, turizm ve şehir deneyimleri için tercih edilir.',focusEn:'YM focuses on itinerary, bookings, insurance, financial proof, and correct embassy choice.',focusAr:'YM تركز على البرنامج والحجوزات والتأمين والإثبات المالي واختيار السفارة.',focusTr:'YM güzergah, rezervasyonlar, sigorta, finansal kanıt ve doğru elçilik seçimine odaklanır.'},
  turkey:{flag:'🇹🇷',en:'Turkey',ar:'تركيا',tr:'Türkiye',tagEn:'Close, beautiful, and perfect for a premium trip.',tagAr:'قريبة وجميلة ومثالية لرحلة فخمة.',tagTr:'Yakın, güzel ve premium bir gezi için mükemmel.',summaryEn:'Turkey is perfect for first-time travelers, shopping, food, history, and affordable luxury.',summaryAr:'تركيا مناسبة للمسافر لأول مرة، التسوق، الطعام، التاريخ، والفخامة بسعر مناسب.',summaryTr:'Türkiye ilk kez seyahat edenler, alışveriş, yemek, tarih ve uygun lüks için idealdir.',focusEn:'YM helps with visa choice, flight, hotel, and a clean travel plan.',focusAr:'YM تساعد في اختيار التأشيرة والطيران والفندق وخطة السفر.',focusTr:'YM vize seçimi, uçuş, otel ve net seyahat planı konusunda yardımcı olur.'},
  russia:{flag:'🇷🇺',en:'Russia',ar:'روسيا',tr:'Rusya',tagEn:'A bold destination for tourism and business opportunities.',tagAr:'وجهة قوية للسياحة وفرص الأعمال.',tagTr:'Turizm ve iş fırsatları için güçlü bir destinasyon.',summaryEn:'Russia offers unique travel experiences, culture, and growing tourism interest.',summaryAr:'روسيا تقدم تجربة سفر مختلفة وثقافة قوية واهتمام سياحي متزايد.',summaryTr:'Rusya benzersiz seyahat deneyimleri, kültür ve artan turizm ilgisi sunar.',focusEn:'YM organizes purpose, invitation/voucher, travel dates, and documents.',focusAr:'YM تنظم الغرض، الدعوة أو الفاوتشر، مواعيد السفر، والمستندات.',focusTr:'YM amaç, davet veya voucher, seyahat tarihleri ve belgeleri düzenler.'},
  saudi:{flag:'🇸🇦',en:'Saudi Arabia',ar:'السعودية',tr:'Suudi Arabistan',tagEn:'Fast-growing destination for visits, events, and business.',tagAr:'وجهة متنامية للزيارات والفعاليات والأعمال.',tagTr:'Ziyaretler, etkinlikler ve iş için hızla büyüyen bir destinasyon.',summaryEn:'Saudi Arabia is opening strongly for tourism, business, events, and family visits.',summaryAr:'السعودية تنفتح بقوة للسياحة والأعمال والفعاليات والزيارات العائلية.',summaryTr:'Suudi Arabistan turizm, iş, etkinlikler ve aile ziyaretlerine güçlü şekilde açılıyor.',focusEn:'YM helps with visa type, travel purpose, accommodation, and dates.',focusAr:'YM تساعد في نوع التأشيرة، غرض السفر، الإقامة، والمواعيد.',focusTr:'YM vize türü, seyahat amacı, konaklama ve tarihlerde yardımcı olur.'},
  china:{flag:'🇨🇳',en:'China',ar:'الصين',tr:'Çin',tagEn:'Business, trade, factories, and a new travel experience.',tagAr:'أعمال وتجارة ومصانع وتجربة سفر مختلفة.',tagTr:'İş, ticaret, fabrikalar ve farklı bir seyahat deneyimi.',summaryEn:'China is ideal for business travelers, exhibitions, trade, and tourism.',summaryAr:'الصين مناسبة لرجال الأعمال والمعارض والتجارة والسياحة.',summaryTr:'Çin iş seyahatleri, fuarlar, ticaret ve turizm için idealdir.',focusEn:'YM prepares the purpose, invitation, booking plan, and required file.',focusAr:'YM تجهز الغرض، الدعوة، خطة الحجز، والملف المطلوب.',focusTr:'YM amaç, davet, rezervasyon planı ve gerekli dosyayı hazırlar.'},
  uae:{flag:'🇦🇪',en:'UAE',ar:'الإمارات',tr:'BAE',tagEn:'Luxury, business, tourism, and family visits.',tagAr:'فخامة وأعمال وسياحة وزيارات عائلية.',tagTr:'Lüks, iş, turizm ve aile ziyaretleri.',summaryEn:'The UAE is a popular option for short trips, work interests, and luxury travel.',summaryAr:'الإمارات خيار محبوب للرحلات القصيرة وفرص العمل والسفر الفاخر.',summaryTr:'BAE kısa geziler, iş fırsatları ve lüks seyahat için popülerdir.',focusEn:'YM helps with visa selection, travel details, hotel, and flight.',focusAr:'YM تساعد في اختيار التأشيرة وتفاصيل السفر والفندق والطيران.',focusTr:'YM vize seçimi, seyahat detayları, otel ve uçuşta yardımcı olur.'}
};

function renderCountries(){
  const list=document.getElementById('countryList');
  list.innerHTML='';
  const lCap=lang.charAt(0).toUpperCase()+lang.slice(1);
  Object.keys(countries).forEach((id,i)=>{
    const c=countries[id];
    const b=document.createElement('button');
    b.className='country-btn'+(i===0?' active':'');
    const name=c[lang]||c.en;
    const tag=c['tag'+lCap]||c.tagEn;
    b.innerHTML=`<strong>${c.flag} ${name}</strong><span>${tag}</span>`;
    b.onmouseenter=()=>showCountry(id);
    b.onclick=()=>showCountry(id);
    list.appendChild(b);
  });
  showCountry('usa');
}

const WA_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

function showCountry(id){
  document.querySelectorAll('.country-btn').forEach((b,i)=>b.classList.toggle('active',Object.keys(countries)[i]===id));
  const c=countries[id];
  const lCap=lang.charAt(0).toUpperCase()+lang.slice(1);
  const name=c[lang]||c.en;
  const tag=c['tag'+lCap]||c.tagEn;
  const summary=c['summary'+lCap]||c.summaryEn;
  const focus=c['focus'+lCap]||c.focusEn;
  const waGreet={en:'Hello YM, I want to travel to ',ar:'مرحبًا YM، أريد السفر إلى ',tr:'Merhaba YM, seyahat etmek istiyorum: ',ru:'Здравствуйте YM, хочу путешествовать в ',fr:'Bonjour YM, je veux voyager à '};
  const waText=encodeURIComponent((waGreet[lang]||waGreet.en)+name);
  const premiumLabel={en:'Premium destination',ar:'وجهة مميزة',tr:'Premium destinasyon',ru:'Премиум направление',fr:'Destination premium'};
  const feelLabel={en:'Travel feeling',ar:'إحساس الرحلة',tr:'Seyahat hissi',ru:'Ощущение путешествия',fr:'Sentiment de voyage'};
  const hotelLabel={en:'Hotel & flight',ar:'فندق وطيران',tr:'Otel & uçuş',ru:'Отель и перелёт',fr:'Hôtel & vol'};
  const fileLabel={en:'Organized file',ar:'ملف منظم',tr:'Düzenli dosya',ru:'Организованное дело',fr:'Dossier organisé'};
  const waFollowLabel={en:'WhatsApp follow-up',ar:'متابعة واتساب',tr:'WhatsApp takibi',ru:'Сопровождение в WhatsApp',fr:'Suivi WhatsApp'};
  const focusLabel={en:'What does YM focus on?',ar:'ما الذي تركز عليه YM؟',tr:'YM neye odaklanıyor?',ru:'На чём фокусируется YM?',fr:'Sur quoi se concentre YM?'};
  const travelLabel={en:'I want to travel to '+name,ar:'أريد السفر إلى '+name,tr:'Seyahat etmek istiyorum: '+name,ru:'Хочу путешествовать в '+name,fr:'Je veux voyager à '+name};
  document.getElementById('countryDetail').innerHTML=`
    <div class="country-top">
      <div class="country-flag">${c.flag}</div>
      <div><h2>${name}</h2><div class="pill">${premiumLabel[lang]||premiumLabel.en}</div></div>
    </div>
    <div class="magnet">${tag}</div>
    <p>${summary}</p>
    <div class="simple-list">
      <div class="simple-item">✨ ${feelLabel[lang]||feelLabel.en}</div>
      <div class="simple-item">🏨 ${hotelLabel[lang]||hotelLabel.en}</div>
      <div class="simple-item">📄 ${fileLabel[lang]||fileLabel.en}</div>
      <div class="simple-item">💬 ${waFollowLabel[lang]||waFollowLabel.en}</div>
    </div>
    <h3>${focusLabel[lang]||focusLabel.en}</h3>
    <p style="margin-bottom:18px">${focus}</p>
    <a class="btn btn-wa" style="width:100%;justify-content:center;" href="https://wa.me/201221845179?text=${waText}" target="_blank">
      ${WA_SVG}
      ${travelLabel[lang]||travelLabel.en}
    </a>
  `;
}

/* ═══ POPUP ═══ */
function openPopup(){document.getElementById('popup').classList.add('show')}
function closePopup(){document.getElementById('popup').classList.remove('show')}
document.getElementById('popup').addEventListener('click',function(e){if(e.target===this)closePopup();});

/* ═══ WHATSAPP HELPER ═══ */
function wa(text){window.open('https://wa.me/201221845179?text='+encodeURIComponent(text),'_blank')}



/* ═══ DAY / NIGHT THEME ═══ */
function applyTheme(mode){
  const isLight = mode === 'light';
  document.body.classList.toggle('light-theme', isLight);
  const btn = document.getElementById('themeBtn');
  if(btn) btn.textContent = isLight ? '🌙' : '☀️';
  const meta = document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute('content', isLight ? '#fffaf0' : '#03070e');
}
function toggleTheme(){
  const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  localStorage.setItem('ymTheme', next);
  applyTheme(next);
}
applyTheme(localStorage.getItem('ymTheme') || 'dark');

function isFridayDate(dateValue){
  if(!dateValue) return false;
  const parts = dateValue.split('-').map(Number);
  if(parts.length !== 3) return false;
  const d = new Date(parts[0], parts[1]-1, parts[2]);
  return d.getDay() === 5;
}
function showBookingAlert(show){
  const alertBox = document.getElementById('bk_alert');
  if(alertBox) alertBox.style.display = show ? 'block' : 'none';
}

/* ═══ DESTINATION CARD SELECT ═══ */
function selectDest(btn){
  document.querySelectorAll('.dest-card').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const destVal = btn.getAttribute('data-dest-'+lang) || btn.getAttribute('data-dest-en') || '';
  const destInput = document.getElementById('dest');
  if(destInput) destInput.value = destVal;
}

/* ═══ SUBMIT BOOKING ═══ */
function submitBooking(){
  const n=document.getElementById('name').value.trim();
  const ph=document.getElementById('phone').value.trim();
  const s=document.getElementById('service');
  const sVal=s.options[s.selectedIndex]?s.options[s.selectedIndex].text:'';
  const d=document.getElementById('dest').value.trim();
  const m=document.getElementById('msg').value.trim();
  const dateEl=document.getElementById('travelDate');
  const timeEl=document.getElementById('prefTime');
  const dateVal=dateEl&&dateEl.value?'\nTravel Date: '+dateEl.value:'';
  const timeVal=timeEl&&timeEl.value?'\nPreferred Time: '+timeEl.value:'';
  const greet={en:'Hello YM, I want to request a service',ar:'مرحبًا YM، أريد طلب خدمة',tr:'Merhaba YM, hizmet talep etmek istiyorum',ru:'Здравствуйте YM, я хочу запросить услугу',fr:'Bonjour YM, je souhaite demander un service'};
  const msg=`${greet[lang]||greet.en}\nName: ${n||'-'}\nPhone: ${ph||'-'}\nService: ${sVal||'-'}\nDestination: ${d||'-'}${dateVal}${timeVal}\nDetails: ${m||'-'}`;
  window.open('https://wa.me/201221845179?text='+encodeURIComponent(msg),'_blank');
}

/* ═══ SUBMIT POPUP ═══ */
function submitPopup(){
  const n=document.getElementById('pName').value.trim();
  const ph=document.getElementById('pPhone').value.trim();
  const d=document.getElementById('pDest').value.trim();
  const greet={en:'Hello YM, I want a case review',ar:'مرحبًا YM، أريد مراجعة ملفي',tr:'Merhaba YM, dosya incelemesi istiyorum',ru:'Здравствуйте YM, хочу проверку дела',fr:'Bonjour YM, je veux une révision de dossier'};
  wa(`${greet[lang]||greet.en}\nName: ${n||'-'}\nPhone: ${ph||'-'}\nDestination: ${d||'-'}`);
  closePopup();
}

/* ═══ REVEAL OBSERVER ═══ */
const obs=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target);}
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));

/* ═══ INIT ═══ */
renderCountries();

/* Defensive visibility guard */
setTimeout(function(){
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('show'); });
}, 1800);


/* ═══ POPUP TIMER ═══ */
setTimeout(()=>{
  if(!sessionStorage.getItem('ymPopShown')){
    sessionStorage.setItem('ymPopShown','1');
    openPopup();
  }
},12000);

/* ═══ SMART WHATSAPP TOGGLE ═══ */
function toggleSmartWa(){
  document.getElementById('smartWaMenu').classList.toggle('open');
}
function closeSmartWa(){
  document.getElementById('smartWaMenu').classList.remove('open');
}
document.addEventListener('click', function(e){
  const wrap = document.getElementById('smartWaWrap');
  if(wrap && !wrap.contains(e.target)) closeSmartWa();
});

/* ═══ IN-OFFICE BOOKING MODAL ═══ */
function openBookingModal(){
  const modal = document.getElementById('bookingModal');
  if(!modal) return;
  modal.style.display = 'flex';
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('bk_date');
  if(dateInput){ dateInput.min = today; showBookingAlert(isFridayDate(dateInput.value)); dateInput.onchange = function(){ showBookingAlert(isFridayDate(this.value)); }; }
  // Apply current language to modal inputs
  document.querySelectorAll('#bookingModal [data-ph-en]').forEach(el=>{
    const val = el.getAttribute('data-ph-'+lang) || el.getAttribute('data-ph-en');
    if(val) el.placeholder = val;
  });
  document.querySelectorAll('#bookingModal [data-en]').forEach(el=>{
    const val = el.getAttribute('data-'+lang) || el.getAttribute('data-en');
    if(val !== null) el.innerHTML = val;
  });
  document.querySelectorAll('#bookingModal select option[data-en]').forEach(opt=>{
    const val = opt.getAttribute('data-'+lang) || opt.getAttribute('data-en');
    if(val !== null) opt.textContent = val;
  });
}
function closeBookingModal(){
  const modal = document.getElementById('bookingModal');
  if(modal) modal.style.display = 'none';
}
document.getElementById('bookingModal').addEventListener('click', function(e){
  if(e.target === this) closeBookingModal();
});
function submitBookingModal(){
  const name = document.getElementById('bk_name').value.trim();
  const phone = document.getElementById('bk_phone').value.trim();
  const svc = document.getElementById('bk_service');
  const svcVal = svc.options[svc.selectedIndex] ? svc.options[svc.selectedIndex].text : '-';
  const date = document.getElementById('bk_date').value || '-';
  if(isFridayDate(date)){ showBookingAlert(true); return; }
  const time = document.getElementById('bk_time').value || '-';
  const trav = document.getElementById('bk_travelers').value || '1';
  const dest = document.getElementById('bk_dest').value.trim() || '-';
  const notes = document.getElementById('bk_notes').value.trim() || '-';
  const greet = {en:'Hello YM, I want to book an in-office consultation',ar:'مرحبًا YM، أريد حجز استشارة داخل المكتب',tr:'Merhaba YM, ofis randevusu almak istiyorum'};
  const msg = `${greet[lang]||greet.en}
📋 Service: ${svcVal}
📅 Date: ${date}
⏰ Time: ${time}
👥 Travelers: ${trav}
🌍 Destination: ${dest}
👤 Name: ${name||'-'}
📱 Phone: ${phone||'-'}
📝 Notes: ${notes}`;
  window.open('https://wa.me/201221845179?text='+encodeURIComponent(msg), '_blank');
  closeBookingModal();
}

/* ═══ ANIMATED COUNTERS ═══ */
function animateCounters(){
  document.querySelectorAll('.ym-counter-num').forEach(el=>{
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();
    function update(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if(progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
  window._countersStarted = true;
}
// Trigger counters when section enters viewport
const counterSection = document.getElementById('ymCounters');
if(counterSection){
  const counterObs = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      animateCounters();
      counterObs.unobserve(counterSection);
    }
  }, {threshold: .2});
  counterObs.observe(counterSection);
}

/* ═══ INIT LANG FROM LOCALSTORAGE ═══ */
applyLang(); // Always apply lang on load

