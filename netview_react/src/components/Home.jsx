// import {useEffect, useState} from 'react'
// import '../stylesheets/Home.css'
// import axios from "axios";
// import Card from "../components/Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faInfo, faSignOut } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/Home.css'
function Home() {
    const icons = [
        { icon: faHome, label: 'Home' },
        { icon: faUser, label: 'Profile' },
        { icon: faCog, label: 'Settings' },
        { icon: faInfo, label: 'About' },
        { icon: faSignOut, label: 'Logout' }
    ];

    const getRandomDescription = () => {
        const descriptions = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                {icons.map((item, index) => (
                    <div key={index} className="icon">
                        <FontAwesomeIcon icon={item.icon}/>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="main-content">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="card">
                        <h2>Card {index + 1}</h2>
                        <p>{getRandomDescription()}</p>
                    </div>
                ))}
            </div>

        </div>
    );
    // return (
    //     <div id="container">
    //         <ul>
    //             <li>
    //                 <Card></Card>
    //             </li>
    //             <li>
    //                 <Card></Card>
    //             </li>
    //             <li>
    //                 <Card></Card>
    //             </li>
    //             <li>
    //                 <Card></Card>
    //             </li>
    //         </ul>
    //     </div>
    // );
}

export default Home;