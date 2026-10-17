#!/usr/bin/env bash
# Regenera los HTML (son todos iguales salvo data-page / data-slug / profundidad).
# Uso: bash tools/pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."

page() { # file depth(prefix) page slug title desc
  local f="$1" r="$2" pg="$3" slug="$4" title="$5" desc="$6"
  mkdir -p "$(dirname "$f")"
  cat > "$f" <<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#000000">
<link rel="icon" href="${r}assets/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${r}assets/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Geist+Mono:wght@300;400&family=Geist:wght@300;400&display=swap">
<link rel="stylesheet" href="${r}assets/css/site.css">
<script src="${r}assets/js/projects.js" defer></script>
<script src="${r}assets/js/main.js" defer></script>
</head>
<body data-page="${pg}"${slug:+ data-slug=\"$slug\"}>
<main></main>
<noscript><p style="padding:20vh 3vw;font-family:monospace">TRUCCO — creative group focused on branding &amp; audiovisual.</p></noscript>
</body>
</html>
HTML
}

D="TRUCCO — a creative and collaborative group focused on branding &amp; audiovisual."
page index.html          ""       work    ""        "TRUCCO — Creative Group" "$D"
page about/index.html    "../"    about   ""        "About — TRUCCO" "$D"
page contact/index.html  "../"    contact ""        "Contact — TRUCCO" "$D"
for s in paraiso wine sport fashion-week architecture audio; do
  page "work/$s/index.html" "../../" project "$s" "TRUCCO" "$D"
done
