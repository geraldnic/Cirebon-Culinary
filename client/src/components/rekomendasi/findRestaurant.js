import React, { useState } from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Tooltip,
  Text,
  Grid,
  GridItem,
  Button,
  Flex,
} from '@chakra-ui/react';

import { BiArrowBack } from 'react-icons/bi';

const FindRestaurant = props => {
  const [price, setPrice] = useState(1);
  const [service, setService] = useState(1);
  const [taste, setTaste] = useState(1);
  const [distance, setDistance] = useState(1);
  return (
    <Box
      pt={6}
      pb={6}
      align="center"
      mx={[5, 10, 20]}
      bg="#00203D"
      borderRadius="10px"
    >
      <Text fontSize="2xl" fontWeight="bold" align="center" color="#ADEFD1FF">
        Rekomendasi Tempat Kuliner
      </Text>
      <Text fontSize="lg" align="center" mb={[5, 5, 10]} color="#E7A238">
        Silahkan pilih seberapa penting suatu kriteria menurut anda
      </Text>
      <SliderComponent caption={'Harga'} setSliderValue={setPrice} />
      <SliderComponent caption={'Layanan'} setSliderValue={setService} />
      <SliderComponent caption={'Rasa'} setSliderValue={setTaste} />
      <SliderComponent caption={'Jarak'} setSliderValue={setDistance} />
      <Button
        w="200px"
        colorScheme="green"
        onClick={() => props.calcValue(price, service, taste, distance)}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default FindRestaurant;

const SliderComponent = props => {
  const [showTooltip, setShowTooltip] = useState(false);

  const labelStyles = {
    mt: '2',
  };

  return (
    <Box mx={5}>
      <Box maxW="1100px" align="center" mx="auto">
        <Grid templateColumns="repeat(5, 1fr)" mb={20}>
          <GridItem colSpan={1}>
            <Flex>
              <Text {...labelStyles} mr={5} fontWeight="bold" color="white">
                {props.caption}
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={4}>
            <Slider
              aria-label="slider-ex-6"
              onChange={val => props.setSliderValue(val * 2 - 1)}
              defaultValue={1}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              min={1}
              max={5}
              step={0.5}
              w="100%"
            >
              <SliderTrack>
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderMark color="white" value={1}  {...labelStyles}>
                1
              </SliderMark>
              <SliderMark color="white" value={2} {...labelStyles}>
                2
              </SliderMark>
              <SliderMark color="white" value={3} {...labelStyles}>
                3
              </SliderMark>
              <SliderMark color="white" value={4} {...labelStyles}>
                4
              </SliderMark>
              <SliderMark color="white" value={5} {...labelStyles}>
                5
              </SliderMark>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
