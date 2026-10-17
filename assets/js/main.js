/* TRUCCO — arma cada página desde projects.js.
   <body data-page="work|project|about|contact" data-slug="…"> */
(() => {
  const D = window.TRUCCO;
  const body = document.body;
  const page = body.dataset.page;
  // raíz del site, a partir de donde vive este script (assets/js/main.js)
  const ROOT = new URL('../../', document.currentScript.src).href;
  const url = (p) => ROOT + p;
  const media = (slug, file) => url(`assets/media/${slug}/${file}`);
  const projectUrl = (slug) => url(`work/${slug}/`);
  const bySlug = Object.fromEntries(D.projects.map((p, i) => [p.slug, { ...p, i }]));
  const num = (i) => String(i + 1).padStart(2, '0');
  const total = String(D.projects.length).padStart(2, '0');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const ARROW = '<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10L10 2M4 2h6v6" fill="none" stroke="currentColor" stroke-width="1"/></svg>';

  /* ── header + footer ─────────────────────────────────────── */
  const nav = [['work', 'Work', ''], ['about', 'About', 'about/'], ['contact', 'Contact', 'contact/']];
  const current = page === 'project' ? 'work' : page;
  const header = h(`
    <header class="hdr">
      <nav class="hdr__nav" aria-label="Main">
        ${nav.map(([k, label, p]) => `<a href="${url(p)}"${k === current ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
      <a class="hdr__mark wordmark" href="${url('')}" aria-label="TRUCCO — home">TRUCCO</a>
      <button class="hdr__burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>
    </header>
    <div class="menu" hidden>
      ${nav.map(([k, label, p], i) => `<a href="${url(p)}"><small>${num(i)}</small>${label}</a>`).join('')}
      <p class="menu__foot"><a href="mailto:${D.email}">${D.email}</a></p>
    </div>`);
  body.prepend(header);

  body.append(h(`
    <footer class="ftr">
      <span class="wordmark">TRUCCO</span>
      <a href="mailto:${D.email}">${D.email}</a>
      <span>© ${new Date().getFullYear()}</span>
    </footer>`));

  const burger = document.querySelector('.hdr__burger');
  const menu = document.querySelector('.menu');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', open);
    menu.hidden = !open;
    body.classList.toggle('menu-open', open);
  });

  addEventListener('scroll', () => body.classList.toggle('scrolled', scrollY > 40), { passive: true });

  /* ── pages ───────────────────────────────────────────────── */
  const main = document.querySelector('main');

  if (page === 'work') {
    const L = D.landing;
    const hp = bySlug[L.hero.p];
    const hsrc = media(hp.slug, `frag-${L.hero.f}`);
    const hero = `
      <section class="hero" data-scene="hero">
        <div class="hero__stage">
          <p class="hero__word hero__word--l">Branding</p>
          <a class="hero__win" href="${projectUrl(hp.slug)}" data-cursor="View">
            <video muted loop playsinline preload="auto" autoplay poster="${hsrc}.jpg" data-src="${hsrc}.mp4"></video>
          </a>
          <p class="hero__word hero__word--r">Audiovisual</p>
          <p class="hero__foot"><span>Creative group</span><span>Selected work ${new Date().getFullYear()}</span><span class="hero__scroll">Scroll</span></p>
        </div>
      </section>`;

    const chapters = L.chapters.map(({ p: slug, frags }) => {
      const p = bySlug[slug];
      const cards = frags.map((f, k) => {
        const src = media(p.slug, `frag-${f}`);
        return `
          <a class="card" href="${projectUrl(p.slug)}" data-cursor="View">
            <span class="card__media"><video muted loop playsinline preload="none" poster="${src}.jpg" data-src="${src}.mp4"></video></span>
            <span class="card__n">${String(k + 1).padStart(2, '0')}</span>
          </a>`;
      }).join('');
      return `
        <section class="chapter" data-scene="chapter">
          <div class="chapter__stage">
            <header class="chapter__head">
              <p class="chapter__n">${num(p.i)}<span>/${total}</span></p>
              <h2 class="chapter__title">${esc(p.title)}</h2>
              <p class="chapter__kind">${esc(p.kind)} · ${p.year}</p>
              <a class="chapter__cta" href="${projectUrl(p.slug)}">watch the full project here ${ARROW}</a>
            </header>
            <div class="track">
              ${cards}
              <a class="card card--end" href="${projectUrl(p.slug)}" data-cursor="Watch">
                <span class="card__media"><img src="${media(p.slug, 'full.jpg')}" alt="" loading="lazy"></span>
                <span class="card__end"><small>Full project · ${p.duration}</small>Watch ${esc(p.title)} ${ARROW}</span>
              </a>
            </div>
            <div class="chapter__progress"><i></i></div>
          </div>
        </section>`;
    }).join('');

    const soon = D.projects.filter((p) => p.placeholder);
    const next = `
      <section class="soon">
        <header class="soon__head" data-reveal><p class="label">In progress</p><p class="label">${String(soon.length).padStart(2, '0')} projects</p></header>
        <div class="soon__grid">
          ${soon.map((p, k) => `
            <a class="ph-card" href="${projectUrl(p.slug)}" data-reveal style="--d:${k}">
              <span class="ph-card__box"><span class="ph__label">add info here</span></span>
              <span class="ph-card__meta"><span>${num(p.i)}</span><b>${esc(p.title)}</b><span>${esc(p.kind)}</span></span>
            </a>`).join('')}
        </div>
      </section>`;

    main.append(h(`<h1 class="sr">TRUCCO — Work</h1>${hero}${chapters}${next}`));
  }

  if (page === 'project') {
    const p = bySlug[body.dataset.slug];
    document.title = `${p.title} — TRUCCO`;
    main.append(h(p.placeholder ? placeholderPage(p) : projectPage(p)));
    main.append(h(pager(p)));
  }

  function projectPage(p) {
    const stills = Array.from({ length: p.stills }, (_, k) => {
      const n = String(k + 1).padStart(2, '0');
      return `<button class="still" data-full="${media(p.slug, `still-${n}.jpg`)}" aria-label="Open still ${k + 1}">
        <img src="${media(p.slug, `still-${n}-s.jpg`)}" alt="${esc(p.title)} — still ${k + 1}" loading="lazy" width="900" height="506"></button>`;
    }).join('');
    return `
      <article class="proj">
        <header class="proj__head" data-reveal>
          <p class="proj__n">${num(p.i)}/${total}</p>
          <h1 class="proj__title">${esc(p.title)}</h1>
          <p class="proj__sub">${esc(p.kind)} · ${p.year}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <dl class="credits">${p.credits.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        </header>

        <div class="player" data-reveal>
          <video preload="metadata" playsinline poster="${media(p.slug, 'full.jpg')}" src="${media(p.slug, 'full.mp4')}"></video>
          <button class="player__big" aria-label="Play film"><span>Play film</span><small>${p.duration}</small></button>
          <div class="player__bar">
            <button class="player__play">Play</button>
            <span class="player__time">00:00 / ${p.duration}</span>
            <span class="player__track"><i></i></span>
            <button class="player__sound">Sound on</button>
            <button class="player__fs">Full</button>
          </div>
        </div>

        <section class="proj__text" data-reveal>
          <p class="label">About the project</p>
          <div>
            <p class="proj__intro">${esc(p.intro)}</p>
            <ol class="acts">${p.acts.map(([t, d], k) => `<li><span>${['I', 'II', 'III', 'IV', 'V', 'VI'][k]}</span><b>${esc(t)}</b><em>${esc(d)}</em></li>`).join('')}</ol>
          </div>
        </section>

        <section class="gallery">${stills}</section>
      </article>
      <dialog class="lightbox"><img alt=""><button class="lb__x" aria-label="Close">Close</button>
        <button class="lb__prev" aria-label="Previous">Prev</button><button class="lb__next" aria-label="Next">Next</button>
        <span class="lb__n"></span></dialog>`;
  }

  function placeholderPage(p) {
    const boxes = Array.from({ length: 6 }, () => '<span class="still still--ph"></span>').join('');
    return `
      <article class="proj proj--ph">
        <header class="proj__head" data-reveal>
          <p class="proj__n">${num(p.i)}/${total}</p>
          <h1 class="proj__title">${esc(p.title)}</h1>
          <p class="proj__sub">${esc(p.kind)} · add info here</p>
          <dl class="credits">${['Client', 'Creative direction', 'Executive production', 'Production'].map((k) => `<div><dt>${k}</dt><dd class="bar"></dd></div>`).join('')}</dl>
        </header>
        <div class="player player--ph" data-reveal><span class="ph__label">Film<br>add info here</span></div>
        <section class="proj__text" data-reveal>
          <p class="label">About the project</p>
          <div><p class="proj__intro ph__text">Add info here.</p><span class="bar"></span><span class="bar"></span><span class="bar bar--short"></span></div>
        </section>
        <section class="gallery">${boxes}</section>
      </article>`;
  }

  function pager(p) {
    const n = D.projects.length;
    const prev = D.projects[(p.i - 1 + n) % n];
    const next = D.projects[(p.i + 1) % n];
    return `
      <nav class="pager" aria-label="Projects">
        <a class="pager__prev" href="${projectUrl(prev.slug)}"><small>Previous</small>${esc(prev.title)}</a>
        <a class="pager__all" href="${url('')}">All work</a>
        <a class="pager__next" href="${projectUrl(next.slug)}"><small>Next</small>${esc(next.title)}</a>
      </nav>`;
  }

  if (page === 'about') {
    main.append(h(`
      <section class="about">
        <h1 class="sr">About</h1>
        <p class="statement">
          <span class="line" data-reveal><i>We are a</i> <b>Creative</b></span>
          <span class="line" data-reveal><i>and</i> <b>Collaborative</b></span>
          <span class="line" data-reveal><b>Group</b> <i>focused on</i></span>
          <span class="line" data-reveal><b class="hollow">Branding</b> <i>&amp;</i></span>
          <span class="line" data-reveal><b class="hollow">Audiovisual</b></span>
        </p>
        <div class="people">
          ${D.people.map((x, i) => {
            const [first, ...rest] = x.name.split(' ');
            return `
            <div class="person person--${i}" data-reveal>
              <h2 class="person__name" data-name="${esc(first)}&#10;${esc(rest.join(' '))}">${esc(first)}<br>${esc(rest.join(' '))}</h2>
              <p class="person__role">${esc(x.role)}</p>
              <a class="person__link" href="${x.link.href}" target="_blank" rel="noopener"><span>${esc(x.link.label)}</span> ${ARROW}</a>
            </div>`;
          }).join('')}
        </div>
      </section>`));
  }

  if (page === 'contact') {
    main.append(h(`
      <section class="contact">
        <h1 class="sr">Contact</h1>
        <p class="label" data-reveal>Contact</p>
        <a class="cta" href="mailto:${D.email}" data-reveal>Get in touch ${ARROW}</a>
        <div class="contact__rows" data-reveal>
          <div><p class="label">Email</p><a href="mailto:${D.email}">${D.email}</a></div>
          <div><p class="label">Meeting</p><a href="${D.calendly}" target="_blank" rel="noopener">Book a meeting ${ARROW}</a></div>
          <div><p class="label">Based in</p><p>${D.city} — working worldwide</p></div>
        </div>
      </section>`));
  }

  /* ── reveal on scroll ────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

  /* ── loops: cargan y suenan solo en pantalla ─────────────── */
  const vio = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) { v.src = v.dataset.src; }
        if (!reduced) v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    });
  }, { rootMargin: '200px 0px' });
  document.querySelectorAll('video[data-src]').forEach((v) => vio.observe(v));

  /* ── escenas de scroll (home) ────────────────────────────── */
  const scenes = [...document.querySelectorAll('[data-scene]')];
  if (scenes.length) {
    const wide = matchMedia('(min-width: 861px)');
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const lerp = (a, b, t) => a + (b - a) * t;

    const layout = () => {
      scenes.forEach((s) => {
        if (s.dataset.scene !== 'chapter') return;
        const track = s.querySelector('.track');
        const last = track.lastElementChild;
        track.style.transform = '';
        const pad = parseFloat(getComputedStyle(track).paddingLeft);
        s._dist = wide.matches ? Math.max(0, last.offsetLeft + last.offsetWidth + pad - innerWidth) : 0;
        s.style.height = wide.matches ? `${s._dist + innerHeight}px` : '';
      });
    };

    const update = () => {
      const vw = innerWidth, vh = innerHeight;
      scenes.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;

        if (s.dataset.scene === 'hero') {
          const p = clamp(-r.top / (s.offsetHeight - vh));
          const e = ease(clamp(p / 0.75));
          const w0 = Math.min(vw * (wide.matches ? 0.36 : 0.72), vh * 0.8 * 16 / 9);
          const w = lerp(w0, vw, e);
          const hh = lerp(w0 * 9 / 16, vh, e);
          s.style.setProperty('--w', `${w}px`);
          s.style.setProperty('--h', `${hh}px`);
          s.style.setProperty('--scale', lerp(1.08, 1, e));
          s.style.setProperty('--fade', 1 - clamp(p * 2.4));
          return;
        }

        // capítulo: la tira horizontal avanza con el scroll vertical
        const p = s._dist ? clamp(-r.top / s._dist) : 0;
        const track = s.querySelector('.track');
        if (wide.matches) track.style.transform = `translate3d(${-p * s._dist}px,0,0)`;
        s.querySelector('.chapter__progress i').style.transform = `scaleX(${p})`;
        s.style.setProperty('--head', `${-p * 2}vw`);
        track.querySelectorAll('.card__media > *').forEach((m) => {
          const b = m.parentNode.getBoundingClientRect();
          const off = clamp((b.left + b.width / 2 - vw / 2) / vw, -1, 1);
          m.style.transform = `translate3d(${off * -7}%,0,0) scale(1.16)`;
        });
      });
    };

    let ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', () => { layout(); update(); });
    wide.addEventListener('change', () => { layout(); update(); });
    layout(); update();
    addEventListener('load', () => { layout(); update(); });
  }

  /* ── scroll suave ────────────────────────────────────────── */
  if (!reduced) {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js';
    s.onload = () => {
      const lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      document.querySelectorAll('.lightbox, .menu').forEach((el) => el.setAttribute('data-lenis-prevent', ''));
    };
    document.head.append(s);
  }

  /* ── cursor ──────────────────────────────────────────────── */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cur = document.createElement('div');
    cur.className = 'cursor';
    cur.innerHTML = '<span></span>';
    body.append(cur);
    let x = -100, y = -100, cx = x, cy = y;
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; });
    (function loop() {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      cur.classList.toggle('cursor--on', !!t);
      if (t) cur.querySelector('span').textContent = t.dataset.cursor;
      cur.classList.toggle('cursor--link', !t && !!e.target.closest('a, button'));
    });
  }

  /* ── player ──────────────────────────────────────────────── */
  const player = document.querySelector('.player:not(.player--ph)');
  if (player) {
    const v = player.querySelector('video');
    const play = player.querySelector('.player__play');
    const sound = player.querySelector('.player__sound');
    const time = player.querySelector('.player__time');
    const track = player.querySelector('.player__track');
    const fill = track.querySelector('i');
    const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    const toggle = () => (v.paused ? v.play() : v.pause());
    player.querySelector('.player__big').addEventListener('click', () => { v.muted = false; v.play(); });
    v.addEventListener('click', toggle);
    play.addEventListener('click', toggle);
    v.addEventListener('play', () => { player.classList.add('playing', 'started'); play.textContent = 'Pause'; });
    v.addEventListener('pause', () => { player.classList.remove('playing'); play.textContent = 'Play'; });
    v.addEventListener('timeupdate', () => {
      time.textContent = `${mmss(v.currentTime)} / ${mmss(v.duration || 0)}`;
      fill.style.transform = `scaleX(${v.currentTime / (v.duration || 1)})`;
    });
    sound.addEventListener('click', () => { v.muted = !v.muted; sound.textContent = v.muted ? 'Sound on' : 'Sound off'; });
    v.addEventListener('volumechange', () => { sound.textContent = v.muted ? 'Sound on' : 'Sound off'; });
    track.addEventListener('click', (e) => {
      const r = track.getBoundingClientRect();
      v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
    });
    player.querySelector('.player__fs').addEventListener('click', () => {
      (player.requestFullscreen || player.webkitRequestFullscreen || (() => v.webkitEnterFullscreen?.())).call(player);
    });
    // si sale de pantalla, pausa
    new IntersectionObserver(([e]) => { if (!e.isIntersecting && !v.paused) v.pause(); }, { threshold: 0.15 }).observe(player);
  }

  /* ── lightbox ────────────────────────────────────────────── */
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const stills = [...document.querySelectorAll('.still[data-full]')];
    const img = lb.querySelector('img');
    const n = lb.querySelector('.lb__n');
    let k = 0;
    const show = (i) => {
      k = (i + stills.length) % stills.length;
      img.src = stills[k].dataset.full;
      img.alt = stills[k].querySelector('img').alt;
      n.textContent = `${String(k + 1).padStart(2, '0')}/${String(stills.length).padStart(2, '0')}`;
    };
    stills.forEach((s, i) => s.addEventListener('click', () => { show(i); lb.showModal(); }));
    lb.querySelector('.lb__x').addEventListener('click', () => lb.close());
    lb.querySelector('.lb__prev').addEventListener('click', () => show(k - 1));
    lb.querySelector('.lb__next').addEventListener('click', () => show(k + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(k - 1);
      if (e.key === 'ArrowRight') show(k + 1);
    });
    let sx = null;
    lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(k + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ── intro: solo la primera vez por sesión, solo en la home ─ */
  let seen = false;
  try { seen = sessionStorage.getItem('trucco-intro') === '1'; sessionStorage.setItem('trucco-intro', '1'); } catch (e) {}
  if (page === 'work' && !seen && !reduced) {
    const intro = h(`<div class="intro" aria-hidden="true"><span class="wordmark">${[...'TRUCCO'].map((c, i) => `<b style="--i:${i}">${c}</b>`).join('')}</span><i class="intro__line"></i></div>`);
    body.append(intro);
    const el = document.querySelector('.intro');
    setTimeout(() => el.classList.add('out'), 1900);
    setTimeout(() => el.remove(), 2800);
  }

  requestAnimationFrame(() => body.classList.add('ready'));
})();
