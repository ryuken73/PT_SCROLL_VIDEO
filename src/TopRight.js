import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
  opacity: 0.3;
`
const ToggleDirection = styled.div`
  font-family: monospace;
  font-size: 15;
  font-weight: bold;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
`
const ToggleLength = styled(ToggleDirection)` `

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
  const {options, setOptions} = props;
  const {
    length,
    direction,
    useWebCodecs,
    transitionSpeed
  } = options;
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
  const directionString = direction === 'v' ? 'VRT' : 'HRZ';
  const lengthString = length === FAST ? 'FAST' : 
    length === NORMAL ? 'NORM' : 'SLOW';
  return (
    <Container>
      <ToggleLength
        id="length"
        onClick={toggleOptions}
      >
        {lengthString}
      </ToggleLength>
      <ToggleDirection
        id="direction"
        onClick={toggleOptions}
      >
        {directionString}
      </ToggleDirection>
    </Container>
  )
}

export default React.memo(TopRight)