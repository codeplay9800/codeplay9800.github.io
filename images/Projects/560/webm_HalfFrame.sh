for f in *.webm; do 
	ffmpeg -i "$f" -vf "select=not(mod(n\,2))" -vsync vfr -c:v libvpx-vp9 -crf 30 -b:v 0 "${f%.webm}_red.webm"; 
done