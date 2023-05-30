import React, { useState } from 'react';
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
import ProtectedRoute from './ProtectedRoute';
import About from './pages/about';
import UserRoute from './UserRoute';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <WithSubnavigation />
        <Box bg="black" minHeight="100vh">
          <Routes>
            <Route
              path="/"
              element={
                <UserRoute>
                  <Home />
                </UserRoute>
              }
            />
            <Route path="/rekomendasi" 
              element={
                <UserRoute>
                  <MapContainer />
                </UserRoute>
              } />
            <Route path="/auth"
              element={
                <UserRoute>
                  <Auth />
                </UserRoute>
              } />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <HomeAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/foodlist"
              element={
                <ProtectedRoute>
                  <FoodList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/restaurantlist"
              element={
                <ProtectedRoute>
                  <RestaurantList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/touristattractionlist"
              element={
                <ProtectedRoute>
                  <TouristAttractionList />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/userlist" element={<UserList />} />
            <Route
              path="/admin/touristattractionlist/add"
              element={
                <ProtectedRoute>
                  <AddTouristAttraction />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/foodlist/add" element={<AddFood />} />
            <Route
              path="/admin/touristattractionlist/edit/:id"
              element={
                <ProtectedRoute>
                  <EditTouristAttraction />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/foodlist/edit/:id" element={<EditFood />} />
            <Route
              path="/admin/restaurantlist/add"
              element={
                <ProtectedRoute>
                  <AddRestaurant />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/restaurantlist/edit/:id"
              element={
                <ProtectedRoute>
                  <EditRestaurant />
                </ProtectedRoute>
              }
            />
            <Route path="/findrestaurant" 
              element={
                <UserRoute>
                  <RekomendasiRestoran />
                </UserRoute>
              } />
            <Route path="/findfood" 
              element={
                <UserRoute>
                  <RekomendasiMakanan />
                </UserRoute>
              } />
            <Route path="/about" 
              element={
                <UserRoute>
                  <About />
                </UserRoute>
              } />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
