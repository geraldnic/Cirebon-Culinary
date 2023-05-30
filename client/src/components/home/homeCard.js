import React, { forwardRef } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FcList, FcShop, FcDonate, FcKindle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '400px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'start'} spacing={2} m={1}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
          mb={3}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="lg" color="#FCA311" mb={3}>
            {heading}
          </Heading>
          <Text mt={1} fontSize={'lg'} color="#E5E5E5" align="left">
            {description}
          </Text>
        </Box>
        <Link to={href}>
          <Button
            variant={'solid'}
            colorScheme={'blue'}
            size={'md'}
            width="80px"
            mt={10}
          >
            Pilih
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

const HomeCard = forwardRef((props, ref) => {
  return (
    <Box p={4} bg="#14213D" py="100px" ref={ref}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading
          fontSize={{ base: '2xl', sm: '4xl' }}
          fontWeight={'bold'}
          color="#FCA311"
        >
          Menu Rekomendasi
        </Heading>
        <Text fontSize={{ base: 'sm', sm: 'lg' }} color="#E5E5E5">
          Silahkan pilih salah satu menu dari 3 pilihan menu rekomendasi, yaitu
          rekomendasi menu makanan, rekomendasi tempat kuliner, dan rekomendasi
          menu & tempat kuliner.
        </Text>
      </Stack>

      <Container maxW={'90vw'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Menu Makanan'}
            icon={<Icon as={FcKindle} w={10} h={10} />}
            description={
              'Rekomendasi menu makanan berdasarkan tipe, bahan, berkuah / tidak berkuah, dan cara penyajian.'
            }
            href={'/findfood'}
          />
          <Card
            heading={'Tempat Kuliner'}
            icon={<Icon as={FcShop} w={10} h={10} />}
            description={
              'Rekomendasi tempat kuliner berdasarkan prioritas terhadap kriteria yang diberikan, yaitu harga, pelayanan, rasa, dan jarak.'
            }
            href={'/findrestaurant'}
          />
          <Card
            heading={'Menu & Tempat Kuliner'}
            icon={<Icon as={FcList} w={10} h={10} />}
            description={
              'Rekomendasi menu makanan dan tempat kuliner yang menyediakan makanan yang telah direkomendasikan.'
            }
            href={'/rekomendasi'}
          />
        </Flex>
      </Container>
    </Box>
  );
});

export default HomeCard;
