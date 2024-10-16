import { createRoot } from 'react-dom/client'
import App from './Routes/App/App.jsx'
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Maintenance from './Routes/Maintenance/Maintenance'
import NotFound from './Routes/NotFound/NotFound';
import Register from './Routes/register/register'
const router = createBrowserRouter
([
  {
    path: "/",
    element: <App/>
  },

  {
    path: "/maintenance",
    element: <Maintenance />
  },

  {
    path: "*" ,
    element:<NotFound></NotFound>
  },
  {
    path: "/register" ,
    element:<Register></Register>
  },

])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
