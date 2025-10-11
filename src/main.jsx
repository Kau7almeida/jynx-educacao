import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Chamada from './pages/Chamada/Chamada'
import Checkin from './pages/Checkin/Checkin'

import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  { path: '/', element: <Login /> },
  { path: '/home', element: <Home /> },
  { path: '/chamada', element: <Chamada /> },
  { path: '/checkin', element: <Checkin /> },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
