#!/bin/bash
for f in *.webm; do
  # Get duration in seconds (as float)
  DURATION=$(ffprobe -v error -select_streams v:0 -show_entries format=duration -of csv="p=0" "$f")
  
  # Calculate half the time using bc (float division)
  HALFTIME=$(echo "$DURATION / 2" | bc -l)
  
  # Trim the video to half duration and save with _halfT suffix
  ffmpeg -y -i "$f" -t "$HALFTIME" -c:v libvpx-vp9 -crf 30 -b:v 0 "${f%.webm}_halfT.webm"
done