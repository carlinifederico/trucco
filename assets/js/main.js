/* TRUCCO — arma cada página desde projects.js.
   <body data-page="work|project|about|contact" data-slug="…"> */
(() => {
  const D = window.TRUCCO;
  const body = document.body;
  const page = body.dataset.page;
  body.classList.add(`page-${page}`);
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
  // logo del proyecto (imagen o SVG inline) con el nombre para lectores de pantalla
  const mark = (p) => (p.logo
    ? `<img class="logo" src="${url(p.logo)}" alt="${esc(p.title)}">`
    : p.mark ? `<span class="logo logo--svg">${p.mark}</span><span class="sr">${esc(p.title)}</span>` : esc(p.title));

  const svgI = (d) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICON = {
    mail: svgI('<rect x="3" y="5.5" width="18" height="13"/><path d="M3.5 6l8.5 7 8.5-7"/>'),
    cal: svgI('<rect x="3.5" y="5" width="17" height="15"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>'),
    pin: svgI('<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
    user: svgI('<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>'),
    at: svgI('<circle cx="12" cy="12" r="3.6"/><path d="M15.6 12v1.6a2.4 2.4 0 004.8 0V12a8.4 8.4 0 10-3.3 6.7"/>'),
    text: svgI('<path d="M4 6h16M4 10.5h16M4 15h10M4 19.5h6"/>'),
  };
  const ARROW ='<svg class="arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10L10 2M4 2h6v6" fill="none" stroke="currentColor" stroke-width="1"/></svg>';

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
        <a class="hero__media" href="${projectUrl(hp.slug)}" data-cursor="View">
          <video muted loop playsinline preload="auto" autoplay poster="${hsrc}.jpg" data-src="${hsrc}.mp4"></video>
        </a>
        <p class="hero__foot"><span>${esc(hp.title)}</span><span>Selected work ${new Date().getFullYear()}</span><span class="hero__scroll">Scroll</span></p>
      </section>`;

    // todos los proyectos, en orden; los placeholder pasan con cuadros grises
    const chapterOf = Object.fromEntries(L.chapters.map((c) => [c.p, c.frags]));
    const chapters = D.projects.map(({ slug }) => {
      const p = bySlug[slug];
      const ph = !!p.placeholder;
      const cards = ph
        ? Array.from({ length: 4 }, (_, k) => `
          <a class="card card--ph" href="${projectUrl(p.slug)}">
            <span class="card__media"><span class="ph__label">add info here</span></span>
          </a>`).join('')
        : (chapterOf[p.slug] || []).map((f, k) => {
          const src = media(p.slug, `frag-${f}`);
          return `
          <a class="card" href="${projectUrl(p.slug)}" data-cursor="View">
            <span class="card__media"><video muted loop playsinline preload="none" poster="${src}.jpg" data-src="${src}.mp4"></video></span>
          </a>`;
        }).join('');
      const end = ph
        ? `<a class="card card--end card--ph" href="${projectUrl(p.slug)}">
            <span class="card__media"></span>
            <span class="card__end"><small>Full project</small>add info here ${ARROW}</span>
          </a>`
        : `<a class="card card--end" href="${projectUrl(p.slug)}" data-cursor="Watch">
            <span class="card__media"><img src="${media(p.slug, 'full.jpg')}" alt="" loading="lazy"></span>
            <span class="card__end"><small>Full project · ${p.duration}</small>Watch ${esc(p.title)} ${ARROW}</span>
          </a>`;
      return `
        <section class="chapter${ph ? ' chapter--ph' : ''}" data-scene="chapter" id="p-${p.slug}">
          <div class="chapter__stage" data-cursor="Next project ↕">
            <header class="chapter__head" data-cursor="">
              <h2 class="chapter__title">${mark(p)}</h2>
              <p class="chapter__kind">${esc(p.kind)} · ${ph ? 'add info here' : p.year}</p>
              <a class="chapter__cta" href="${projectUrl(p.slug)}">${ph ? 'project page' : 'watch the full project here'} ${ARROW}</a>
            </header>
            <div class="track" data-cursor="">${cards}${end}</div>
            <div class="chapter__foot">
              <div class="chapter__progress"><i></i></div>
              <a class="chapter__skip" href="#" data-skip>${p.i < D.projects.length - 1 ? 'Next project <span>↓</span>' : 'Back to top <span>↑</span>'}</a>
            </div>
          </div>
        </section>`;
    }).join('');

    // índice fijo: salta de proyecto sin recorrer la tira
    const index = `
      <nav class="index" aria-label="Projects">
        ${D.projects.map((p, i) => `<a href="#p-${p.slug}" data-jump="${i}" aria-label="${esc(p.title)}"><b>${esc(p.title)}</b></a>`).join('')}
      </nav>`;

    main.append(h(`<h1 class="sr">TRUCCO — Work</h1>${hero}${chapters}${index}`));
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
          <h1 class="proj__title">${mark(p)}</h1>
          <p class="proj__sub">${esc(p.kind)} · ${p.year}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <dl class="credits">${p.credits.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        </header>

        <div class="player" data-reveal>
          <video preload="auto" playsinline muted loop autoplay poster="${media(p.slug, 'full.jpg')}" src="${media(p.slug, 'full.mp4')}"></video>
          <button class="player__big" aria-label="Sound on"><span>Sound on</span><small>${p.duration}</small></button>
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
          <h1 class="proj__title">${mark(p)}</h1>
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
        <div class="contact__grid">
          <div class="contact__rows" data-reveal>
            <div>${ICON.mail}<p class="label">Email</p><a href="mailto:${D.email}">${D.email}</a></div>
            <div>${ICON.cal}<p class="label">Meeting</p><a href="${D.calendly}" target="_blank" rel="noopener">Book a meeting ${ARROW}</a></div>
            <div>${ICON.pin}<p class="label">Based in</p><p>${D.city} — working worldwide</p></div>
          </div>
          <form class="form" data-reveal>
            <label><span class="label">${ICON.user} Name</span><input name="name" required autocomplete="name"></label>
            <label><span class="label">${ICON.at} Email</span><input name="email" type="email" required autocomplete="email"></label>
            <label><span class="label">${ICON.text} Message</span><textarea name="message" rows="4" required></textarea></label>
            <button type="submit">Send ${ARROW}</button>
          </form>
        </div>
      </section>`));

    // sin servidor: el formulario arma el mail en el cliente de correo del visitante
    document.querySelector('.form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const subject = `TRUCCO — ${f.get('name')}`;
      const text = `${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}`;
      location.href = `mailto:${D.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    });
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
      // costuras entre proyectos: del final de una tira al comienzo de la siguiente.
      // Ahí no se scrollea libre: el primer gesto hace snap (ver "scroll suave").
      const y = (el) => el.getBoundingClientRect().top + scrollY;
      let prevEnd = 0;
      window.__seams = !wide.matches ? [] : chs.map((c) => {
        const seam = [prevEnd, y(c)];
        prevEnd = y(c) + c._dist;
        return seam;
      });
    };
    const chs = scenes.filter((s) => s.dataset.scene === 'chapter');
    const index = document.querySelector('.index');

    const update = () => {
      const vw = innerWidth, vh = innerHeight;
      scenes.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;

        if (s.dataset.scene === 'hero') {
          const p = clamp(-r.top / vh);
          s.style.setProperty('--hy', `${p * 30}vh`);
          s.style.setProperty('--hs', 1 + p * 0.08);
          s.style.setProperty('--fade', 1 - p * 0.85);
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

      // índice: marca el proyecto en pantalla
      let act = -1;
      chs.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) act = i; });
      index.classList.toggle('show', act >= 0);
      index.querySelectorAll('a').forEach((a, i) => a.classList.toggle('on', i === act));
    };

    // fuera de la tira y del logo, la rueda cambia de proyecto (con snap)
    const outside = (el) => wide.matches && el.closest('.chapter__stage') && !el.closest('.track, .chapter__head, .chapter__foot');
    document.addEventListener('pointerover', (e) => {
      chs.forEach((c) => c.classList.toggle('skip-zone', c.contains(e.target) && !!outside(e.target)));
    });
    addEventListener('wheel', (e) => {
      if (!window.__glide || !outside(e.target)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (window.__gliding() || Math.abs(e.deltaY) < 4) return;
      const i = chs.indexOf(e.target.closest('.chapter'));
      const to = chs[i + (e.deltaY > 0 ? 1 : -1)];
      window.__glide(to ? to.getBoundingClientRect().top + scrollY : (e.deltaY > 0 ? document.documentElement.scrollHeight : 0), 1.1);
    }, { capture: true, passive: false });

    // saltar de proyecto: índice y "Next project"
    document.addEventListener('click', (e) => {
      const j = e.target.closest('[data-jump]');
      const k = e.target.closest('[data-skip]');
      if (!j && !k) return;
      e.preventDefault();
      let target = 0;
      if (j) target = chs[+j.dataset.jump];
      else { const i = chs.indexOf(k.closest('.chapter')); target = chs[i + 1] || 0; }
      const top = target ? target.getBoundingClientRect().top + scrollY : 0;
      if (window.__lenis) window.__glide(top, 1.4);
      else scrollTo({ top, behavior: 'smooth' });
    });

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
      window.__lenis = lenis;

      // snap entre proyectos, con el mismo ease que el site de OHHH (easeInOutCubic)
      const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      let gliding = false;
      window.__gliding = () => gliding;
      window.__glide = (top, duration = 1.1) => {
        gliding = true;
        lenis.scrollTo(top, { duration, easing: inOut, lock: true, force: true, onComplete: () => { gliding = false; } });
      };
      lenis.on('scroll', ({ scroll, direction }) => {
        if (gliding || !direction) return;
        const seam = (window.__seams || []).find(([a, b]) => scroll > a + 2 && scroll < b - 2);
        if (seam) window.__glide(direction > 0 ? seam[1] : seam[0]);
      });
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
      cur.classList.toggle('cursor--on', !!(t && t.dataset.cursor));
      if (t && t.dataset.cursor) cur.querySelector('span').textContent = t.dataset.cursor;
      cur.classList.toggle('cursor--link', !(t && t.dataset.cursor) && !!e.target.closest('a, button'));
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
    const toggle = () => { player.classList.toggle('held', !v.paused); return v.paused ? v.play() : v.pause(); };
    const big = player.querySelector('.player__big');
    big.addEventListener('click', () => { v.muted = false; v.currentTime = 0; v.play(); });
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
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (v.paused && !player.classList.contains('held')) v.play().catch(() => {}); }
      else if (!v.paused) v.pause();
    }, { threshold: 0.15 }).observe(player);
    v.addEventListener('volumechange', () => player.classList.toggle('unmuted', !v.muted));
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
