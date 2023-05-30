import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Stack, Flex, Box } from '@chakra-ui/react';

import LoginForm from '../components/auth/loginForm';
import RegisterForm from '../components/auth/registerForm';

const Auth = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let mode = searchParams.get('mode');

  let captionBtn =
    mode === 'signin' ? "Don't have an account?" : 'Already have an account?';
  let formCaption = mode === 'signin' ? 'Sign in to your account' : 'Welcome!';

  return (
    <Flex minH={'90vh'} align={'center'} justify={'center'} bg="black">
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg="#ADEFD1FF"
          boxShadow={'lg'}
          p={8}
          maxW="450px"
          w="90vw"
        >
          {mode === 'signin' ? (
            <LoginForm formCaption={formCaption} />
          ) : (
            <RegisterForm formCaption={formCaption} captionBtn={captionBtn} />
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth;
