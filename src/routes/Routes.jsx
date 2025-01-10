import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../components/Login';
import Register from '../components/Register';

import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import AllProducts from '../pages/AllProducts';
import PrivateRoute from '../components/PrivateRoute';
import AddArtifact from '../pages/AddArtifact';
import MyArtifacts from '../components/My-artifacts';
import LikedArtifacts from '../components/Liked-Artifacts';
import ArtifactDetails from '../pages/ArtifactsDetails';
import UpdateArtifact from '../components/UpdateArtifact';

// Import new components
import About from '../components-shared/footerComponents/AboutUs';

import Contact from '../components-shared/footerComponents/Contact';
import TermsOfService from '../components-shared/footerComponents/TermsOfService';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'all-products',
        element: <AllProducts />,
      },
      {
        path: 'add-item',
        element: <PrivateRoute><AddArtifact /></PrivateRoute>,
      },
      {
        path: 'my-artifacts',
        element: <PrivateRoute><MyArtifacts /></PrivateRoute>,
      },
      {
        path: 'liked-artifacts',
        element: <PrivateRoute><LikedArtifacts /></PrivateRoute>,
      },
      {
        path: 'artifact-details/:artifactId',
        element: <PrivateRoute><ArtifactDetails /></PrivateRoute>,
      },
      {
        path: 'update-artifact/:artifactId',
        element: <PrivateRoute><UpdateArtifact /></PrivateRoute>,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'terms-of-service',
        element: <TermsOfService />,
      },
    ],
  },
]);

export default Routes;
