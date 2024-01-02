import React from 'react';
import ScrollVideo from './ScrollVideo';
import Percentage from './Percentage';
import PercentageContainer from './PercentageContainer';
import TopRight from './TopRight';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
// import { useLocalStorage } from '@uidotdev/usehooks'
import useLocalStorage from './hooks/useLocalStorage';

const Container = styled.div` `
const DEFAULT_URL = "https://scrollyvideo.js.org/goldengate.mp4"
const INITIAL_OPTIONS = {
  // useWebCodecs: false,
  transitionSpeed: 100,
  length: 150,
}
const INITIAL_DIRECTION = 'h';

const FULL_W_H = 100;
// const HEIGHT_FOR_H = 100;

function App() {
  const [options, setOptions] = React.useState(INITIAL_OPTIONS);
  const [webCodecEnabled, setWebCodecEnabled] = React.useState(false);
  const [direction, saveDirection] = useLocalStorage('SBS-Scolly', INITIAL_DIRECTION);
  const [percentage, setPercentage] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const mp4Url = searchParams.get('url') || DEFAULT_URL;
  const {
    length,
    transitionSpeed
  } = options;

  const height = direction === 'h' ? FULL_W_H : length;
  const width = direction === 'h' ? length : FULL_W_H;
  React.useEffect(() => {
    if (typeof VideoDecoder === 'function' && typeof EncodedVideoChunk === 'function') {
      setWebCodecEnabled(true);
    }
  }, [])
  const useWebCodecs = JSON.parse(searchParams.get('smooth')) || false;
  // const direction = searchParams.get('direction') || 'h';
  // const transitionSpeed = searchParams.get('transition') || 100;
  console.log(mp4Url, direction, useWebCodecs, typeof(useWebCodecs), height, transitionSpeed)
  return (
    // <Container style={{ height: `${height}vh`, width: '800vw' }}>
    <Container style={{ height: `${height}vh`, width: `${width}vw` }}> 
      <TopRight
        options={options}
        direction={direction}
        setOptions={setOptions}
        saveDirection={saveDirection}
        webCodecEnabled={webCodecEnabled}
      ></TopRight>
      <PercentageContainer
        direction={direction}
        percentage={percentage}
        setPercentage={setPercentage}
      ></PercentageContainer>
      <ScrollVideo
        direction={direction}
        src={mp4Url} 
        useWebCodecs={useWebCodecs} 
        transitionSpeed={transitionSpeed}
        frameThreshold={0.1}
        debug={false}
      />
    </Container>
  );
}

export default App;