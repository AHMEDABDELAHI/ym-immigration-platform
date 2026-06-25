
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
  en: {label:'🇺🇸 English', dir:'ltr'},
  ar: {label:'🇪🇬 العربية', dir:'rtl'},
  tr: {label:'🇹🇷 Türkçe', dir:'ltr'}
};
let lang = localStorage.getItem('ymLang') || 'en';

function toggleLangMenu(e){
  if(e) e.stopPropagation();
  const menu=document.getElementById('langMenu');
  const btn=document.getElementById('langBtn');
  if(menu) menu.classList.toggle('open');
  if(btn) btn.setAttribute('aria-expanded', menu && menu.classList.contains('open') ? 'true' : 'false');
}
function setLang(newLang){
  if(!LANG_META[newLang]) return;
  lang = newLang;
  localStorage.setItem('ymLang', lang);
  const menu=document.getElementById('langMenu');
  if(menu) menu.classList.remove('open');
  applyLang();
const officeDateInit=document.getElementById('officeDate'); if(officeDateInit){ officeDateInit.min=new Date().toISOString().split('T')[0]; }
}
function cycleLang(){
  const next = lang === 'en' ? 'ar' : (lang === 'ar' ? 'tr' : 'en');
  setLang(next);
}
document.addEventListener('click', function(e){
  const wrap=document.getElementById('languageDropdown');
  if(wrap && !wrap.contains(e.target)){
    const menu=document.getElementById('langMenu');
    if(menu) menu.classList.remove('open');
  }
});

function applyLang(){
  const m = LANG_META[lang] || LANG_META.en;
  document.documentElement.lang = lang;
  document.documentElement.dir = m.dir;
  const btn = document.getElementById('langBtn');
  if(btn) btn.innerHTML = '🌐 ' + m.label + ' ▾';

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
  if(window._countersStarted) animateCounters();
}

