import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginForm from './components/LoginForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import Home from './components/Home.jsx'
import './stylesheets/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Card from "./components/Card.jsx";

const router=createBrowserRouter([
    {
        path:"/",
        element:<LoginForm/>,
    },
    {
        path:"/home",
        element:<Home/>,
    },
    {
        path:"/signup",
        element:<SignupForm/>,
    },
    {
        path:"/card",
        element:<Card/>,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
