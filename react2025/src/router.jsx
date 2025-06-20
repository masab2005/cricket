import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './login/Login';
import Signup from './login/Signup';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

export default router;
