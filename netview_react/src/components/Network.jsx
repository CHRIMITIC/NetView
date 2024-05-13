import '../stylesheets/Home.css'
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Network() {
    const username=Cookies.get("username");
    const password=Cookies.get("password");
    const nwId=Cookies.get("nwId");
    const [type, setType] = useState('');
    const [devices, setDevices] = useState([]);
    useEffect(() => async()=> {
        document.title="Network";
        const url=`http://localhost:8080/api/devices?nwId='${nwId}'`;
        await axios.get(url)
            .then(resp => {
                setDevices(resp.data);
                
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
        });
        const r = await axios.post('http://localhost:8080/api/user',[username,password,nwId]);
        if(r.data){
            setType(r.data)
            Cookies.set("type",r.data)
        }
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