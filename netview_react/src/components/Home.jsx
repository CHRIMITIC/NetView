import '../stylesheets/Home.css'
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Home() {
    const username=Cookies.get("username");
    const password=Cookies.get("password");
    const [networks, setNetworks] = useState([]);
    useEffect(() => {
        document.title = "Home";
        const url=`http://localhost:8080/api/network?username='${username}'&password='${password}'`;
        axios.get(url)
            .then(resp => {
                setNetworks(resp.data);
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
                <CardContainer id={"cardsContainer"} list={networks} page={"network"}></CardContainer>
            </div>
        </div>
    );
}

export default Home;