#!/usr/bin/env bash
# Genera todos los medios del site desde los masters graduados.
# Uso (desde la raíz del repo):  bash tools/build-media.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJ="$ROOT/../PROJECTS"
WINE="$PROJ/2 - WINE/OUTPUT/TRC_Wine_004_grade_v1_H264.mp4"
PARAISO="$PROJ/1 - VIDEOCLIP/OUTPUT/PARAISO_EDIT8_grade_v1_H264.mp4"
OUT="$ROOT/assets/media"

# fragmento: loop corto, sin audio, 1280 de ancho
frag() { # src slug n start dur
  local o="$OUT/$2/frag-$3"
  ffmpeg -v error -y -ss "$4" -i "$1" -t "$5" -an -c:v libx264 -crf 27 -preset slow \
    -pix_fmt yuv420p -vf "scale=1280:-2" -movflags +faststart "$o.mp4"
  ffmpeg -v error -y -ss "$(awk "BEGIN{print $4+0.4}")" -i "$1" -frames:v 1 \
    -vf "scale=1280:-2" -q:v 5 "$o.jpg"
}

# video completo: con audio, 1920
full() { # src slug poster_t
  ffmpeg -v error -y -i "$1" -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart "$OUT/$2/full.mp4"
  ffmpeg -v error -y -ss "$3" -i "$1" -frames:v 1 -q:v 4 "$OUT/$2/full.jpg"
}

# stills: frames graduados, 1920 + thumb 900
stills() { # src slug t1 t2 ...
  local src="$1" slug="$2" i=1; shift 2
  for t in "$@"; do
    local n; n=$(printf "%02d" $i)
    ffmpeg -v error -y -ss "$t" -i "$src" -frames:v 1 -q:v 3 "$OUT/$slug/still-$n.jpg"
    ffmpeg -v error -y -ss "$t" -i "$src" -frames:v 1 -vf "scale=900:-2" -q:v 4 "$OUT/$slug/still-$n-s.jpg"
    i=$((i+1))
  done
}

mkdir -p "$OUT/wine" "$OUT/paraiso"

frag "$WINE" wine 1 1.17  2.6
frag "$WINE" wine 2 12.9  4.2
frag "$WINE" wine 3 29.95 3.05
frag "$WINE" wine 4 41.87 2.65
frag "$WINE" wine 5 48.87 3.75
frag "$WINE" wine 6 56.5  4.0

frag "$PARAISO" paraiso 1 1.33  2.55
frag "$PARAISO" paraiso 2 5.04  2.1
frag "$PARAISO" paraiso 3 12.04 2.5
frag "$PARAISO" paraiso 4 17.12 3.42
frag "$PARAISO" paraiso 5 20.62 3.18
frag "$PARAISO" paraiso 6 25.17 2.0
frag "$PARAISO" paraiso 7 27.25 1.75
frag "$PARAISO" paraiso 8 29.08 3.8

full "$WINE" wine 1.8
full "$PARAISO" paraiso 2.5

stills "$WINE" wine 1.8 5.5 13.5 18.9 25.5 31.5 35.6 43 47.5 51 54.5 58.5
stills "$PARAISO" paraiso 0.6 2.5 5.3 9 12.3 13 18 22.5 25.6 28 30 31.8

ls -la "$OUT"/*
