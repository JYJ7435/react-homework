import { createBrowserRouter } from 'react-router';
import Home from '@/pages/home/home';
import NotFound from '@/pages/not-found/not-found';
import Profile from '@/pages/profile/profile';
import SignIn from '@/pages/sign-in/sign-in';
import SignUp from '@/pages/sign-up/sign-up';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
