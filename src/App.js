import React from 'react';
import ScrollVideo from './ScrollVideo';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const Container = styled.div`
`
const Percentage = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: white;
  z-index: 9999;
`
const START_TOP = '30%';
const MAX_HEIGHT = 300;

const CurrentPercent = styled.div`
  position: fixed;
  top: ${START_TOP};
  right: 10px;
  font-size: 30px;
  color: white;
  /* transform: ${props => `translateY(-${props.percentage*3}px)`}; */
  z-index: 9999;
  width: 20px;
  height: ${props => `${MAX_HEIGHT - props.percentage*(MAX_HEIGHT)/100}px`};
  background: yellow;
  opacity: 0.2; 
  transform: rotate(180);
`
const MaxPercent = styled.div`
  position: fixed;
  top: calc(${START_TOP} + ${MAX_HEIGHT}px);
  right: 10px;
  z-index: 9999;
  width: 20px;
  height: 10px;
  opacity: 0.2; 
  background: white;
`
const StartPercent = styled(MaxPercent)`
  top: ${START_TOP};
`
const MiddlePercent = styled(MaxPercent)`
  top: calc(${START_TOP} + ${MAX_HEIGHT/2}px);
`
const DEFAULT_URL = "https://scrollyvideo.js.org/goldengate.mp4"
const getScrollPercentage = (direction) => {
  const scroll = direction === 'v' ? 
    document.documentElement.scrollTop :
    document.documentElement.scrollLeft;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollWidth = document.documentElement.scrollWidth;
  const clientWidth = document.documentElement.clientWidth;
  const viewport = direction === 'v' ?
    scrollHeight - clientHeight :
    scrollWidth - clientWidth; 
  const percentage = (scroll / viewport) * 100;

  return Math.floor(percentage);
};

function App() {
  const [percentage, setPercentage] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const mp4Url = searchParams.get('url') || DEFAULT_URL;
  const useWebCodecs = JSON.parse(searchParams.get('smooth')) || false;
  const direction = searchParams.get('direction') || 'h';
  const height = direction === 'h' ? 300 : searchParams.get('length') || 800;
  const width = direction === 'v' ? 100 : searchParams.get('length') || 300;
  const transitionSpeed = searchParams.get('transition') || 100;
  const handleScroll = React.useCallback((event) => {
    const percent = getScrollPercentage(direction);
    setPercentage(percent);
    console.log('scroll event:', window.scrollX, window.scrollY, getScrollPercentage());
  }, [])

  console.log(mp4Url, useWebCodecs, typeof(useWebCodecs), height, transitionSpeed)
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  return (
    // <Container style={{ height: `${height}vh`, width: '800vw' }}>
    <Container style={{ height: `${height}vh`, width: `${width}vw` }}> 
      <Percentage>
        {percentage}
      </Percentage>
      <CurrentPercent percentage={percentage} />
      <StartPercent />
      <MiddlePercent />
      <MaxPercent />
      <ScrollVideo
        direction={direction}
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