import React from 'react';
import styled from 'styled-components';
import VerticalPercentage from './VerticalPercentage';
import HorizontalPercentage from './HorizontalPercentage';

const Container = styled.div``


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

function PercentageContainer(props) {
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
    <Container>
      {direction === 'v' ? (
        <VerticalPercentage
          percentage={percentage}
        ></VerticalPercentage>
      ):(
        <HorizontalPercentage
          percentage={percentage}
        ></HorizontalPercentage>
      )}
    </Container>
  )
}

export default React.memo(PercentageContainer);