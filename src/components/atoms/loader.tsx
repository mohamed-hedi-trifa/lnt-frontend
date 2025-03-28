import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    justify-content: center;
  }

  .bar {
    width: 7px;
    height: 18px;
    margin: 0 9px;
    border-radius: 10px;
    animation: loading_5192 1s ease-in-out infinite;
    background: linear-gradient(to right, #51ADC6, #006E9F);
  }

  .bar:nth-child(1) {
    animation-delay: 0.01s;
  }

  .bar:nth-child(2) {
    animation-delay: 0.09s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.19s;
  }

  .bar:nth-child(4) {
    animation-delay: 0.29s;
  }

  @keyframes loading_5192 {
    0% {
      transform: scale(1);
    }

    20% {
      transform: scale(1, 2.5);
    }

    40% {
      transform: scale(1);
    }
  }`;

export default Loader;
