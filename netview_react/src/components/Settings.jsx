import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "./NavBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
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
        const url=`http://localhost:8080/api/settings?nwId='${n}'`;
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
            <div id={"navBar"}>
                <NavBar></NavBar>
            </div>
            <div id={"cardsContainer"}>

                <table border="1">
                    <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Type</th>
                        <th>Remove</th>
                    </tr>
                    {settings.map((item, index) => (
                        <tr key={index}>
                            {item.map((l, i) => (
                                <td key={i}>
                                    {l}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Settings;