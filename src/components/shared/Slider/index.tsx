import React, { forwardRef, ReactNode, Ref, useRef } from 'react';
import SlickSlider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';

const settings: Settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  infinite: false,
};

interface SliderProps {
  children: ReactNode;
}

const Slider = ({ children }: SliderProps, ref: Ref<SlickSlider>) => {
  return (
    <Container>
      <SlickSlider {...settings} ref={ref}>
        {children}
      </SlickSlider>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .slick-list {
    width: calc(100% - 3rem);
    margin: 0 auto;
  }
  .slick-prev {
    left: 0;
    &:before {
      color: black;
    }
  }
  .slick-next {
    right: 0;
    &:before {
      color: black;
    }
  }
  .slick-dots {
    li {
      margin: 0;
    }
  }
`;

export default forwardRef(Slider);
