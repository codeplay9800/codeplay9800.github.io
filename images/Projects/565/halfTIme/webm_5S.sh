#!/bin/bash
for f in *.webm; do
  # Trim video to first 5 seconds and save with _5s in name
  ffmpeg -y -i "$f" -t 3 -c:v libvpx-vp9 -crf 30 -b:v 0 "${f%.webm}_5s.webm"
done