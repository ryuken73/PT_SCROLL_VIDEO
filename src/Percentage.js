import React from 'react'
import styled from 'styled-components'

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
  display: flex;
`
const StyledSpan = styled.span`
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  align-self: flex-end;
  width: 100%;
  display: ${props => props.percentage > 95 && 'none'};
`
const StartPercent = styled.div`
  position: fixed;
  top: calc(${START_TOP} + ${MAX_HEIGHT}px);
  right: 10px;
  z-index: 9999;
  width: 20px;
  height: 10px;
  opacity: ${props => props.percentage === 0 ? 1 : 0.2};
  background: white;
  transition: all 0.5s;
`
const MaxPercent = styled(StartPercent)`
  top: ${START_TOP};
  opacity: ${props => props.percentage === 100 ? 1 : 0.2};
`
const MiddlePercent = styled(StartPercent)`
  top: calc(${START_TOP} + ${MAX_HEIGHT/2}px);
  opacity: ${props => props.percentage > 40 && props.percentage < 60 ? 1 : 0.2};
`
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

function Percentage(props) {
  const {percentage, setPercentage, direction} = props;
  const handleScroll = React.useCallback((event) => {
    const percent = getScrollPercentage(direction);
    setPercentage(percent);
    console.log('scroll event:', window.scrollX, window.scrollY, getScrollPercentage());
  }, [direction, setPercentage])

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  return (
    <div>
      <CurrentPercent percentage={percentage}>
        <StyledSpan 
          percentage={percentage}
        >
          {percentage}
        </StyledSpan>
      </CurrentPercent>
      <StartPercent percentage={percentage} />
      <MiddlePercent percentage={percentage} />
      <MaxPercent percentage={percentage} />
    </div>
  )
}

export default React.memo(Percentage)