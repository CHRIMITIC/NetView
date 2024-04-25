import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "./NavBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus, faUserPlus} from "@fortawesome/free-solid-svg-icons";

function Settings() {
    const u=Cookies.get("username");
    const p=Cookies.get("password");
    const n=Cookies.get("nwId");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nwId, setNwId] = useState('');
    const [type, setType] = useState('');
    const [settings, setSettings] = useState([]);
    useEffect(()=>{
        getSettings();
    },[]);
    const getSettings=()=>{
        const url=`http://localhost:8080/api/settings?&nwId='${n}'`;
        axios.get(url)
            .then(resp => {
                setSettings(resp.data);
                // console.log(resp.data)
                // if(!resp.data){
                //     alert("Not logged in");
                // }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    return (
        <div>
            <div className="app-container h-full w-full">
                <NavBar></NavBar>
                <table border="1">
                    <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Type</th>
                        <th>Remove</th>
                    </tr>
                    {settings.map((item,index)=>(
                        <tr key={index}>
                            {item.map((l,i)=>(
                                <td key={i}>
                                    {l}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td><input type={"text"} placeholder={"Username"} id={"username"}/></td>
                        <td><input type={"text"} placeholder={"Password"} id={"password"}/></td>
                        <td>
                            <select id={"type"}>
                                <optgroup label="Type">
                                    <option value={"Admin"}>Admin</option>
                                    <option value={"Simple"}>Simple</option>
                                </optgroup>
                            </select>
                        </td>
                        <td><button><FontAwesomeIcon icon={faUserPlus}/></button></td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Settings;