/* ═══ COUNTRIES DATA ═══ */
const countries={
  usa:{flag:'🇺🇸',flagImg:'https://flagcdn.com/w80/us.png',en:'USA',ar:'أمريكا',tr:'ABD',tagEn:'Your dream needs a strong file.',tagAr:'حلمك يحتاج ملف قوي.',tagTr:'Hayaliniz güçlü bir dosya gerektiriyor.',summaryEn:'America can be a family visit, a first trip, or a life-changing opportunity.',summaryAr:'أمريكا قد تكون زيارة عائلية أو أول رحلة أو فرصة تغير حياتك.',summaryTr:'Amerika aile ziyareti, ilk seyahat veya önemli bir fırsat olabilir.',focusEn:'YM focuses on purpose, DS-160 consistency, ties, and interview confidence.',focusAr:'YM تركز على الغرض، تناسق DS-160، الروابط، وثقة المقابلة.',focusTr:'YM amaç, DS-160 tutarlılığı, bağlar ve mülakat güvenine odaklanır.'},
  canada:{flag:'🇨🇦',flagImg:'https://flagcdn.com/w80/ca.png',en:'Canada',ar:'كندا',tr:'Kanada',tagEn:'Visitor, study, work and family opportunities.',tagAr:'زيارة ودراسة وعمل وفرص عائلية.',tagTr:'Ziyaret, eğitim, iş ve aile fırsatları.',summaryEn:'Canada requires a clear purpose, strong financial proof, and a consistent travel story.',summaryAr:'كندا تحتاج غرض واضح، إثبات مالي قوي، وقصة سفر متناسقة.',summaryTr:'Kanada net amaç, güçlü finansal kanıt ve tutarlı seyahat hikayesi gerektirir.',focusEn:'YM helps with purpose, supporting documents, invitation logic, and online forms.',focusAr:'YM تساعد في الغرض، المستندات الداعمة، الدعوة، والنماذج الإلكترونية.',focusTr:'YM amaç, destekleyici belgeler, davet ve online formlarda yardımcı olur.'},
  uk:{flag:'🇬🇧',flagImg:'https://flagcdn.com/w80/gb.png',en:'UK',ar:'بريطانيا',tr:'İngiltere',tagEn:'Clear documents and a convincing visitor story.',tagAr:'مستندات واضحة وقصة زيارة مقنعة.',tagTr:'Net belgeler ve ikna edici ziyaret hikayesi.',summaryEn:'The UK visitor file must explain why you travel, how you fund it, and why you return.',summaryAr:'ملف بريطانيا لازم يوضح سبب السفر، التمويل، وسبب العودة.',summaryTr:'İngiltere dosyası seyahat sebebi, finansman ve dönüş bağlarını açıklamalıdır.',focusEn:'YM focuses on cover letter, bank logic, employment proof, and itinerary.',focusAr:'YM تركز على خطاب التغطية، منطق الحساب البنكي، إثبات العمل، وخطة الرحلة.',focusTr:'YM cover letter, banka mantığı, iş kanıtı ve güzergaha odaklanır.'},
  schengen:{flag:'🇪🇺',flagImg:'https://flagcdn.com/w80/eu.png',en:'Schengen',ar:'شنغن',tr:'Schengen',tagEn:'One visa. Many European stories.',tagAr:'تأشيرة واحدة. قصص أوروبية كثيرة.',tagTr:'Tek vize. Pek çok Avrupa hikayesi.',summaryEn:'Europe attracts travelers for culture, shopping, tourism, and unforgettable cities.',summaryAr:'أوروبا تجذب المسافرين للثقافة والتسوق والسياحة وتجارب المدن المميزة.',summaryTr:'Avrupa kültür, alışveriş, turizm ve şehir deneyimleri için tercih edilir.',focusEn:'YM focuses on itinerary, bookings, insurance, financial proof, and correct embassy choice.',focusAr:'YM تركز على البرنامج والحجوزات والتأمين والإثبات المالي واختيار السفارة.',focusTr:'YM güzergah, rezervasyonlar, sigorta, finansal kanıt ve doğru elçilik seçimine odaklanır.'},
  australia:{flag:'🇦🇺',flagImg:'https://flagcdn.com/w80/au.png',en:'Australia',ar:'أستراليا',tr:'Avustralya',tagEn:'A premium destination that needs strong evidence.',tagAr:'وجهة مميزة تحتاج إثباتات قوية.',tagTr:'Güçlü kanıt isteyen premium destinasyon.',summaryEn:'Australia needs a carefully organized file, financial proof, purpose, and ties.',summaryAr:'أستراليا تحتاج ملف منظم، إثبات مالي، غرض واضح، وروابط قوية.',summaryTr:'Avustralya düzenli dosya, finansal kanıt, amaç ve bağlar ister.',focusEn:'YM prepares the case story, documents, travel logic, and application details.',focusAr:'YM تجهز قصة الملف، المستندات، منطق السفر، وتفاصيل التقديم.',focusTr:'YM dosya hikayesi, belgeler, seyahat mantığı ve başvuru detaylarını hazırlar.'},
  newzealand:{flag:'🇳🇿',flagImg:'https://flagcdn.com/w80/nz.png',en:'New Zealand',ar:'نيوزيلندا',tr:'Yeni Zelanda',tagEn:'Nature, study, visit and long-haul planning.',tagAr:'طبيعة ودراسة وزيارات وتخطيط سفر بعيد.',tagTr:'Doğa, eğitim, ziyaret ve uzun rota planı.',summaryEn:'New Zealand applications need strong travel purpose and clean supporting documents.',summaryAr:'نيوزيلندا تحتاج غرض سفر قوي ومستندات داعمة منظمة.',summaryTr:'Yeni Zelanda başvuruları güçlü amaç ve temiz belgeler ister.',focusEn:'YM helps with document order, accommodation, insurance, and travel timeline.',focusAr:'YM تساعد في ترتيب المستندات، الإقامة، التأمين، وخط السفر.',focusTr:'YM belge sırası, konaklama, sigorta ve zaman planında destek olur.'},
  turkey:{flag:'🇹🇷',flagImg:'https://flagcdn.com/w80/tr.png',en:'Turkey',ar:'تركيا',tr:'Türkiye',tagEn:'Close, beautiful, and perfect for a premium trip.',tagAr:'قريبة وجميلة ومثالية لرحلة فخمة.',tagTr:'Yakın, güzel ve premium bir gezi için mükemmel.',summaryEn:'Turkey is perfect for first-time travelers, shopping, food, history, and affordable luxury.',summaryAr:'تركيا مناسبة للمسافر لأول مرة، التسوق، الطعام، التاريخ، والفخامة بسعر مناسب.',summaryTr:'Türkiye ilk kez seyahat edenler, alışveriş, yemek, tarih ve uygun lüks için idealdir.',focusEn:'YM helps with visa choice, flight, hotel, and a clean travel plan.',focusAr:'YM تساعد في اختيار التأشيرة والطيران والفندق وخطة السفر.',focusTr:'YM vize seçimi, uçuş, otel ve net seyahat planı konusunda yardımcı olur.'},
  japan:{flag:'🇯🇵',flagImg:'https://flagcdn.com/w80/jp.png',en:'Japan',ar:'اليابان',tr:'Japonya',tagEn:'A precise file for a precise destination.',tagAr:'ملف دقيق لوجهة دقيقة.',tagTr:'Hassas destinasyon için hassas dosya.',summaryEn:'Japan needs accurate bookings, clear itinerary, bank proof, and purpose.',summaryAr:'اليابان تحتاج حجوزات دقيقة، برنامج واضح، إثبات مالي، وغرض سفر.',summaryTr:'Japonya doğru rezervasyonlar, net rota, banka kanıtı ve amaç ister.',focusEn:'YM prepares itinerary, hotel logic, cover letter, and embassy file order.',focusAr:'YM تجهز البرنامج، منطق الفنادق، خطاب التغطية، وترتيب ملف السفارة.',focusTr:'YM güzergah, otel mantığı, cover letter ve dosya düzeni hazırlar.'},
  china:{flag:'🇨🇳',flagImg:'https://flagcdn.com/w80/cn.png',en:'China',ar:'الصين',tr:'Çin',tagEn:'Business, trade, factories, and a new travel experience.',tagAr:'أعمال وتجارة ومصانع وتجربة سفر مختلفة.',tagTr:'İş, ticaret, fabrikalar ve farklı bir seyahat deneyimi.',summaryEn:'China is ideal for business travelers, exhibitions, trade, and tourism.',summaryAr:'الصين مناسبة لرجال الأعمال والمعارض والتجارة والسياحة.',summaryTr:'Çin iş seyahatleri, fuarlar, ticaret ve turizm için idealdir.',focusEn:'YM prepares the purpose, invitation, booking plan, and required file.',focusAr:'YM تجهز الغرض، الدعوة، خطة الحجز، والملف المطلوب.',focusTr:'YM amaç, davet, rezervasyon planı ve gerekli dosyayı hazırlar.'},
  uae:{flag:'🇦🇪',flagImg:'https://flagcdn.com/w80/ae.png',en:'UAE',ar:'الإمارات',tr:'BAE',tagEn:'Luxury, business, tourism, and family visits.',tagAr:'فخامة وأعمال وسياحة وزيارات عائلية.',tagTr:'Lüks, iş, turizm ve aile ziyaretleri.',summaryEn:'The UAE is a popular option for short trips, work interests, and luxury travel.',summaryAr:'الإمارات خيار محبوب للرحلات القصيرة وفرص العمل والسفر الفاخر.',summaryTr:'BAE kısa geziler, iş fırsatları ve lüks seyahat için popülerdir.',focusEn:'YM helps with visa selection, travel details, hotel, and flight.',focusAr:'YM تساعد في اختيار التأشيرة وتفاصيل السفر والفندق والطيران.',focusTr:'YM vize seçimi, seyahat detayları, otel ve uçuşta yardımcı olur.'},
  saudi:{flag:'🇸🇦',flagImg:'https://flagcdn.com/w80/sa.png',en:'Saudi Arabia',ar:'السعودية',tr:'Suudi Arabistan',tagEn:'Fast-growing destination for visits, events, and business.',tagAr:'وجهة متنامية للزيارات والفعاليات والأعمال.',tagTr:'Ziyaretler, etkinlikler ve iş için hızla büyüyen bir destinasyon.',summaryEn:'Saudi Arabia is opening strongly for tourism, business, events, and family visits.',summaryAr:'السعودية تنفتح بقوة للسياحة والأعمال والفعاليات والزيارات العائلية.',summaryTr:'Suudi Arabistan turizm, iş, etkinlikler ve aile ziyaretlerine güçlü şekilde açılıyor.',focusEn:'YM helps with visa type, travel purpose, accommodation, and dates.',focusAr:'YM تساعد في نوع التأشيرة، غرض السفر، الإقامة، والمواعيد.',focusTr:'YM vize türü, seyahat amacı, konaklama ve tarihlerde yardımcı olur.'},
  southafrica:{flag:'🇿🇦',flagImg:'https://flagcdn.com/w80/za.png',en:'South Africa',ar:'جنوب أفريقيا',tr:'Güney Afrika',tagEn:'Adventure, nature, business and family trips.',tagAr:'مغامرة وطبيعة وأعمال ورحلات عائلية.',tagTr:'Macera, doğa, iş ve aile seyahatleri.',summaryEn:'South Africa needs clear bookings, financial proof, travel purpose, and organized documents.',summaryAr:'جنوب أفريقيا تحتاج حجوزات واضحة، إثبات مالي، غرض سفر، ومستندات منظمة.',summaryTr:'Güney Afrika net rezervasyonlar, finansal kanıt, amaç ve düzenli belgeler ister.',focusEn:'YM helps with embassy file order, travel plan, hotel bookings, and supporting proof.',focusAr:'YM تساعد في ترتيب ملف السفارة، خطة السفر، حجوزات الفندق، والإثباتات الداعمة.',focusTr:'YM elçilik dosyası, seyahat planı, otel rezervasyonları ve destekleyici belgelerde yardımcı olur.'}
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
    b.innerHTML=`<strong><img class="ym-flag-img" src="${c.flagImg}" alt="${name} flag" loading="lazy"> ${name}</strong><span>${tag}</span>`;
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
      <div class="country-flag"><img class="ym-flag-img" src="${c.flagImg}" alt="${name} flag" loading="lazy"></div>
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


/* ═══ INLINE OFFICE BOOKING ═══ */
function handleOfficeDateChange(){
  const date = document.getElementById('officeDate');
  const alertBox = document.getElementById('bk_alert_inline');
  const isFri = date && isFridayDate(date.value);
  if(alertBox) alertBox.style.display = isFri ? 'block' : 'none';
}
function setOfficeTime(btn, val){
  document.querySelectorAll('#officeTimeChips button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('officeTime').value = val;
}
function setOfficeService(btn, val){
  document.querySelectorAll('.service-chip-grid button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('officeService').value = val;
}
function submitOfficeBooking(){
  const date=document.getElementById('officeDate').value || '-';
  if(isFridayDate(date)){ handleOfficeDateChange(); return; }
  const time=document.getElementById('officeTime').value || '-';
  const service=document.getElementById('officeService').value || '-';
  const name=document.getElementById('officeName').value.trim() || '-';
  const phone=document.getElementById('officePhone').value.trim() || '-';
  const travelers=document.getElementById('officeTravelers').value || '1';
  const notes=document.getElementById('officeNotes').value.trim() || '-';
  const greet={en:'Hello YM, I want to book an in-office consultation',ar:'مرحبًا YM، أريد حجز استشارة داخل المكتب',tr:'Merhaba YM, ofiste danışma randevusu almak istiyorum'};
  const msg=`${greet[lang]||greet.en}
📅 Date: ${date}
⏰ Time: ${time}
📋 Service: ${service}
👥 Travelers: ${travelers}
👤 Name: ${name}
📱 Phone: ${phone}
📝 Notes: ${notes}`;
  window.open('https://wa.me/201221845179?text='+encodeURIComponent(msg),'_blank');
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
applyLang();
const officeDateInit=document.getElementById('officeDate'); if(officeDateInit){ officeDateInit.min=new Date().toISOString().split('T')[0]; } // Always apply lang on load


/* ═════════ YM BUSINESS UPGRADE LOGIC ═════════ */
const YM_DEFAULT_SETTINGS={onlinePrice:300,officePrice:0,whatsapp:'201221845179',whatsappYoussef:'201221845179',whatsappAhmed:'201270554578',adminPass:'YM2026',clarity:'',instapayAccounts:[{owner:'Ahmed Abdelhay',name:'مستر احمد عبد الحي - المدير التنفيذي',handle:'ahmedmo1353@instapay',link:'https://ipn.eg/S/ahmedmo1353/instapay/5Vko7c'},{owner:'Youssef Mamdouh',name:'مستر يوسف ممدوح - مدير الشركة',handle:'jomamdouh@instapay',link:'https://ipn.eg/S/jomamdouh/instapay/3vq6Dx'}]};
function getYMSettings(){try{return {...YM_DEFAULT_SETTINGS,...JSON.parse(localStorage.getItem('ymBusinessSettings')||'{}')}}catch{return YM_DEFAULT_SETTINGS}}
function setYMSettings(v){localStorage.setItem('ymBusinessSettings',JSON.stringify({...getYMSettings(),...v})); applyYMSettings();}
function toast(msg){const t=document.getElementById('ymToast'); if(!t)return; t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2600)}
function copyText(v){navigator.clipboard&&navigator.clipboard.writeText(v); toast(lang==='ar'?'تم النسخ':'Copied')}
function moneyLabel(v){return Number(v)===0?(lang==='ar'?'مجاني':'Free'):v+' EGP'}
function renderInstaPayAccounts(){
  const box=document.getElementById('instapayAccountsView'); if(!box)return;
  const st=getYMSettings(); const accounts=Array.isArray(st.instapayAccounts)?st.instapayAccounts:YM_DEFAULT_SETTINGS.instapayAccounts;
  box.innerHTML=accounts.map((a,i)=>`<div class="instapay-account-card"><strong>${a.name||a.owner||'YM InstaPay'}</strong><span>${a.handle||''}</span><div class="instapay-actions"><a href="${a.link||'#'}" target="_blank">Open InstaPay</a><button type="button" onclick="copyText((getYMSettings().instapayAccounts||[])[${i}]?.handle||'')">Copy handle</button></div></div>`).join('')
}
function applyYMSettings(){const st=getYMSettings(); const o=document.getElementById('onlinePriceView'),f=document.getElementById('officePriceView'); if(o)o.textContent=moneyLabel(st.onlinePrice); if(f){f.textContent=moneyLabel(st.officePrice); f.classList.toggle('ym-price-free',Number(st.officePrice)===0)} renderInstaPayAccounts();}
function setConsultType(btn,type){document.querySelectorAll('.payment-choice-grid button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); document.getElementById('consultType').value=type; const box=document.getElementById('instapayAccountsView'); if(box) box.style.display=type==='online'?'grid':'none'; const note=document.getElementById('paymentModeNote'); if(note) note.textContent=type==='office'?(lang==='ar'?'الاستشارة داخل المكتب مجانية ولا تحتاج دفع إنستا باي':'Office consultation is free and does not require InstaPay payment'):(lang==='ar'?'الاستشارة الأونلاين 300 جنيه عبر إنستا باي':'Online consultation is 300 EGP via InstaPay');}
function saveBookingLocal(b){const arr=JSON.parse(localStorage.getItem('ymBookings')||'[]'); arr.unshift(b); localStorage.setItem('ymBookings',JSON.stringify(arr.slice(0,300)));}
function getBookings(){try{return JSON.parse(localStorage.getItem('ymBookings')||'[]')}catch{return []}}
function submitOfficeBooking(){
  const date=document.getElementById('officeDate').value || '-';
  if(isFridayDate(date)){ handleOfficeDateChange(); return; }
  const time=document.getElementById('officeTime').value || '-';
  const service=document.getElementById('officeService').value || '-';
  const name=document.getElementById('officeName').value.trim();
  const phone=document.getElementById('officePhone').value.trim();
  if(!name||!phone){toast(lang==='ar'?'اكتب الاسم ورقم الهاتف أولاً':'Please add name and phone first');return}
  const travelers=document.getElementById('officeTravelers').value || '1';
  const notes=document.getElementById('officeNotes').value.trim() || '-';
  const st=getYMSettings(); const consultType=document.getElementById('consultType').value||'online';
  const price=consultType==='online'?Number(st.onlinePrice):Number(st.officePrice);
  const primaryInsta=(Array.isArray(st.instapayAccounts)?st.instapayAccounts:YM_DEFAULT_SETTINGS.instapayAccounts)[0]||{};
  const receipt=document.getElementById('instaReceipt'); const receiptName=receipt&&receipt.files&&receipt.files[0]?receipt.files[0].name:'Not uploaded';
  const booking={created:new Date().toLocaleString(),date,time,service,name,phone,travelers,notes,consultType,price,receiptName};
  saveBookingLocal(booking); trackYM('booking_submit',booking);
  const greet={en:'Hello YM, I booked a consultation from the website',ar:'مرحبًا YM، قمت بحجز استشارة من الموقع',tr:'Merhaba YM, web sitesinden danışma rezervasyonu yaptım'};
  const msg=`${greet[lang]||greet.en}
Type: ${consultType}
Price: ${price} EGP
InstaPay: ${consultType==='online'?(primaryInsta.handle||'YM InstaPay'):'Office consultation is free'}
Receipt: ${receiptName}
📅 Date: ${date}
⏰ Time: ${time}
📋 Service: ${service}
👥 Travelers: ${travelers}
👤 Name: ${name}
📱 Phone: ${phone}
📝 Notes: ${notes}

${receiptName==='Not uploaded'?'I will send the InstaPay receipt in this WhatsApp chat.':'Receipt file selected on website; I can resend it here if needed.'}`;
  window.open('https://wa.me/'+(st.whatsappAhmed||st.whatsapp)+'?text='+encodeURIComponent(msg),'_blank');
  document.querySelector('.ym-booking-confirm')?.remove();
  const done=document.createElement('div'); done.className='ym-booking-confirm'; done.style.display='block'; done.textContent=lang==='ar'?'تم حفظ طلبك وفتح واتساب لتأكيد الإيصال.':'Booking saved and WhatsApp opened for receipt confirmation.'; document.querySelector('.ym-appointment-form').appendChild(done);
  renderBookings();
}
function openAdminPanel(){document.getElementById('ymAdminPanel').classList.add('open'); renderAdmin();}
function closeAdminPanel(){document.getElementById('ymAdminPanel').classList.remove('open')}
function adminLogin(){const st=getYMSettings(); if(document.getElementById('adminPass').value===st.adminPass){sessionStorage.setItem('ymAdmin','1'); renderAdmin(); toast('Admin unlocked')}else toast('Wrong passcode')}
function renderAdmin(){const logged=sessionStorage.getItem('ymAdmin')==='1'; document.getElementById('adminLoginBox').style.display=logged?'none':'block'; document.getElementById('adminContent').style.display=logged?'block':'none'; if(!logged)return; const st=getYMSettings(); const set=(id,val)=>{const el=document.getElementById(id); if(el) el.value=val||''}; set('setOnline',st.onlinePrice); set('setOffice',st.officePrice); set('setWhatsYoussef',st.whatsappYoussef); set('setWhatsAhmed',st.whatsappAhmed); set('setClarity',st.clarity); set('setInstaAccounts',JSON.stringify(st.instapayAccounts||[],null,2)); renderBookings(); renderTracking(); renderAdminReviews();}
function saveYMSettings(){let accounts; try{accounts=JSON.parse(document.getElementById('setInstaAccounts').value||'[]')}catch(e){toast('Invalid InstaPay JSON');return} setYMSettings({onlinePrice:+document.getElementById('setOnline').value||300,officePrice:+document.getElementById('setOffice').value||0,whatsappYoussef:document.getElementById('setWhatsYoussef').value.replace(/\D/g,''),whatsappAhmed:document.getElementById('setWhatsAhmed').value.replace(/\D/g,''),whatsapp:(document.getElementById('setWhatsYoussef').value||'201221845179').replace(/\D/g,''),clarity:document.getElementById('setClarity').value.trim(),instapayAccounts:accounts});toast('Settings saved'); renderAdmin();}
function renderBookings(){const body=document.getElementById('bookingRows'); if(!body)return; const rows=getBookings(); body.innerHTML=rows.length?rows.map(b=>`<tr><td>${b.created}<br>${b.date} ${b.time}</td><td>${b.name}</td><td>${b.phone}</td><td>${b.consultType}</td><td>${b.price} EGP</td><td>${b.service}</td><td>${b.receiptName}</td></tr>`).join(''):'<tr><td colspan="7">No local bookings yet.</td></tr>'}
function exportBookingsCSV(){const rows=getBookings(); const head=['created','name','phone','consultType','price','service','date','time','receiptName','notes']; const csv=[head.join(',')].concat(rows.map(r=>head.map(k=>'"'+String(r[k]||'').replace(/"/g,'""')+'"').join(','))).join('\n'); downloadFile('ym-bookings.csv',csv,'text/csv')}
function clearBookings(){if(confirm('Clear local bookings?')){localStorage.removeItem('ymBookings');renderBookings();}}
function downloadFile(name,content,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
function trackYM(event,meta={}){try{const arr=JSON.parse(localStorage.getItem('ymTracking')||'[]');arr.push({time:new Date().toISOString(),event,path:location.pathname+location.hash,lang,meta});localStorage.setItem('ymTracking',JSON.stringify(arr.slice(-500)));}catch{}}
function renderTracking(){const el=document.getElementById('trackSummary'); if(!el)return; const arr=JSON.parse(localStorage.getItem('ymTracking')||'[]'); const counts=arr.reduce((a,x)=>{a[x.event]=(a[x.event]||0)+1;return a},{}); el.innerHTML=`Events: <b>${arr.length}</b><br>`+Object.entries(counts).map(([k,v])=>`${k}: ${v}`).join('<br>')}
function downloadTracking(){downloadFile('ym-tracking.json',localStorage.getItem('ymTracking')||'[]','application/json')}
function clearTracking(){localStorage.removeItem('ymTracking');renderTracking();}
function getDefaultReviews(){return [
 {name:'Ahmed M.',city:'Alexandria, Egypt',initial:'A',stars:5,text:'YM prepared my entire USA visa file. Interview was smooth, visa approved. Professional team.',approved:true},
 {name:'Sara K.',city:'Cairo, Egypt',initial:'S',stars:5,text:'Went to YM confused about Schengen. Left with a complete plan. Got the visa in 2 weeks!',approved:true},
 {name:'Mohamed T.',city:'Alexandria, Egypt',initial:'M',stars:5,text:'Fast replies on WhatsApp, real advice, no fake promises. This is the difference with YM.',approved:true}
]}
function getReviews(){try{const v=JSON.parse(localStorage.getItem('ymReviews')||'null');return Array.isArray(v)?v:getDefaultReviews()}catch{return getDefaultReviews()}}
function saveReviews(v){localStorage.setItem('ymReviews',JSON.stringify(v.slice(0,80)));renderReviews();renderAdminReviews();}
function reviewStars(n){return '★★★★★'.slice(0,n)+'☆☆☆☆☆'.slice(0,5-n)}
function safeText(v){return String(v||'').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function reviewCard(r,i){return `<div class="ym-review-card ${i===1?'highlight-review':''}"><div class="ym-review-stars">${reviewStars(Number(r.stars)||5)}</div><p>"${safeText(r.text)}"</p><div class="ym-reviewer"><div class="ym-reviewer-avatar">${safeText((r.initial||r.name||'Y').slice(0,2).toUpperCase())}</div><div><strong>${safeText(r.name||'YM Client')}</strong><span>${safeText(r.city||'Egypt')}</span></div></div></div>`}
function renderReviews(){const grid=document.querySelector('.ym-reviews-grid'); if(!grid)return; const rows=getReviews().filter(r=>r.approved!==false); grid.innerHTML=rows.slice(0,9).map(reviewCard).join('')}
function submitClientReview(){const name=document.getElementById('reviewName')?.value.trim(); const city=document.getElementById('reviewCity')?.value.trim(); const text=document.getElementById('reviewText')?.value.trim(); const stars=+document.getElementById('reviewStars')?.value||5; const initial=document.getElementById('reviewInitial')?.value.trim() || (name?name[0]:'Y'); if(!name||!text){toast(lang==='ar'?'اكتب الاسم والتقييم أولاً':'Please add your name and review');return} const arr=getReviews(); arr.unshift({name,city,initial,stars,text,approved:true,created:new Date().toISOString()}); saveReviews(arr); ['reviewName','reviewCity','reviewText','reviewInitial'].forEach(id=>{const el=document.getElementById(id); if(el) el.value=''}); toast(lang==='ar'?'تم إضافة تقييمك بنجاح':'Review added successfully')}
function adminAddReview(){const name=document.getElementById('adminReviewName').value.trim(); const city=document.getElementById('adminReviewCity').value.trim(); const text=document.getElementById('adminReviewText').value.trim(); const stars=+document.getElementById('adminReviewStars').value||5; const initial=document.getElementById('adminReviewInitial').value.trim() || (name?name[0]:'Y'); if(!name||!text){toast('Add name and review text');return} const arr=getReviews(); arr.unshift({name,city,initial,stars,text,approved:true,created:new Date().toISOString()}); saveReviews(arr); ['adminReviewName','adminReviewCity','adminReviewText','adminReviewInitial'].forEach(id=>document.getElementById(id).value='');}
function deleteReview(i){const arr=getReviews(); arr.splice(i,1); saveReviews(arr)}
function toggleReview(i){const arr=getReviews(); arr[i].approved=arr[i].approved===false; saveReviews(arr)}
function renderAdminReviews(){const el=document.getElementById('adminReviewsList'); if(!el)return; const arr=getReviews(); el.innerHTML=arr.map((r,i)=>`<div class="review-admin-row"><div><strong>${safeText(r.name)}</strong> <small>${reviewStars(Number(r.stars)||5)} · ${safeText(r.city||'')} · ${r.approved===false?'Hidden':'Shown'}</small><br><small>${safeText(r.text).slice(0,110)}</small></div><div style="display:flex;gap:6px"><button class="copy-btn" onclick="toggleReview(${i})">${r.approved===false?'Show':'Hide'}</button><button class="copy-btn danger-btn" onclick="deleteReview(${i})">Delete</button></div></div>`).join('')}

function openPrivacy(){document.getElementById('privacyRibbon').classList.add('show')}
function acceptPrivacy(){localStorage.setItem('ymPrivacyOk','1');document.getElementById('privacyRibbon').classList.remove('show')}
if(!localStorage.getItem('ymPrivacyOk')) setTimeout(openPrivacy,5200);
document.addEventListener('click',e=>{const a=e.target.closest('a,button'); if(a) trackYM('click',{text:(a.innerText||a.title||'').slice(0,80),href:a.href||''});});
window.addEventListener('hashchange',()=>trackYM('section_view',{hash:location.hash}));
applyYMSettings(); renderReviews(); trackYM('page_load',{ua:navigator.userAgent});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}


