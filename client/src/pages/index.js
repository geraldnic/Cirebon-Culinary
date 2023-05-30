import React, { useRef, useState, useEffect } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { Fade, Slide, Zoom } from 'react-reveal';
import CallToActionWithIllustration from '../components/home/carousel';
import Tutorial from '../components/home/tutorial';
import HomeCard from '../components/home/homeCard';

const Home = () => {
  const tutorialRef = useRef(null);
  const homeCardRef = useRef(null);

  const handleGetStartedClick = () => {
    homeCardRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMoreClick = () => {
    tutorialRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Center position="relative" height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
            position="absolute"
            top="30%"
            transform="translateY(-50%)"
            margin="0"
          />
        </Center>
      ) : (
        <Box>
          <Fade>
            <CallToActionWithIllustration
              handleGetStartedClick={handleGetStartedClick}
              handleLearnMoreClick={handleLearnMoreClick}
            />
          </Fade>
          <Fade animateOnce={false}>
            <Tutorial ref={tutorialRef} />
          </Fade>
          <Slide up animateOnce={false}>
            <HomeCard ref={homeCardRef} />
          </Slide>
        </Box>
      )}
    </>
  );
};

export default Home;
