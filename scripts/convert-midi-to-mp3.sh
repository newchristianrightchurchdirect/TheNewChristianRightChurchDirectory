#!/usr/bin/env bash
# Convert all .mid files under a directory to .mp3 using fluidsynth + ffmpeg.
# Writes everything to /tmp first (Linux-native, fast) then bulk-moves MP3s back.
#
# Usage (from WSL):
#   bash convert-midi-to-mp3.sh /mnt/c/.../public/hymnal-media/bpw-audio

set -u

DIR="${1:-}"
SOUNDFONT="${SOUNDFONT:-/usr/share/sounds/sf2/FluidR3_GM.sf2}"
BITRATE="${BITRATE:-64k}"
GAIN="${GAIN:-1.0}"
JOBS="${JOBS:-4}"
WORKDIR="/tmp/midi2mp3.work.$$"

if [ -z "$DIR" ] || [ ! -d "$DIR" ]; then
  echo "Usage: $0 <directory-with-mid-files>" >&2
  exit 1
fi
mkdir -p "$WORKDIR"
trap 'rm -rf "$WORKDIR"' EXIT

# Collect list of files needing conversion (no existing .mp3 in DIR).
LIST="$WORKDIR/list"
: > "$LIST"
for mid in "$DIR"/*.mid "$DIR"/*.midi; do
  [ -f "$mid" ] || continue
  base="$(basename "$mid")"
  stem="${base%.*}"
  if [ -s "$DIR/$stem.mp3" ]; then continue; fi
  echo "$mid" >> "$LIST"
done

TOTAL=$(wc -l < "$LIST")
echo "Need to convert: $TOTAL files (with $JOBS parallel workers)"
if [ "$TOTAL" -eq 0 ]; then exit 0; fi

convert_one() {
  local mid="$1"
  local base stem wav mp3
  base="$(basename "$mid")"
  stem="${base%.*}"
  wav="$WORKDIR/$stem.wav"
  mp3="$WORKDIR/$stem.mp3"
  if ! fluidsynth -ni -g "$GAIN" -T wav -F "$wav" "$SOUNDFONT" "$mid" >/dev/null 2>&1; then
    echo "FLUID_FAIL $mid" >&2; return 1
  fi
  if [ ! -s "$wav" ]; then
    echo "FLUID_EMPTY $mid" >&2; return 1
  fi
  if ! ffmpeg -hide_banner -loglevel error -i "$wav" \
      -codec:a libmp3lame -b:a "$BITRATE" -ac 1 -y "$mp3" </dev/null 2>/dev/null; then
    echo "FFMPEG_FAIL $mid" >&2; rm -f "$wav"; return 1
  fi
  rm -f "$wav"
  if [ ! -s "$mp3" ]; then
    echo "MP3_EMPTY $mid" >&2; return 1
  fi
  echo "OK $stem"
}
export -f convert_one
export SOUNDFONT BITRATE GAIN WORKDIR

cat "$LIST" | xargs -P "$JOBS" -I {} bash -c 'convert_one "$@"' _ {} \
  > "$WORKDIR/results.log" 2>&1

OK_COUNT=$(grep -c '^OK ' "$WORKDIR/results.log" || true)
FAIL_COUNT=$(grep -cv '^OK ' "$WORKDIR/results.log" || true)
echo "Conversions: $OK_COUNT ok, $FAIL_COUNT failures"

echo "Moving MP3s to $DIR ..."
MOVED=0
for mp3 in "$WORKDIR"/*.mp3; do
  [ -f "$mp3" ] || continue
  mv -f "$mp3" "$DIR/"
  MOVED=$((MOVED + 1))
done
echo "Moved $MOVED files."
echo "Done."
