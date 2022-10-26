import React, { ReactNode } from 'react';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface SliderProps {
  children: ReactNode;
}

const Slider = ({ children }: SliderProps) => {
  return (
    <Container>
      <StyledSlider {...settings}>{children}</StyledSlider>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const StyledSlider = styled(SlickSlider)`
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

export default Slider;
