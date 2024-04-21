import {useEffect,useStatus} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
function NavBarIcon({icon,label}) {
    const navigate = useNavigate();
    const handleClick=()=>{
        switch(label){
            case "Logout":
                //elimina cookies
                navigate("/");
                break;
            case "SignUp":
                navigate("/signup");
                break;
            default:
                return "";
        }
    }
    return(
        <div className="rounded-md text-sm font-semibold text-white bg-neutral-800 border-2 border-gray-200">
            <button onClick={handleClick}>
            <FontAwesomeIcon icon={icon}/>
            {/*<span>{label}</span>*/}
            </button>
        </div>
    );
}

export default NavBarIcon;