import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import WithSubnavigation from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './pages/error';
import Auth from './pages/auth';
import HomeAdmin from './pages/admin';
import FoodList from './pages/admin/lists/foodList';
import RestaurantList from './pages/admin/lists/restaurantList';
import TouristAttractionList from './pages/admin/lists/touristAttractionList';
import UserList from './pages/admin/lists/userList';
import AddTouristAttraction from './pages/admin/add/addTouristAttraction';
import EditTouristAttraction from './pages/admin/edit/touristAttractionEdit';
import AddFood from './pages/admin/add/addFood';
import EditFood from './pages/admin/edit/foodEdit';
import AddRestaurant from './pages/admin/add/addRestaurant';
import EditRestaurant from './pages/admin/edit/restaurantEdit';
import FindRestaurant from './components/rekomendasi/findRestaurant';
import RekomendasiRestoran from './pages/rekomendasiRestoran';
import RekomendasiMakanan from './pages/rekomendasiMakanan';
import Home from './pages';
import MapContainer from './pages/rekomendasi';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <WithSubnavigation />
        <Box bg="black" minHeight="100vh">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rekomendasi" element={<MapContainer />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/foodlist" element={<FoodList />} />
            <Route path="/admin/restaurantlist" element={<RestaurantList />} />
            <Route
              path="/admin/touristattractionlist"
              element={<TouristAttractionList />}
            />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route
              path="/admin/touristattractionlist/add"
              element={<AddTouristAttraction />}
            />
            <Route path="/admin/foodlist/add" element={<AddFood />} />
            <Route
              path="/admin/touristattractionlist/edit/:id"
              element={<EditTouristAttraction />}
            />
            <Route path="/admin/foodlist/edit/:id" element={<EditFood />} />
            <Route
              path="/admin/restaurantlist/add"
              element={<AddRestaurant />}
            />
            <Route
              path="/admin/restaurantlist/edit/:id"
              element={<EditRestaurant />}
            />
            <Route path="/findrestaurant" element={<RekomendasiRestoran />} />
            <Route path="/findfood" element={<RekomendasiMakanan />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
