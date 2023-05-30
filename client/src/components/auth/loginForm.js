import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Center,
  Circle,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
} from '@chakra-ui/react';

import { FaLock } from 'react-icons/fa';
import AuthModal from './modal';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [_, setCookies] = useCookies(['access_token']);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVERURL + '/auth/login',
        {
          username,
          password,
        }
      );

      if (response.data.code === 200) {
        setCookies('access_token', response.data.token);
        window.localStorage.setItem('username', response.data.username);
        navigate('/admin');
      }

      openModal();
      const res = {
        messageTitle: response.data.messageTitle,
        messageContent: response.data.messageContent,
        closeCaption: response.data.closeCaption,
        link: response.data.link,
      };
      setModalProps(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} color="#00203D" borderColor="#00203D">
          <Center>
            <Circle size={14} border="1px" borderColor="black">
              <FaLock />
            </Circle>
          </Center>
          <Heading fontSize={'4xl'} pb={3} align="center">
            {props.formCaption}
          </Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              onChange={event => setUsername(event.target.value)}
              style={{
                borderColor: '#00203D',
                '&:focus': {
                  borderColor: '#0059A9',
                },
              }}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={event => setPassword(event.target.value)}
              style={{
                borderColor: '#00203D',
                '&:focus': {
                  borderColor: '#0059A9',
                },
              }}
            />
          </FormControl>
          <Stack spacing={10}>
            <Button
              type="submit"
              bg={'blue.400'}
              color={'white'}
              size="lg"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </form>
      <AuthModal
        messageTitle={modalProps.messageTitle}
        messageContent={modalProps.messageContent}
        closeCaption={modalProps.closeCaption}
        link={modalProps.link}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default LoginForm;
