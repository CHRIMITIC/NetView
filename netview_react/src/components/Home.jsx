import { faHome, faUser, faCog, faInfo, faSignOut } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/Home.css'
import NavBar from "../components/NavBar.jsx";
import CardContainer from "../components/CardContainer.jsx";
function Home() {


    return (
        <div className="app-container h-full w-full">
            <NavBar></NavBar>
            <CardContainer></CardContainer>
        </div>
    );
}

export default Home;