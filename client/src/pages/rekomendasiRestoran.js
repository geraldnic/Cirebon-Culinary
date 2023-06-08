import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { getDistance } from 'geolib';
import axios from 'axios';

import {
  Box,
  Button,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  CardFooter,
  Heading,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';

import FindRestaurant from '../components/rekomendasi/findRestaurant';
import MapComponent from '../components/rekomendasi/map';

import { useNavigate } from "react-router-dom";

const RekomendasiRestoran = props => {
  const [marker, setMarker] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState();
  const [restaurantResult, setRestaurantResult] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedPlace, restaurantResult]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVERURL + '/marker/getmarker')
      .then(res => {
        setMarker(res?.data ?? []);
      });

    axios
      .get(process.env.REACT_APP_SERVERURL + '/restaurant/getrestaurant')
      .then(res => {
        setRestaurant(res?.data ?? []);
      });
  }, []);

  const handleClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    console.log(`Clicked at (${lat}, ${lng})`);
  };

  const handleMarkerClick = e => {
    console.log('Marker Clicked!', e);
    const place = e.name;
    const location = e.position;
    setSelectedPlace({
      name: place,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
    });
  };

  //AHP
  const CalcValue = async (price, service, taste, distance) => {
    let pts, stp, ptt, ttp, ptd, dtp, stt, tts, std, dts, ttd, dtt;
    let ptp = 1;
    let sts = 1;
    let ttt = 1;
    let dtd = 1;

    if (price < service) {
      pts = 1 / ((price - service) * -1 + 1);
      stp = (price - service) * -1 + 1;
    } else if (price > service) {
      pts = price - service + 1;
      stp = 1 / (price - service + 1);
    } else {
      pts = 1;
      stp = 1;
    }

    if (price < taste) {
      ptt = 1 / ((price - taste) * -1 + 1);
      ttp = (price - taste) * -1 + 1;
    } else if (price > taste) {
      ptt = price - taste + 1;
      ttp = 1 / (price - taste + 1);
    } else {
      ptt = 1;
      ttp = 1;
    }

    if (price < distance) {
      ptd = 1 / ((price - distance) * -1 + 1);
      dtp = (price - distance) * -1 + 1;
    } else if (price > distance) {
      ptd = price - distance + 1;
      dtp = 1 / (price - distance + 1);
    } else {
      ptd = 1;
      dtp = 1;
    }

    if (service < taste) {
      stt = 1 / ((service - taste) * -1 + 1);
      tts = (service - taste) * -1 + 1;
    } else if (service > taste) {
      stt = service - taste + 1;
      tts = 1 / (service - taste + 1);
    } else {
      stt = 1;
      tts = 1;
    }

    if (service < distance) {
      std = 1 / ((service - distance) * -1 + 1);
      dts = (service - distance) * -1 + 1;
    } else if (service > distance) {
      std = service - distance + 1;
      dts = 1 / (service - distance + 1);
    } else {
      std = 1;
      dts = 1;
    }

    if (taste < distance) {
      ttd = 1 / ((taste - distance) * -1 + 1);
      dtt = (taste - distance) * -1 + 1;
    } else if (taste > distance) {
      ttd = taste - distance + 1;
      dtt = 1 / (taste - distance + 1);
    } else {
      ttd = 1;
      dtt = 1;
    }

    //Matrix Berpasangan Kriteria
    let c1 = [ptp, pts, ptt, ptd];
    let c2 = [stp, sts, stt, std];
    let c3 = [ttp, tts, ttt, ttd];
    let c4 = [dtp, dts, dtt, dtd];
    let total = [];
    for (let i = 0; i < 4; i++) {
      total[i] = c1[i] + c2[i] + c3[i] + c4[i];
    }

    //Matrix Ternormalisasi
    for (let i = 0; i < 4; i++) {
      c1[i] = c1[i] / total[i];
      c2[i] = c2[i] / total[i];
      c3[i] = c3[i] / total[i];
      c4[i] = c4[i] / total[i];
    }

    //Jumlah tiap kolom pada matrix
    let jumlah = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      jumlah[0] = jumlah[0] + c1[i];
    }
    for (let i = 0; i < 4; i++) {
      jumlah[1] = jumlah[1] + c2[i];
    }
    for (let i = 0; i < 4; i++) {
      jumlah[2] = jumlah[2] + c3[i];
    }
    for (let i = 0; i < 4; i++) {
      jumlah[3] = jumlah[3] + c4[i];
    }

    //Mencari bobot tiap kriteria (Eigen Vector)
    let eigen = [];
    for (let i = 0; i < 4; i++) {
      eigen[i] = jumlah[i] / 4;
    }

    //Mengukur konsistensi
    let lambdaMax = 0;
    for (let i = 0; i < 4; i++) {
      lambdaMax = lambdaMax + eigen[i] * total[i];
    }

    let CI = 0;
    CI = (lambdaMax - 4) / 3;

    let CR = 0;
    CR = CI / 0.9; //CR <= 0.1 === konsisten

    if (CR > 0.1) {
      alert('Prioritas tidak konsisten! Silahkan coba lagi.');
      navigate('/rekomendasi');
    } else {
      // Implementasi TOPSIS
      // Matrix Keputusan
      const decisionM = restaurant.map(item => {
        const distance = getDistance(
          {
            latitude: selectedPlace.location.lat,
            longitude: selectedPlace.location.lng,
          },
          { latitude: item.position.lat, longitude: item.position.lng }
        );

        let priceValue;
        if (item.price <= 1) {
          priceValue = 1;
        } else if (item.price > 1 && item.price <= 2) {
          priceValue = 2;
        } else if (item.price > 2 && item.price <= 3) {
          priceValue = 3;
        } else if (item.price > 3 && item.price <= 4) {
          priceValue = 4;
        } else {
          priceValue = 5;
        }

        let serviceValue;
        if (item.service <= 1) {
          serviceValue = 1;
        } else if (item.service > 1 && item.service <= 2) {
          serviceValue = 2;
        } else if (item.service > 2 && item.service <= 3) {
          serviceValue = 3;
        } else if (item.service > 3 && item.service <= 4) {
          serviceValue = 4;
        } else {
          serviceValue = 5;
        }

        let tasteValue;
        if (item.taste <= 1) {
          tasteValue = 1;
        } else if (item.taste > 1 && item.taste <= 2) {
          tasteValue = 2;
        } else if (item.taste > 2 && item.taste <= 3) {
          tasteValue = 3;
        } else if (item.taste > 3 && item.taste <= 4) {
          tasteValue = 4;
        } else {
          tasteValue = 5;
        }

        let distanceValue;
        if (distance > 8000) {
          distanceValue = 1;
        } else if (distance <= 8000 && distance > 6000) {
          distanceValue = 2;
        } else if (distance <= 6000 && distance > 4000) {
          distanceValue = 3;
        } else if (distance <= 4000 && distance > 2000) {
          distanceValue = 4;
        } else {
          distanceValue = 5;
        }
        return [priceValue, serviceValue, tasteValue, distanceValue];
      });

      //Normalisasi Matrix Keputusan
      let x1 = 0;
      for (let i = 0; i < decisionM.length; i++) {
        x1 = x1 + Math.pow(decisionM[i][0], 2);
      }
      x1 = Math.sqrt(x1);

      let x2 = 0;
      for (let i = 0; i < decisionM.length; i++) {
        x2 = x2 + Math.pow(decisionM[i][1], 2);
      }
      x2 = Math.sqrt(x2);

      let x3 = 0;
      for (let i = 0; i < decisionM.length; i++) {
        x3 = x3 + Math.pow(decisionM[i][2], 2);
      }
      x3 = Math.sqrt(x3);

      let x4 = 0;
      for (let i = 0; i < decisionM.length; i++) {
        x4 = x4 + Math.pow(decisionM[i][3], 2);
      }
      x4 = Math.sqrt(x4);

      //Normalisasi Baris 1
      for (let i = 0; i < decisionM.length; i++) {
        decisionM[i][0] = decisionM[i][0] / x1;
      }

      //Normalisasi Baris 2
      for (let i = 0; i < decisionM.length; i++) {
        decisionM[i][1] = decisionM[i][1] / x2;
      }

      //Normalisasi Baris 3
      for (let i = 0; i < decisionM.length; i++) {
        decisionM[i][2] = decisionM[i][2] / x3;
      }

      //Normalisasi Baris 4
      for (let i = 0; i < decisionM.length; i++) {
        decisionM[i][3] = decisionM[i][3] / x4;
      }

      //Normalisasi Matrix Terbobot
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < decisionM.length; i++) {
          decisionM[i][j] = decisionM[i][j] * eigen[j];
        }
      }

      //Mencari Solusi Ideal Positif dan Negatif
      let idealSolution = [];
      let aPlus = [];
      let aMinus = [];

      //Solusi Ideal Positif
      for (let j = 0; j < 4; j++) {
        let max = decisionM[0][j];
        for (let i = 1; i < decisionM.length; i++) {
          const currentValue = decisionM[i][j];
          if (currentValue > max) {
            max = currentValue;
          }
        }
        aPlus[j] = max;
      }

      //Solusi Ideal Negatif
      for (let j = 0; j < 4; j++) {
        let min = decisionM[0][j];
        for (let i = 1; i < decisionM.length; i++) {
          const currentValue = decisionM[i][j];
          if (currentValue < min) {
            min = currentValue;
          }
        }
        aMinus[j] = min;
      }

      // Solusi Ideal Positif dan Negatif
      idealSolution = [aPlus, aMinus];

      //Menghitung Jarak Solusi Ideal Positif dan Negatif
      //Jarak Solusi Ideal Positif
      let dPlus = 0;
      let dMinus = 0;
      let plusTemp = 0;
      let minusTemp = 0;
      const d = decisionM.map(item => {
        for (let j = 0; j < 4; j++) {
          plusTemp = plusTemp + Math.pow(item[j] - idealSolution[0][j], 2);
        }
        for (let j = 0; j < 4; j++) {
          minusTemp = minusTemp + Math.pow(item[j] - idealSolution[1][j], 2);
        }
        minusTemp = Math.sqrt(minusTemp);
        dMinus = minusTemp;
        minusTemp = 0;

        plusTemp = Math.sqrt(plusTemp);
        dPlus = plusTemp;
        plusTemp = 0;

        console.log(item[0]);
        return [dPlus, dMinus];
      });

      //Mencari Nilai Preferensi
      let pref = [];
      let finalCtr = -1;
      for (let i = 0; i < decisionM.length; i++) {
        pref[i] = d[i][1] / (d[i][1] + d[i][0]);
      }

      let preferenceM = [];
      preferenceM = restaurant.map(item => {
        finalCtr++;
        return {
          id: item._id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
          service: item.service,
          taste: item.taste,
          position: item.position,
          score: pref[finalCtr],
        };
      });

      let sortedPreferences = preferenceM.sort((a, b) => b.score - a.score);
      setRestaurantResult(sortedPreferences);
    }
  };

  const findAnother = () => {
    setSelectedPlace();
    setRestaurantResult();
  };

  console.log(restaurantResult);

  const renderMapComponent = () => {
    if (!selectedPlace) {
      return (
        <MapComponent
          google={props.google}
          handleClick={handleClick}
          marker={marker}
          handleMarkerClick={handleMarkerClick}
        />
      );
    }
    return null;
  };

  const renderRestaurant = () => {
    if (selectedPlace && !restaurantResult) {
      return (
        <Box mx={5}>
          <Button
            colorScheme="yellow"
            mb={[5, null, null]}
            onClick={() => setSelectedPlace()}
          >
            <BiArrowBack /> Back
          </Button>
          <FindRestaurant calcValue={CalcValue} />
        </Box>
      );
    }
    return null;
  };

  const renderResult = () => {
    if (restaurantResult && selectedPlace) {
      return (
        <>
          <Box mx={5}>
            <Button colorScheme="yellow" onClick={() => setRestaurantResult()}>
              <BiArrowBack /> Back
            </Button>
            <Box
              maxW="1100px"
              align="center"
              mx="auto"
              bg="#00203D"
              px={10}
              pb={10}
              pt={5}
              borderRadius="10px"
              mt={[5, null, null]}
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                align="center"
                mt={[5, null, null]}
                mb={10}
                color="#ADEFD1FF"
              >
                Rekomendasi Restoran Berdasarkan Preferensimu
              </Text>
              <SimpleGrid columns={[1, null, 1]} spacing={[5, null, 10]}>
                {restaurantResult.length >= 5
                  ? restaurantResult.slice(0, 5).map(item => {
                      const distance = getDistance(
                        {
                          latitude: selectedPlace.location.lat,
                          longitude: selectedPlace.location.lng,
                        },
                        {
                          latitude: item.position.lat,
                          longitude: item.position.lng,
                        }
                      );
                      return (
                        <Card
                          direction={{ base: 'column', sm: 'row' }}
                          overflow="hidden"
                          variant="outline"
                          bg="#F4B41A"
                        >
                          <Image
                            objectFit="cover"
                            maxW={{ base: '100%', sm: '300px' }}
                            src={item.imageUrl}
                          />

                          <Stack>
                            <CardBody>
                              <Heading size="md" align="left" color="#00203D">
                                {item.name}
                              </Heading>
                              <Text py="2" align="left" color="#00203D">
                                Rating Harga : {item.price}
                              </Text>
                              <Text py="2" align="left" color="#00203D">
                                Rating Pelayanan : {item.service}
                              </Text>
                              <Text py="2" align="left" color="#00203D">
                                Rating Rasa : {item.taste}
                              </Text>
                              <Text py="2" align="left" color="#00203D">
                                Jarak : {distance / 1000 + ' km'}
                              </Text>
                              <Text
                                py="2"
                                align="left"
                                fontWeight="bold"
                                color="#00203D"
                              >
                                Skor :{' '}
                                {Math.round(item.score * 1000000) / 10000}%
                              </Text>
                            </CardBody>
                          </Stack>
                        </Card>
                      );
                    })
                  : restaurantResult.map(item => {
                      const distance = getDistance(
                        {
                          latitude: selectedPlace.location.lat,
                          longitude: selectedPlace.location.lng,
                        },
                        {
                          latitude: item.position.lat,
                          longitude: item.position.lng,
                        }
                      );
                      return (
                        <Card
                          direction={{ base: 'column', sm: 'row' }}
                          overflow="hidden"
                          variant="outline"
                          bg="#F4B41A"
                        >
                          <Image
                            objectFit="cover"
                            maxW={{ base: '100%', sm: '300px' }}
                            src={item.imageUrl}
                          />

                          <Stack>
                            <CardBody>
                              <Heading size="md" align="left" color="#00203D">
                                {item.name}
                              </Heading>
                              <Text py="2" align="left" color="#00203D">
                                Rating Harga : {item.price}
                              </Text>
                              <Text py="2" align="left" color="#00203D">
                                Rating Pelayanan : {item.service}
                              </Text>
                              <Text py="2" align="left" color="#00203D">
                                Rating Rasa : {item.taste}
                              </Text>
                              <Text py="2" align="left" color="#00203D">
                                Jarak : {distance / 1000 + ' km'}
                              </Text>
                              <Text
                                py="2"
                                align="left"
                                fontWeight="bold"
                                color="#00203D"
                              >
                                Skor :{' '}
                                {Math.round(item.score * 1000000) / 10000}%
                              </Text>
                            </CardBody>
                          </Stack>
                        </Card>
                      );
                    })}
              </SimpleGrid>
              <Button
                colorScheme="blue"
                onClick={findAnother}
                align="center"
                mx="auto"
                mt={5}
                maxW="400px"
                w="100%"
              >
                Cari Rekomendasi Lain
              </Button>
            </Box>
          </Box>
          <Box w="100%" bg="black" height="40px" />
        </>
      );
    }
    return null;
  };
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
        <Box bg="black" pt={10}>
          {renderMapComponent()}
          {renderRestaurant()}
          {renderResult()}
        </Box>
      )}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPAPIKEY,
})(RekomendasiRestoran);
