import React from 'react';
import { styled } from '@mui/system';

const BackgroundContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const GradientBackground = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #004AAD, #9a00e0);
  background-size: 600% 600%;
  animation: animateGradient 10s ease infinite;

  @keyframes animateGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Background = () => {
  return (
    <BackgroundContainer>
      <GradientBackground />
    </BackgroundContainer>
  );
};

export default Background;
