import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout'
import Login from '../components/Login'
import Register from '../components/Register';

import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'
import AllProducts from '../pages/AllProducts'
import PrivateRoute from '../components/PrivateRoute'
import AddItem from '../pages/AddItem';
import MyArtifacts from '../components/My-artifacts';
import LikedArtifacts from '../components/Liked-Artifacts';



const Routes = createBrowserRouter([
{
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children:[

        {
            path: '/',
            element: <Home />, // Home page
          },
          {
            path: 'login',
            element: <Login />, 
          },
          {
            path: 'register',
            element: <Register/>, 
          },
          {
            path: 'all-products',
            element: <PrivateRoute> <AllProducts /> </PrivateRoute>, 
          }
          ,
          {
            path: 'add-item',
            element: <PrivateRoute> <AddItem /> </PrivateRoute>, 
          },
          {
            path: 'my-artifacts',
            element: <PrivateRoute> <MyArtifacts /> </PrivateRoute>, 
          },
          {
            path: 'liked-artifacts',
            element: <PrivateRoute> <LikedArtifacts /> </PrivateRoute>, 
          }
   
    ],
}


]);

 
export default Routes;