import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Harrow } from './images/h-arrow.svg'
import { ReactComponent as Varrow } from './images/v-arrow.svg'

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: ${props => props.show ? '10px' : '-135px'};
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  opacity: 0.5;
  transition: all 1s;
`
const Dragger = styled.div`
  border-radius: 10px;
  width: 20px;
  background: white !important;
  height: 20px;
  margin-right: 5px;
  opacity: 0.2
`
const ToggleDirection = styled.div`
  font-family: monospace;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
`
const ToggleLength = styled(ToggleDirection)` `
const WebCodecEnabled = styled(ToggleDirection)`
  height: 100%;
`

const FAST = 150;
const NORMAL = 250;
const SLOW = 400;

const getNextValue = (key, currentValue) => {
  if(key === 'direction'){
    return currentValue === 'h' ? 'v' : 'h';
  }
  if(key === 'length'){
    return currentValue === FAST ? NORMAL : 
      currentValue === NORMAL ? SLOW : FAST;
  }
}

function TopRight(props) {
  const {
    options, 
    setOptions, 
    direction,
    saveDirection,
    webCodecEnabled
  } = props;
  const {
    length,
    useWebCodecs,
    transitionSpeed
  } = options;
  const [currentDirection, setCurrentDirection] = React.useState(direction);
  const [show, setShow] = React.useState(false);

  const toggleDirection = React.useCallback(() => {
    const nextDirection = getNextValue('direction', currentDirection);
    const reply = window.confirm('Need to reload to apply change. Reload OK?')
    if(reply){
      setCurrentDirection(nextDirection);
      saveDirection(nextDirection);
      window.location.reload();
    }
  }, [currentDirection, saveDirection])

  const toggleOptions = React.useCallback((event) => {
    const key = event.target.id;
    setOptions(options => {
      const currentValue = options[key];
      const nextValue = getNextValue(key, currentValue);
      return {
        ...options,
        [key]: nextValue
      }
    })
  }, [setOptions])

  const toggleShow = React.useCallback((event) => {
    setShow(show => !show)
  }, [])
 
  const directionString = direction === 'v' ? 'VRT' : 'HRZ';
  const DirectionSvg = direction === 'v' ? Varrow : Harrow;
  const lengthString = length === FAST ? 'FAST' : 
    length === NORMAL ? 'NORM' : 'SLOW';
  const webCodecString = webCodecEnabled ? 'HQ':'LQ';
  return (
    // <Draggable bounds={{right:100}}>
      <Container show={show}>
        <Dragger
          onClick={toggleShow}
        ></Dragger>
        <WebCodecEnabled
          webCodecEnabled={webCodecEnabled}
        >
          {webCodecString}
        </WebCodecEnabled>
        <ToggleLength
          id="length"
          onClick={toggleOptions}
        >
          {lengthString}
        </ToggleLength>
        <ToggleDirection
          id="direction"
          onClick={toggleDirection}
        >
          {directionString}
        </ToggleDirection>
      </Container>
    // {/* </Draggable> */}
  )
}

export default React.memo(TopRight)