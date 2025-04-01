import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SpotDetails from './components/Spots/SpotDetails.jsx';
import * as sessionActions from './store/sessions';
import CreateSpot from './components/Spots/CreateSpot.jsx';
import UpdateSpot from './components/Spots/UpdateSpot.jsx';
import ManageSpots from './components/Spots/ManageSpots/ManageSpots.jsx';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => {
        setIsLoaded(true)
      });
    }, [dispatch]);
  
    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
      </>
    );
  }
  
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/', 
          element: <LandingPage/>
        },
        {
          path: '/spots/:id',
          element: <SpotDetails/>
        },
        {
          path: '/spots/new',
          element: <CreateSpot/>
        },
        {
          path: '/spots/:spotId',
          element: <SpotDetails/>
        },
        {
          path: '/spots/:spotId/edit',
          element: <UpdateSpot/>
        },
        {
          path: '/spots/current',
          element: <ManageSpots/>
        }
      ]
    }
  ]);
  
  function App() {
    return <RouterProvider router={router} />;
  }
  
  export default App;