import React from 'react';
import styled from 'styled-components';

const START_TOP = '30%';
const HEIGHT = '30%';

const Container = styled.div`
  position: fixed;
  top: ${START_TOP};
  right: 10px;
  font-size: 30px;
  z-index: 10;
  width: 20px;
  opacity: 0.4; 
  height: ${HEIGHT};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Step = styled.div`
  width: 20px;
  height: 10px;
  opacity: ${props => props.highlight ? 1 : 0.2};
  background: white;
  transition: all 0.5s;
  z-index: 11;
  transform: ${props => props.start ? "translatey(-10px)" : props.end ? "translatey(0px)": "0px"};
`
const CurrentPercentage = styled.div`
  position: absolute;
  bottom: 100px;
  width: 20px;
  height: ${props => `${props.percentage}%`};
  opacity: 1;
  background: yellow;
  bottom: 0px;
  z-index: 9;
`
const StyledSpan = styled.div`
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  display: ${props => props.percentage > 99 && 'none'};
`

function VerticalPercentage(props) {
  const {percentage} = props;
  return (
    <Container>
      <Step start highlight={percentage === 100}></Step>
      <Step highlight={percentage === 50}></Step>
      <CurrentPercentage percentage={percentage}>
        <StyledSpan percentage={percentage}>
          {percentage}
        </StyledSpan>
      </CurrentPercentage>
      <Step end highlight={percentage === 0}></Step>
    </Container>
  )
}

export default React.memo(VerticalPercentage);