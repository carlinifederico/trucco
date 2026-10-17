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
  timezone: 'America/Argentina/Buenos_Aires',

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
      frags: [
        { t: '00:00:01:08' }, { t: '00:00:05:01' }, { t: '00:00:12:01' }, { t: '00:00:17:03' },
        { t: '00:00:20:15' }, { t: '00:00:25:04' }, { t: '00:00:27:06' }, { t: '00:00:29:02' },
      ],
      stills: 12,
    },
    {
      slug: 'wine',
      title: 'El Quebrado',
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
      frags: [
        { t: '00:00:01:04' }, { t: '00:00:12:22' }, { t: '00:00:29:23' },
        { t: '00:00:41:21' }, { t: '00:00:48:21' }, { t: '00:00:56:12' },
      ],
      stills: 12,
    },
    { slug: 'sport',        title: 'Sport',          kind: 'Opening ceremony', placeholder: true },
    { slug: 'fashion-week', title: 'Fashion Week',   kind: 'Fashion',          placeholder: true },
    { slug: 'architecture', title: 'Architecture',   kind: 'Space',            placeholder: true },
    { slug: 'audio',        title: 'High-End Audio', kind: 'Product',          placeholder: true },
  ],

  /* Composición de la home. Cada fila es una lista de bloques sobre una grilla
     de 24 columnas: c = columna de inicio, w = ancho en columnas, y = desplazamiento
     vertical (en % del ancho). `f` = número de fragmento, `ph` = placeholder,
     `cap` = muestra "watch full project here". */
  landing: [
    [{ p: 'paraiso', f: 1, c: 2, w: 22 }],
    [{ p: 'paraiso', f: 4, c: 2, w: 12 }, { p: 'paraiso', f: 2, c: 16, w: 8, y: 6 }],
    [{ p: 'paraiso', f: 5, c: 8, w: 15, cap: true }],
    [{ p: 'wine', f: 1, c: 1, w: 17 }],
    [{ p: 'wine', f: 5, c: 3, w: 8, y: 4 }, { p: 'wine', f: 2, c: 13, w: 11 }],
    [{ p: 'wine', f: 6, c: 6, w: 16, cap: true }],
    [{ ph: 'sport', c: 2, w: 10 }, { ph: 'fashion-week', c: 15, w: 9, y: 5 }],
    [{ p: 'paraiso', f: 8, c: 4, w: 13 }, { p: 'paraiso', f: 6, c: 18, w: 6, y: 9 }],
    [{ ph: 'architecture', c: 9, w: 13 }],
    [{ p: 'wine', f: 4, c: 2, w: 9, y: 3 }, { p: 'wine', f: 3, c: 12, w: 12, cap: true }],
    [{ ph: 'audio', c: 3, w: 14 }],
    [{ p: 'paraiso', f: 7, c: 14, w: 10, cap: true }],
  ],
};
