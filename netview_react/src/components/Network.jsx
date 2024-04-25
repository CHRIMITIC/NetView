import '../stylesheets/Home.css'
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
        <div id={"div"}>
            <div id={"navBar"}>
                <NavBar></NavBar>
            </div>
            <div id={"cardsContainer"}>
                <CardContainer id={"cardsContainer"} list={devices} page={""}></CardContainer>
            </div>
        </div>
    );
}

export default Network;