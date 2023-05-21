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
  Flex
} from '@chakra-ui/react';

const FindRestaurant = props => {
  const [price, setPrice] = useState();
  const [service, setService] = useState();
  const [taste, setTaste] = useState();
  const [distance, setDistance] = useState();
  return (
    <Box pt={6} pb={2} align="center" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" align="center">
        Rekomendasi Tempat Kuliner
      </Text>
      <Text fontSize="lg" align="center" mb={[5, 5, 10]}>
        Silahkan pilih seberapa penting suatu kriteria menurut anda
      </Text>
      <SliderComponent
        caption={'Harga'}
        setSliderValue={setPrice}
      />
      <SliderComponent
        caption={'Layanan'}
        setSliderValue={setService}
      />
      <SliderComponent
        caption={'Rasa'}
        setSliderValue={setTaste}
      />
      <SliderComponent
        caption={'Jarak'}
        setSliderValue={setDistance}
      />
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
          <Text {...labelStyles} mr={5} fontWeight="bold">
            {props.caption}
          </Text>
          </Flex>
        </GridItem>
        <GridItem colSpan={4}>
          <Slider
            aria-label="slider-ex-6"
            onChange={val => props.setSliderValue(val*2-1)}
            defaultValue={1}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            min={1}
            max={5}
            step={0.5}
            w="100%"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderMark value={1} {...labelStyles}>
              1
            </SliderMark>
            <SliderMark value={2} {...labelStyles}>
              2
            </SliderMark>
            <SliderMark value={3} {...labelStyles}>
              3
            </SliderMark>
            <SliderMark value={4} {...labelStyles}>
              4
            </SliderMark>
            <SliderMark value={5} {...labelStyles}>
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
