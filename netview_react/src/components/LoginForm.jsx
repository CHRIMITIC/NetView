import {useEffect,useState} from 'react'
import '../stylesheets/Login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        if(Cookies.get('loggedIn')) {
            let c=(Cookies.get('loggedIn'));
            if(c==="false"){
                setLoggedIn(false);
            }else{
                setLoggedIn(true);
            }
        }
    },[])
    useEffect(() => {
        if(loggedIn){
            Cookies.set("username",username);
            Cookies.set("password",password);
            Cookies.set("loggedIn",loggedIn.toString());
            navigate("/home");
        }
    }, [loggedIn]);
    const handleLogin=async (e) => {
        e.preventDefault()
        const url=`http://localhost:8080/api/login?username='${username}'&password='${password}'`;
        axios.get(url)
            .then(resp => {
                setLoggedIn(resp.data);
                if(!resp.data){
                    alert("Not logged in");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm