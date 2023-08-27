import React from 'react';
import styled from 'styled-components';

const START_TOP = '95%';
const WIDTH = '30%'
const STEP_WIDTH = '10px';
const STEP_HEIGHT = '20px';

const Container = styled.div`
  position: fixed;
  top: ${START_TOP};
  right: 10px;
  font-size: 30px;
  z-index: 10;
  height: ${STEP_HEIGHT};
  width: ${WIDTH};
  opacity: 0.4; 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: transparent;
`
const Step = styled.div`
  width: ${STEP_WIDTH};
  height: ${STEP_HEIGHT};
  opacity: ${props => props.highlight ? 1 : 0.2};
  background: white;
  transition: all 0.5s;
  z-index: 11;
  transform: ${props => props.start ? "translateX(-10px)" : props.end ? "translateX(10px)": "0px"};
`
const CurrentPercentage = styled.div`
  position: absolute;
  right: 0px;
  height: 20px;
  width: ${props => `${props.percentage}%`};
  opacity: 1;
  background: yellow;
  bottom: 0px;
  z-index: 9;
  display: flex;
`
const StyledSpan = styled.div`
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  width: auto;
  display: ${props => (props.percentage === 0 || props.percentage > 99) && 'none'};
  align-self: flex-end;
  margin-left: 5px;
`

function HorizontalPercentage(props) {
  const {percentage} = props;
  return (
    <Container>
      <Step start highlight={percentage === 100}></Step>
      <Step highlight={percentage === 50} ></Step>
      <CurrentPercentage percentage={percentage}>
        <StyledSpan percentage={percentage}>
          {percentage}
        </StyledSpan>
      </CurrentPercentage>
      <Step end highlight={percentage === 0}></Step>
    </Container>
  )
}

export default React.memo(HorizontalPercentage)