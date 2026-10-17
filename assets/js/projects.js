/* ───────────────────────────────────────────────────────────────
   TRUCCO — todo el contenido del site vive acá.
   Cambiar un texto, sumar un proyecto o reemplazar un placeholder
   es editar este archivo: las páginas se arman solas desde estos datos.
   ─────────────────────────────────────────────────────────────── */

window.TRUCCO = {

  // TODO: mail y Calendly definitivos
  email: 'hello@trucco.studio',
  calendly: 'https://calendly.com/',
  city: 'Buenos Aires',

  people: [
    {
      name: 'Santiago Tereso',
      role: 'Executive Producer',
      // TODO: URL real del LinkedIn de Santiago
      link: { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    },
    {
      name: 'Federico Carlini',
      role: 'Creative Director',
      link: { label: 'federicocarlini.com', href: 'https://federicocarlini.com' },
    },
  ],

  /* Los 6 proyectos, en orden. `placeholder: true` = bloque gris "add info here".
     Para activar uno: sacarle `placeholder`, completar los campos como en
     paraiso/wine y generar sus medios con tools/build-media.sh. */
  projects: [
    {
      slug: 'paraiso',
      title: 'Paraíso',
      logo: 'assets/logos/paraiso.png',
      kind: 'Music video',
      year: '2026',
      tags: ['Music', 'Festival', 'AI film'],
      credits: [
        ['Client', 'Paraíso — Ambient Music Festival'],
        ['Creative direction', 'Federico Carlini'],
        ['Executive production', 'Santiago Tereso'],
        ['Production', 'TRUCCO'],
      ],
      intro: 'A sensorial film for Paraíso, an ambient music festival. Touch, and the encounter of textures that should never meet — skin, feather, thorn, coral — held together by a constant red. Intimate, uncomfortable, surreal.',
      acts: [
        ['Awakening', 'A flamingo and a body share the same breath.'],
        ['Touch', 'Fingers against thorns. Lips against coral.'],
        ['Desire', 'Feathers spill from a mouth; the peacock opens its eyes.'],
        ['Revelation', 'Everything turns red.'],
      ],
      duration: '00:39',
      stills: 12,
    },
    {
      slug: 'wine',
      title: 'El Quebrado',
      logo: 'assets/logos/wine.png',
      kind: 'Wine brand film',
      year: '2026',
      tags: ['Wine', 'Branding', 'AI film'],
      credits: [
        ['Client', 'El Quebrado'],
        ['Creative direction', 'Federico Carlini'],
        ['Executive production', 'Santiago Tereso'],
        ['Production', 'TRUCCO'],
      ],
      intro: 'From the peak to the glass. A film for El Quebrado about drinking history: the first light on the mountain, the thaw, the vine, and a feast that began with the Romans and never quite ended — until it is poured today.',
      acts: [
        ['Origin', 'Sunrise on the peak. Snow becomes water, water becomes earth.'],
        ['Rite', 'Grapes held up to the sky.'],
        ['Feast', 'An ancient table, still going.'],
        ['The wine', 'Cork, glass, bottle. Today.'],
      ],
      duration: '01:07',
      stills: 12,
    },
    { slug: 'sport',        title: 'Sport',          kind: 'Opening ceremony', placeholder: true,
      mark: '<svg viewBox="0 0 720 200" fill="currentColor" aria-hidden="true"><circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="5"/><line x1="100" y1="20" x2="100" y2="180" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="100" cy="100" r="24" fill="none" stroke="currentColor" stroke-width="5"/><text x="214" y="126" font-family="Geist" font-weight="800" font-size="104" letter-spacing="-4">ARENA</text><text x="220" y="168" font-family="Geist Mono" font-size="19" letter-spacing="7">OPENING CEREMONY</text></svg>' },
    { slug: 'fashion-week', title: 'Fashion Week',   kind: 'Fashion',          placeholder: true,
      mark: '<svg viewBox="0 0 720 200" fill="currentColor" aria-hidden="true"><rect x="22" y="22" width="156" height="156" fill="none" stroke="currentColor" stroke-width="5"/><text x="100" y="128" text-anchor="middle" font-family="Cinzel" font-size="78">FW</text><text x="212" y="126" font-family="Geist" font-weight="300" font-size="100" letter-spacing="4">SEMANA</text><text x="218" y="168" font-family="Geist Mono" font-size="19" letter-spacing="7">FASHION WEEK</text></svg>' },
    { slug: 'architecture', title: 'Architecture',   kind: 'Space',            placeholder: true,
      mark: '<svg viewBox="0 0 720 200" fill="currentColor" aria-hidden="true"><rect x="22" y="22" width="118" height="118" fill="none" stroke="currentColor" stroke-width="5"/><rect x="62" y="62" width="118" height="118"/><text x="214" y="126" font-family="Geist" font-weight="300" font-size="100" letter-spacing="22">VACÍO</text><text x="220" y="168" font-family="Geist Mono" font-size="19" letter-spacing="7">ARCHITECTURE · SPACE</text></svg>' },
    { slug: 'audio',        title: 'High-End Audio', kind: 'Product',          placeholder: true,
      mark: '<svg viewBox="0 0 720 200" fill="currentColor" aria-hidden="true"><circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="100" cy="100" r="8"/><text x="214" y="126" font-family="Geist Mono" font-weight="400" font-size="100" letter-spacing="6">ÉTER</text><text x="220" y="168" font-family="Geist Mono" font-size="19" letter-spacing="7">HIGH-END AUDIO</text></svg>' },
  ],

  /* Composición de la home.
     hero: el fragmento que abre (se expande de ventana a pantalla completa).
     chapters: un capítulo por proyecto; `frags` = fragmentos en el orden en que pasan.
     Los proyectos placeholder se listan solos al final. */
  landing: {
    hero: { p: 'paraiso', f: 1 },
    chapters: [
      { p: 'paraiso', frags: [4, 2, 5, 8, 6, 7, 3] },
      { p: 'wine', frags: [1, 2, 3, 4, 5, 6] },
    ],
  },
};
