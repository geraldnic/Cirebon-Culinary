import { ReactElement } from 'react';
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
} from '@chakra-ui/react';
import {
  FcMenu,
  FcTodoList,
  FcInspection,
  FcHighPriority,
} from 'react-icons/fc';
import React, { forwardRef } from 'react';
import { Fade, Slide, Zoom, Jump } from 'react-reveal';
import { Link } from 'react-router-dom';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align="center">
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text color={'#E5E5E5'} fontWeight={600} fontSize="2xl">
        {title}
      </Text>
      <Text color={'#E5E5E5'} fontSize="lg" align="justify">
        {text}
      </Text>
    </Stack>
  );
};

const Tutorial = forwardRef((props, ref) => {
  return (
    <Box py={10} mb={10} mx={[5, 10, 20]} color="white" ref={ref}>
      <Slide left>
        <Text fontSize="4xl" fontWeight="bold" mb={5} ml={[null, 20, 20]} mt={10}>
          Cara Menggunakan
        </Text>
        <Text fontSize="lg" mb={20} ml={[null, 20, 20]} maxW="4xl">
          Untuk menggunakan sistem rekomendasi ini, terdapat beberapa langkah
          sederhana yang dapat diikuti untuk mendapatkan hasil rekomendasi yang
          sesuai dengan kebutuhan dan preferensimu. Berikut adalah
          langkah-langkah untuk menggunakan sistem rekomendasi ini :
        </Text>
      </Slide>
      <Slide right>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={20}
          mx={[null, 20, 20]}
          mb={20}
          align="center"
        >
          <Feature
            icon={<Icon as={FcMenu} w={10} h={10} />}
            title={'Buka Menu'}
            text={
              'Terdapat beberapa pilihan rekomendasi yang tersedia, yaitu rekomendasi menu makanan, rekomendasi tempat kuliner, dan rekomendasi keduanya. Silahkan pilih salah satu menu rekomendasi yang diinginkan untuk melanjutkan ke tahap selanjutnya.'
            }
          />
          <Feature
            icon={<Icon as={FcTodoList} w={10} h={10} />}
            title={'Masukkan Kriteria'}
            text={
              'Setelah memilih menu rekomendasi yang diingkan, selanjutnya masukkan kriteria yang dibutuhkan sesuai preferensimu. Pastikan seluruh kriteria yang dimasukkan sudah benar untuk mendapatkan hasil rekomendasi yang sesuai.'
            }
          />
          <Feature
            icon={<Icon as={FcInspection} w={10} h={10} />}
            title={'Hasil Rekomendasi'}
            text={
              'Sistem akan menampilkan hasil rekomendasi sesuai dengan preferensi yang diberikan. Hasil rekomendasi dapat kamu jadikan referensi dalam menentukan menu maupun tempat kuliner khas Cirebon.'
            }
          />
        </SimpleGrid>
      </Slide>
      <Slide left>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={20}
          mx={[null, 20, 20]}
          mb={20}
          align="center"
        >
          <Stack align="center" gridColumnStart={{ md: 2 }}>
            <Flex
              w={16}
              h={16}
              align={'center'}
              justify={'center'}
              color={'white'}
              rounded={'full'}
              bg={'gray.100'}
              mb={1}
            >
              <Icon as={FcHighPriority} w={10} h={10} />
            </Flex>
            <Text color={'#E5E5E5'} fontWeight={600} fontSize="2xl">
              Terdapat Masalah?
            </Text>
            <Text color={'#E5E5E5'} fontSize="lg" align="justify">
              Bila terdapat masalah atau pertanyaan lebih lanjut mengenai sistem
              ini, silahkan menghubungi kontak pada menu
              <Box as="span" color="blue.500" fontWeight="bold">
                <Link color="blue.500" to="/about">
                  {' '}
                  About
                </Link>
              </Box>
            </Text>
          </Stack>
        </SimpleGrid>
      </Slide>
    </Box>
  );
});

export default Tutorial;
