import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'   
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import Login from './account/Login.jsx'
import Signup from './account/Signup.jsx'
import Success from './game/Game.jsx'
import App from './App.jsx'
import store from './store/store.js'
import './index.css'
 
const routers = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/success', element: <Success /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routers}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);