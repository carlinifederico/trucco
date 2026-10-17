# TRUCCO — site

HTML, CSS y JS planos: sin build, sin dependencias. Lo que está en el repo es lo que se publica.

```
index.html                 Work: muro de fragmentos en loop
about/  contact/           About y Contact
work/<slug>/               una página por proyecto (6)
assets/js/projects.js      TODO el contenido: textos, créditos, proyectos, composición de la home
assets/js/main.js          arma las páginas desde projects.js + interacciones
assets/css/site.css        todo el diseño
assets/media/<slug>/       fragmentos, video completo, stills (generados)
tools/build-media.sh       genera assets/media desde los masters graduados (ffmpeg)
tools/pages.sh             regenera los HTML (todos son el mismo shell)
```

Los HTML no tienen contenido propio: `<body data-page="…" data-slug="…">` y `main.js` arma
la página. **Para cambiar cualquier texto se edita `assets/js/projects.js`.**

## Pendientes (todos en `projects.js`)

| Qué | Valor actual |
|---|---|
| Mail de contacto | `hello@trucco.studio` |
| Calendly ("Book a meeting") | `https://calendly.com/` |
| LinkedIn de Santiago | `https://www.linkedin.com/` |
| Proyectos 03–06 (Sport, Fashion Week, Architecture, High-End Audio) | placeholders grises |
| Textos de Paraíso y El Quebrado | borrador, revisar |

## Sumar / activar un proyecto

1. En `projects.js`, sacarle `placeholder: true` y completar los campos como en `paraiso`.
2. En `tools/build-media.sh`, agregar sus `frag`, `full` y `stills` (tiempos en segundos del master).
3. `bash tools/build-media.sh`
4. Si es un slug nuevo: agregarlo al loop de `tools/pages.sh` y correrlo.
5. Ubicar sus fragmentos en `landing` (grilla de 24 columnas: `c` inicio, `w` ancho, `y` desplazamiento).

## Ver local

```bash
npx http-server -p 8765 -c-1
```

## Dominio

Para servir en **trucco.studio**: crear un archivo `CNAME` con `trucco.studio`, apuntar el DNS
(A → IPs de GitHub Pages, o CNAME `www` → `carlinifederico.github.io`) y activarlo en
Settings → Pages. No agregar el `CNAME` antes de que el DNS apunte, o el site deja de verse.
