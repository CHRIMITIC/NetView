import {useEffect,useStatus} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function NavBarIcon({icon,label}) {
    const navigate = useNavigate();
    const handleClick=()=>{
        switch(label){
            case "Logout":
                Cookies.remove("username");
                Cookies.remove("password")
                Cookies.set("loggedIn","false");
                Cookies.set("check","false");
                navigate("/");
                break;
            case "SignUp":
                navigate("/signup");
                break;
            case "Home":
                navigate("/home");
                break
            case "Settings":
                navigate("/settings");
                break
            default:
                return "";
        }
    }
    return(
        <div className="rounded-md text-sm font-semibold text-white bg-neutral-800 border-2 border-gray-200">
            <button onClick={handleClick}>
            <FontAwesomeIcon icon={icon}/>
            </button>
        </div>
    );
}

export default NavBarIcon;