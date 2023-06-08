import { GoogleApiWrapper } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getDistance } from 'geolib';

import { BiArrowBack } from 'react-icons/bi';

import CriteriaCard from '../components/rekomendasi/criteriaCard';
import MapComponent from '../components/rekomendasi/map';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Center,
  Image,
  Stack,
  Heading,
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import HistoryTable from '../components/rekomendasi/historyTable';
import FindRestaurant from '../components/rekomendasi/findRestaurant';
import { WarningTwoIcon } from '@chakra-ui/icons';

import { useNavigate } from "react-router-dom";

const Rekomendasi = props => {
  const [marker, setMarker] = useState([]);
  const [type, setType] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [broth, setBroth] = useState([]);
  const [serving, setServing] = useState([]);
  const [food, setFood] = useState([]);
  const [restaurantResult, setRestaurantResult] = useState();
  const [someRestaurant, setSomeRestaurant] = useState([]);

  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState({
    id: '',
    name: '',
  });
  const [selectedIngredient, setSelectedIngredient] = useState({
    id: '',
    name: '',
  });
  const [selectedBroth, setSelectedBroth] = useState({
    id: '',
    name: '',
  });
  const [selectedServing, setSelectedServing] = useState({
    id: '',
    name: '',
  });
  const [selectedFood, setSelectedFood] = useState({
    id: '',
    name: '',
  });
  const [selectedCriteria, setSelectedCriteria] = useState({
    id: '',
    name: '',
  });
  const [selectedPlace, setSelectedPlace] = useState();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [
    selectedPlace,
    selectedType,
    selectedIngredient,
    selectedBroth,
    selectedServing,
    selectedFood,
    restaurantResult,
  ]);

  //FETCH MARKER AND FOOD TYPE
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVERURL + '/marker/getmarker')
      .then(res => {
        setMarker(res?.data ?? []);
      });

    axios.get(process.env.REACT_APP_SERVERURL + '/food/gettype').then(res => {
      setType(res?.data ?? []);
    });
  }, []);

  //FETCH FOOD INGREDIENT
  useEffect(() => {
    if (selectedType.id) {
      const getIngredient = async () => {
        try {
          await axios
            .post(process.env.REACT_APP_SERVERURL + '/food/getingredient', {
              typeId: selectedType.id,
            })
            .then(res => {
              setIngredient(res?.data ?? []);
            });
        } catch (err) {
          console.log('ingredient err', err);
        }
      };
      getIngredient();
    }
  }, [selectedType]);

  //FETCH FOOD BROTH
  useEffect(() => {
    if (selectedIngredient.id) {
      const getBroth = async () => {
        try {
          await axios
            .post(process.env.REACT_APP_SERVERURL + '/food/getbroth', {
              ingredientId: selectedIngredient.id,
            })
            .then(res => {
              setBroth(res?.data ?? []);
            });
        } catch (err) {
          console.log('broth err', err);
        }
      };
      getBroth();
    }
  }, [selectedIngredient]);

  //FETCH FOOD SERVING
  useEffect(() => {
    if (selectedBroth.id) {
      const getServing = async () => {
        try {
          await axios
            .post(process.env.REACT_APP_SERVERURL + '/food/getserving', {
              ingredientId: selectedIngredient.id,
              brothId: selectedBroth.id,
            })
            .then(res => {
              setServing(res?.data ?? []);
            });
        } catch (err) {
          console.log('serving err', err);
        }
      };
      getServing();
    }
  }, [selectedBroth]);

  //FETCH FOOD RESULT
  useEffect(() => {
    if (selectedServing.id) {
      const getFood = async () => {
        try {
          await axios
            .post(process.env.REACT_APP_SERVERURL + '/food/getfoodresult', {
              typeId: selectedType.id,
              ingredientId: selectedIngredient.id,
              brothId: selectedBroth.id,
              servingId: selectedServing.id,
            })
            .then(res => {
              setFood(res?.data ?? []);
            });
        } catch (err) {
          console.log('food err', err);
        }
      };
      getFood();
    }
  }, [selectedServing]);

  //FETCH SOME RESTAURANT
  useEffect(() => {
    if (selectedFood.id) {
      const getSomeRestaurant = async () => {
        try {
          await axios
            .post(
              process.env.REACT_APP_SERVERURL + '/restaurant/getsomerestaurant',
              {
                foodId: selectedFood.id,
              }
            )
            .then(res => {
              setSomeRestaurant(res?.data ?? []);
            });
        } catch (err) {
          console.log('some restaurant err', err);
        }
      };
      getSomeRestaurant();
    }
  }, [selectedFood]);

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

  const resetMenu = () => {
    setSelectedType({});
    setSelectedIngredient({});
    setSelectedBroth({});
    setSelectedServing({});
    setSelectedFood({});
  };

  const reset = () => {
    setSelectedPlace();
    setSelectedType({});
    setSelectedIngredient({});
    setSelectedBroth({});
    setSelectedServing({});
    setSelectedFood({});
    setRestaurantResult();
  };

  //IMPLEMENTASI AHP dan TOPSIS
  //AHP
  const CalcValue = (price, service, taste, distance) => {
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
    console.log(eigen);

    if (CR > 0.1) {
      alert('Prioritas tidak konsisten! Silahkan coba lagi.');
      navigate('/rekomendasi');
    } else {
      // Implementasi TOPSIS
      // Matrix Keputusan
      const decisionM = someRestaurant.map(item => {
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

      console.log(decisionM);

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

      console.log(decisionM);

      //Normalisasi Matrix Terbobot
      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < decisionM.length; i++) {
          decisionM[i][j] = decisionM[i][j] * eigen[j];
        }
      }
      console.log(decisionM);

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
      console.log(idealSolution);

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

        plusTemp = Math.sqrt(plusTemp);
        dPlus = plusTemp;

        plusTemp = 0;
        minusTemp = 0;

        console.log(item);
        return [dPlus, dMinus];
      });

      console.log(d);

      //Mencari Nilai Preferensi
      //Matrix Preferensi
      let pref = [];
      let finalCtr = -1;
      for (let i = 0; i < decisionM.length; i++) {
        pref[i] = d[i][1] / (d[i][1] + d[i][0]);
      }

      let preferenceM = [];
      preferenceM = someRestaurant.map(item => {
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

  const renderTypeCard = () => {
    if (selectedPlace && !selectedType.id) {
      return (
        <Box mx={5}>
          <Button colorScheme="yellow" onClick={() => setSelectedPlace()}>
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
              Silahkan Pilih Tipe Makanan yang Diinginkan
            </Text>
            <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
              {type.map(item => (
                <CriteriaCard
                  key={item._id}
                  category="type"
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  setCriteria={setSelectedType}
                />
              ))}
            </SimpleGrid>
            <Box mt={20} align="center">
              <HistoryTable
                place={selectedPlace.name}
                type={selectedType.name}
                ingredient={selectedIngredient.name}
                broth={selectedBroth.name}
                serving={selectedServing.name}
              />
            </Box>
          </Box>
        </Box>
      );
    }
    return null;
  };

  const renderIngredientCard = () => {
    if (selectedType.id && !selectedIngredient.id) {
      return (
        <>
          <Box mx={5}>
            <Button colorScheme="yellow" onClick={() => setSelectedType({})}>
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
                Silahkan Pilih Bahan Utama
              </Text>
              <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
                {ingredient.map(item => (
                  <CriteriaCard
                    key={item._id}
                    category="ingredient"
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    setCriteria={setSelectedIngredient}
                  />
                ))}
              </SimpleGrid>
              <Box mt={10} align="center">
                <HistoryTable
                  place={selectedPlace.name}
                  type={selectedType.name}
                  ingredient={selectedIngredient.name}
                  broth={selectedBroth.name}
                  serving={selectedServing.name}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    return null;
  };

  const renderBrothCard = () => {
    if (selectedIngredient.id && !selectedBroth.id) {
      return (
        <>
          <Box mx={5} className="container">
            <Button
              colorScheme="yellow"
              onClick={() => setSelectedIngredient({})}
            >
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
                Apakah Kamu Mau Makanan Kamu Berkuah / Tidak berkuah?
              </Text>
              <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
                {broth.map(item => (
                  <CriteriaCard
                    key={item._id}
                    category="broth"
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    setCriteria={setSelectedBroth}
                  />
                ))}
              </SimpleGrid>
              <Box mt={10} align="center">
                <HistoryTable
                  place={selectedPlace.name}
                  type={selectedType.name}
                  ingredient={selectedIngredient.name}
                  broth={selectedBroth.name}
                  serving={selectedServing.name}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    return null;
  };

  const renderServingCard = () => {
    if (selectedIngredient.id && selectedBroth.id && !selectedServing.id) {
      return (
        <>
          <Box mx={5} className="container">
            <Button colorScheme="yellow" onClick={() => setSelectedBroth({})}>
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
                Silahkan Pilih Penyajian yang Diinginkan
              </Text>
              <SimpleGrid columns={[1, null, 2]} spacing={[5, null, 10]}>
                {serving.map(item => (
                  <CriteriaCard
                    key={item._id}
                    category="serving"
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    setCriteria={setSelectedServing}
                  />
                ))}
              </SimpleGrid>
              <Box mt={10} align="center">
                <HistoryTable
                  place={selectedPlace.name}
                  type={selectedType.name}
                  ingredient={selectedIngredient.name}
                  broth={selectedBroth.name}
                  serving={selectedServing.name}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    return null;
  };

  const renderFoodCard = () => {
    if (selectedServing.id && food && !selectedFood.id) {
      return (
        <Box mx={5} className="container">
          <Button colorScheme="yellow" onClick={() => setSelectedServing({})}>
            <BiArrowBack /> Back
          </Button>
          <Box
            maxW="1100px"
            align="center"
            mx="auto"
            px={10}
            pb={10}
            pt={5}
            borderRadius="10px"
            mt={[5, null, null]}
          >
            <Center>
              <Flex>
                <Box className="container">
                  {food.map(item => (
                    <Card maxW="sm" align="center" mx="auto" bg="#00203D">
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        align="center"
                        mt={5}
                        color="#FF3521"
                      >
                        Makanan Sesuai Kriteriamu
                      </Text>
                      <CardBody>
                        <Image src={item.imageUrl} borderRadius="lg" />
                        <Stack mt="6" spacing="3">
                          <Text
                            textTransform={'uppercase'}
                            fontWeight={800}
                            fontSize={'sm'}
                            letterSpacing={1.1}
                            color={'green.500'}
                          >
                            {selectedType.name +
                              ' - ' +
                              selectedIngredient.name +
                              ' - ' +
                              selectedBroth.name +
                              ' - ' +
                              selectedServing.name}
                          </Text>
                        </Stack>
                        <Stack mt="6" spacing="3">
                          <Heading size="md" color="#FF3521">
                            {item.name}
                          </Heading>
                          <Text color="#E7A238">{item.description}</Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button
                            variant="solid"
                            colorScheme="blue"
                            onClick={() =>
                              setSelectedFood({ id: item._id, name: item.name })
                            }
                          >
                            Cari Tempat Kuliner
                          </Button>
                          <Button
                            variant="ghost"
                            colorScheme="blue"
                            onClick={resetMenu}
                          >
                            Cari menu lain
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  ))}
                </Box>
              </Flex>
            </Center>
            <Box mt={10} align="center">
              <HistoryTable
                place={selectedPlace.name}
                type={selectedType.name}
                ingredient={selectedIngredient.name}
                broth={selectedBroth.name}
                serving={selectedServing.name}
              />
            </Box>
          </Box>
        </Box>
      );
    }
  };

  console.log(selectedFood.id, restaurantResult, someRestaurant.length);

  const renderRestaurant = () => {
    if (selectedFood.id && !restaurantResult) {
      if (someRestaurant.length == 0) {
        return (
          <Box textAlign="center" py={10} px={6} bg="white">
            <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Tempat Kuliner Tidak Ditemukan
            </Heading>
            <Text color={'gray.500'}>
              Mohon maaf, tempat kuliner tidak tersedia untuk menu makanan yang
              kamu pilih. Silahkan coba cari rekomendasi lainnya.
            </Text>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={resetMenu}
              mt={5}
            >
              Pilih Menu Lain
            </Button>
          </Box>
        );
      } else {
        return (
          <Box mx={5}>
            <Button
              mb={[5, null, null]}
              colorScheme="yellow"
              onClick={() => setSelectedFood({})}
            >
              <BiArrowBack /> Back
            </Button>
            <FindRestaurant calcValue={CalcValue} />
          </Box>
        );
      }
    }
  };

  const renderResult = () => {
    if (restaurantResult) {
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
                      if (item.score !== 0) {
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
                                <Heading size="md" align="left">
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
                      }
                    })
                  : restaurantResult.map(item => {
                      if (restaurantResult.length == 1) {
                        item.score = 1;
                      }
                      if (item.score !== 0) {
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
                      }
                    })}
              </SimpleGrid>
              <Button
                colorScheme="blue"
                align="center"
                mx="auto"
                mt={5}
                maxW="400px"
                w="100%"
                onClick={reset}
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
          {renderTypeCard()}
          {renderIngredientCard()}
          {renderBrothCard()}
          {renderServingCard()}
          {renderFoodCard()}
          {renderRestaurant()}
          {renderResult()}
        </Box>
      )}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPAPIKEY,
})(Rekomendasi);
