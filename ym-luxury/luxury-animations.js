/* ═══════════════════════════════════════════════════
   YM LUXURY — Premium Micro-Interactions & Animations
═══════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── Scroll Reveal ── */
  function initReveal(){
    const els = document.querySelectorAll(
      '.card, .panel, .ym-counter-box, .ym-trust-pillar, .ym-review-card, ' +
      '.member, .member-vip, .office-tile, .country-btn, .case-card, ' +
      '.closer-card, .scale-panel, .ym-premium-card, .email-card, ' +
      '.dest-card, .hero-card, .trust-box, .section-head'
    );
    els.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if(e.isIntersecting){
          setTimeout(() => e.target.classList.add('show'), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ── Parallax Gold Orbs ── */
  function injectOrbs(){
    const orbs = [
      { size:420, top:'-8%', left:'-6%', color:'rgba(200,164,74,.055)', blur:110, anim:'orbDrift1 18s ease-in-out infinite' },
      { size:350, top:'35%', right:'-8%', color:'rgba(22,72,200,.06)', blur:90, anim:'orbDrift2 22s ease-in-out infinite' },
      { size:280, top:'68%', left:'5%', color:'rgba(200,164,74,.04)', blur:80, anim:'orbDrift1 26s ease-in-out infinite reverse' }
    ];
    const style = document.createElement('style');
    style.textContent = `
      @keyframes orbDrift1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.06)} 66%{transform:translate(-15px,25px) scale(.96)} }
      @keyframes orbDrift2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-28px,18px) scale(1.08)} 70%{transform:translate(18px,-28px) scale(.94)} }
      .lux-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; will-change:transform; }
    `;
    document.head.appendChild(style);
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;';
    orbs.forEach(o => {
      const el = document.createElement('div');
      el.className = 'lux-orb';
      el.style.cssText = `width:${o.size}px;height:${o.size}px;top:${o.top||'auto'};left:${o.left||'auto'};right:${o.right||'auto'};bottom:${o.bottom||'auto'};background:radial-gradient(circle,${o.color},transparent 70%);filter:blur(${o.blur}px);animation:${o.anim};`;
      wrap.appendChild(el);
    });
    document.body.prepend(wrap);
  }

  /* ── Nav Active Link ── */
  function initNavHighlight(){
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    const sections = document.querySelectorAll('section[id]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const id = e.target.id;
          links.forEach(l => {
            l.style.color = l.getAttribute('href') === '#'+id ? 'var(--gold3)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => io.observe(s));
  }

  /* ── Gold shimmer on stat numbers ── */
  function initStatShimmer(){
    document.querySelectorAll('.ym-counter-num').forEach(el => {
      el.style.backgroundSize = '200% 100%';
      el.style.animation = 'goldShimmer 4s ease-in-out infinite';
    });
    const s = document.createElement('style');
    s.textContent = '@keyframes goldShimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}';
    document.head.appendChild(s);
  }

  /* ── Tilt on hero card ── */
  function initTilt(){
    const card = document.querySelector('.hero-card');
    if(!card) return;
    let raf;
    card.addEventListener('mousemove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-10px)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      card.style.transform = '';
      card.style.transition = 'transform .6s cubic-bezier(.2,.85,.2,1)';
      setTimeout(() => card.style.transition = '', 700);
    });
  }

  /* ── Button ripple ── */
  function initRipple(){
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e){
        const r = btn.getBoundingClientRect();
        const d = document.createElement('span');
        const size = Math.max(r.width, r.height) * 2;
        d.style.cssText = `position:absolute;border-radius:50%;transform:scale(0);animation:rippleAnim .55s linear;pointer-events:none;background:rgba(255,255,255,.22);width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px;`;
        btn.appendChild(d);
        setTimeout(() => d.remove(), 600);
      });
    });
    const s = document.createElement('style');
    s.textContent = '@keyframes rippleAnim{to{transform:scale(1);opacity:0}}';
    document.head.appendChild(s);
  }

  /* ── Cursor glow (desktop only) ── */
  function initCursorGlow(){
    if(window.innerWidth < 1024) return;
    const dot = document.createElement('div');
    dot.style.cssText = 'position:fixed;width:20px;height:20px;border-radius:50%;background:rgba(200,164,74,.18);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .12s,opacity .3s;will-change:transform;filter:blur(4px);';
    document.body.appendChild(dot);
    let mx=0,my=0,cx=0,cy=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    function animCursor(){
      cx += (mx-cx)*.18;
      cy += (my-cy)*.18;
      dot.style.left = cx+'px';
      dot.style.top = cy+'px';
      requestAnimationFrame(animCursor);
    }
    animCursor();
    document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(1.6)');
    document.addEventListener('mouseup', () => dot.style.transform = 'translate(-50%,-50%) scale(1)');
  }

  /* ── Smooth number counter ── */
  function initCounters(){
    const els = document.querySelectorAll('[data-count]');
    if(!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        let start = null;
        function step(ts){
          if(!start) start = ts;
          const p = Math.min((ts-start)/dur, 1);
          const ease = 1 - Math.pow(1-p, 3);
          el.textContent = (target % 1 === 0 ? Math.floor(target*ease) : (target*ease).toFixed(1)) + suffix;
          if(p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ── Section entrance lines ── */
  function initSectionLines(){
    const s = document.createElement('style');
    s.textContent = `
      .section-line { display:inline-block; width:0; height:1px; background:linear-gradient(90deg,var(--gold),rgba(200,164,74,.2)); transition:width 1.1s cubic-bezier(.2,.85,.2,1); margin: 0 12px; vertical-align:middle; }
      .label.show .section-line { width:44px; }
    `;
    document.head.appendChild(s);
  }

  /* ── Gold border glow on hover for premium elements ── */
  function initGoldGlow(){
    const s = document.createElement('style');
    s.textContent = `
      .btn-gold:focus-visible { outline:2px solid var(--gold3); outline-offset:3px; }
      .card:focus-within, .panel:focus-within { border-color:var(--gold-border2) !important; }
      ::selection { background:rgba(200,164,74,.28); color:#fff; }
    `;
    document.head.appendChild(s);
  }

  /* ── Loader enhancement ── */
  function enhanceLoader(){
    const loader = document.getElementById('ym-preloader');
    if(!loader) return;
    // Add cinematic bars
    const bars = document.createElement('div');
    bars.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
    bars.innerHTML = `
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,164,74,.35),transparent);"></div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,164,74,.25),transparent);"></div>
    `;
    loader.appendChild(bars);
  }

  /* ── Init all ── */
  function init(){
    enhanceLoader();
    setTimeout(() => {
      initReveal();
      injectOrbs();
      initNavHighlight();
      initStatShimmer();
      initTilt();
      initRipple();
      initCursorGlow();
      initCounters();
      initSectionLines();
      initGoldGlow();
    }, 400);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
