import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Fade, Slide, Zoom } from 'react-reveal';
import CallToActionWithIllustration from '../components/home/carousel';
import Tutorial from '../components/home/tutorial';
import HomeCard from '../components/home/homeCard';

const Home = () => {
  const tutorialRef = useRef(null);
  const homeCardRef = useRef(null);

  const handleGetStartedClick = () => {
    homeCardRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const handleLearnMoreClick = () => {
    tutorialRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <Box>
      <Fade>
        <CallToActionWithIllustration handleGetStartedClick={handleGetStartedClick} handleLearnMoreClick={handleLearnMoreClick}/>
      </Fade>
      <Fade animateOnce={false}>
        <Tutorial ref={tutorialRef}/>
      </Fade>
      <Slide up animateOnce={false}>
        <HomeCard ref={homeCardRef}/>
      </Slide>
    </Box>
  );
};

export default Home;
