import {useEffect,useStatus} from 'react';
import NavBarIcon from "../components/NavBarIcon.jsx";
import {faCog, faHome, faInfo, faSignOut, faUser} from "@fortawesome/free-solid-svg-icons";
function NavBar() {
    const icons = [
        { icon: faHome, label: 'Home' },
        { icon: faUser, label: 'SignUp' },
        { icon: faCog, label: 'Settings' },
        { icon: faInfo, label: 'About' },
        { icon: faSignOut, label: 'Logout' }
    ];
    return(
        <div className="flex flex-col items-center h-96 border-2 border-gray-200 float-left">
                {icons.map((item,index)=>(
                    <div key={index}>
                        <NavBarIcon icon={item.icon} label={item.label}></NavBarIcon>
                    </div>
                ))}
        </div>
    );
}

export default NavBar;