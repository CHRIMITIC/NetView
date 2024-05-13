import React from 'react'
import ReactDOM from 'react-dom/client'
import './stylesheets/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginForm from './components/LoginForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import Home from './components/Home.jsx'
import Card from "./components/Card.jsx";
import Network from "./components/Network.jsx";
import Settings from "./components/Settings.jsx";
import User from "./components/User.jsx";
import Cookies from "js-cookie";

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
        path:"/user",
        element:<User/>,
    },
    {
        path:"/signup",
        element:<SignupForm/>,
    },
    {
        path:"/card",
        element:<Card/>,
    },
    {
        path:"/network",
        element:<Network/>,
    },
    {
        path:"/settings",
        element:<Settings/>,
    }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
window.onbeforeunload=()=>{
    if(Cookies.get("check")=="false"){
        Cookies.remove("username")
        Cookies.remove("password")
        Cookies.remove("nwId")
        Cookies.remove("loggedIn")
        Cookies.remove("check")
    }
}