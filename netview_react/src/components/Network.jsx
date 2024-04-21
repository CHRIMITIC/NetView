import { faHome, faUser, faCog, faInfo, faSignOut } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/Home.css'
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NavBarIcon from "./NavBarIcon.jsx";
function Network() {
    const nwId=Cookies.get("nwId");
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        document.title="Network";
        const url=`http://localhost:8080/api/devices?nwId='${nwId}'`;
        axios.get(url)
            .then(resp => {
                setDevices(resp.data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    },[])
    return (
        <div className="app-container h-full w-full">
            <NavBar></NavBar>
            <CardContainer list={devices} page={""}></CardContainer>
        </div>
    );
}

export default Network;