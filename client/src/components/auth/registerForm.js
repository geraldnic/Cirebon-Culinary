import React, { useState } from 'react';
import axios from 'axios';
import {
  Stack,
  Center,
  Circle,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { Link, useNavigate } from 'react-router-dom';

import { FaUserPlus } from 'react-icons/fa';

import AuthModal from './modal';

const RegisterForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [modalProps, setModalProps] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
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
        process.env.REACT_APP_SERVERURL + '/auth/register',
        {
          username,
          password,
          firstName,
          lastName,
        }
      );

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
        <Stack spacing={4}>
          <Center>
            <Circle size={14} border="1px" borderColor="black">
              <FaUserPlus />
            </Circle>
          </Center>
          <Heading fontSize={'4xl'} pb={5} align="center">
            {props.formCaption}
          </Heading>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  onChange={event => setFirstName(event.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  onChange={event => setLastName(event.target.value)}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              onChange={event => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={event => setPassword(event.target.value)}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword(showPassword => !showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Link to="?mode=signin">{props.captionBtn}</Link>
            </Stack>
            <Button
              type="submit"
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
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

export default RegisterForm;
