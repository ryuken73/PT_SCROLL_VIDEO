// import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs.jsx';
import ScrollyVideo from './scrolly/src/ScrollyVideo.jsx';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const Container = styled.div`
`
const DEFAULT_URL = "https://scrollyvideo.js.org/goldengate.mp4"

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mp4Url = searchParams.get('url') || DEFAULT_URL;
  const useWebCodecs = JSON.parse(searchParams.get('smooth')) || false;
  const height = searchParams.get('length') || 800;
  const transitionSpeed = searchParams.get('transition') || 10;
  console.log(mp4Url, useWebCodecs, typeof(useWebCodecs), height, transitionSpeed)
  return (
    // <Container style={{ height: `${height}vh`, width: '800vw' }}>
    <Container style={{ height: `${height}vh`, width: '200vw' }}>
      <ScrollyVideo 
        src={mp4Url} 
        useWebCodecs={true} 
        transitionSpeed={transitionSpeed}
        frameThreshold={0.1}
        debug={false}
      />
    </Container>
  );
}

export default App;