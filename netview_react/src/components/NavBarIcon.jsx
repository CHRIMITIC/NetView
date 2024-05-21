import "../stylesheets/NavBar.css"
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
            case "User":
                navigate("/user");
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
            case "About":
                navigate("/info");
                break
            default:
                return "";
        }
    }
    return(
        <button onClick={handleClick} className={"navbar"}>
            <FontAwesomeIcon icon={icon} className={"icon"}/>
        </button>
    );
}

export default NavBarIcon;
