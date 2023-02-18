# command to convert from normal mp4 to I-frame only mp4 
ffmpeg -i original.mp4 -c:v libx264 -x264-params keyint=1 original_I.mp4