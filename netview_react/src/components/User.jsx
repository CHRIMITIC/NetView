import React from 'react'
import {useEffect, useState} from 'react'
import '../stylesheets/User.css'
import axios from "axios";
import NavBar from "./NavBar.jsx";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus,faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

function User() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUId] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setUsername(Cookies.get("username"));
        setPassword(Cookies.get("password"));
    },[]);
    const changeData=()=>{
        const url=`http://localhost:8080/api/changeData?username=${username}&password=${password}&oldUs=${Cookies.get("username")}&oldPsw=${Cookies.get("password")}`;
        axios.get(url)
            .then(resp => {
                console.log(resp.data);
                if(resp.data){
                    Cookies.set("username", username);
                    Cookies.set("password", password);
                }else{
                    alert("Data not changed")
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    return (
        <div id={"div"}>
            <div id={"navBar"}>
                <NavBar></NavBar>
            </div>
            <div id={"dataContainer"}>
                <form onSubmit={changeData}>
                    <div id="Login">
                        <h2 id="h2">Change data</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" id="button">Change Data</button>
                </form>
            </div>
        </div>
    );
}

export default User
