import "../stylesheets/NavBar.css"
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
        <div>
            {icons.map((item,index)=>(
                <div key={index}>
                    {(document.title==="Home")?(item.icon===faUser || item.icon===faCog)?"":<NavBarIcon icon={item.icon} label={item.label}></NavBarIcon>:<NavBarIcon icon={item.icon} label={item.label}></NavBarIcon>}
                </div>
            ))}
        </div>
    );
}

export default NavBar;