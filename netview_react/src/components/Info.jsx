import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "./NavBar.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/Signup.css"

function Info {
    return (
        <div  id={"div"}>
            <div id={"navBar"}>
                <NavBar></NavBar>
            </div>
            <div id={"signupContainer"}>
                <p>NetView è una soluzione innovativa progettata per semplificare e rendere immediata la gestione delle reti aziendali, scolastiche o private. Il nostro obiettivo è offrire un'interfaccia intuitiva che permetta agli utenti di visualizzare i componenti fisici della rete e accedere alle loro specifiche tecniche, quali indirizzi IP, netmask, porte e protocolli. Grazie a NetView, gli amministratori di rete avranno la possibilità di modificare questi parametri direttamente dall'interfaccia, migliorando l'efficienza della gestione. Gli utenti con permessi limitati potranno invece esplorare la topologia della rete e analizzarne i dettagli, fornendo suggerimenti agli amministratori per ottimizzarne velocità e sicurezza. Con NetView, miriamo a rendere la gestione delle reti più accessibile, collaborativa e sicura.</p>
            </div>
        </div>
    );
}

export default Info;
