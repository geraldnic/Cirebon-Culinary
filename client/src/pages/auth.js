import React from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Stack,
  Flex,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

import LoginForm from '../components/auth/loginForm';
import RegisterForm from '../components/auth/registerForm';

const Auth = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let mode = searchParams.get('mode');
  console.log(mode);

  let captionBtn =
    mode === 'signin' ? "Don't have an account?" : 'Already have an account?';
  let formCaption = mode === 'signin' ? 'Sign in to your account' : 'Welcome!';

  return (
    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          {mode === 'signin' ? (
            <LoginForm formCaption={formCaption} captionBtn={captionBtn} />
          ) : (
            <RegisterForm formCaption={formCaption} captionBtn={captionBtn} />
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth;
