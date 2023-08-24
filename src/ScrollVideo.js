import React from 'react'
import ScrollyVideoV from 'scrolly-video/dist/ScrollyVideo.esm.jsx';
import ScrollyVideoH from './scrolly/src/ScrollyVideo.jsx';

const ScrollyVideo = (props) => {
  return props.direction === 'v' ? 
    <ScrollyVideoV {...props} /> :
    <ScrollyVideoH {...props} />
}

function ScrollVideo(props) {
  return (
    <ScrollyVideo {...props}></ScrollyVideo>
  )
}

export default React.memo(ScrollVideo)
