import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'   
import { Provider } from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import Login from './account/Login.jsx'
import Signup from './account/Signup.jsx'
import App from './App.jsx'
import {store,persistor} from './store/store.js'
import './index.css'
import GameWrapper from './game/GameWrapper.jsx'
import { PersistGate } from 'redux-persist/integration/react'
 
const routers = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/game', element: <GameWrapper /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routers} />
     </PersistGate>
    </Provider>
  </StrictMode>
);