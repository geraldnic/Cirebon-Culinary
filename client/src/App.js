import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import WithSubnavigation from './components/navbar';
import Home from './pages';
import MapContainer from './pages/rekomendasi';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
import HistoryTable from './components/rekomendasi/historyTable';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/rekomendasi",
    element: <MapContainer />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
  },
  {
    path: "/admin/foodlist",
    element: <FoodList />,
  },
  {
    path: "/admin/restaurantlist",
    element: <RestaurantList />,
  },
  {
    path: "/admin/touristattractionlist",
    element: <TouristAttractionList />,
  },
  {
    path: "/admin/userlist",
    element: <UserList />,
  },
  {
    path: "/admin/touristattractionlist/add",
    element: <AddTouristAttraction />,
  },
  {
    path: "/admin/foodlist/add",
    element: <AddFood />,
  },
  {
    path: "/admin/touristattractionlist/edit/:id",
    element: <EditTouristAttraction />,
  },
  {
    path: "/admin/foodlist/edit/:id",
    element: <EditFood />,
  },
  {
    path: "/historytable",
    element: <HistoryTable />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WithSubnavigation />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
