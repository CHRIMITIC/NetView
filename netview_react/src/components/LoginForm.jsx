import { useEffect, useState } from 'react';
import '../stylesheets/Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [loggedIn, setLoggedIn] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('loggedIn') === "true") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            if (document.getElementById("checkbox").checked) {
                Cookies.set("check", "true")
            } else {
                Cookies.set("check", "false")
            }
            Cookies.set("username", username);
            Cookies.set("password", password);
            Cookies.set("loggedIn", loggedIn.toString());
            navigate("/home");
        }
    }, [loggedIn]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const resp = await axios.post('http://localhost:8080/api/login', [username, password]);
        setResponse(resp.data);
        if (!resp.data) {
            alert("Not logged in");
        }
        setLoggedIn(resp.data);
    };

    return (
        <div id="Container">
            <form onSubmit={handleLogin}>
                <div id="Login">
                    <h2 id={"h2"}>LOGIN</h2>
                </div>
                <input type="text" placeholder="Username" id="username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <div style={{width:'100%'}}>
                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" id="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <br/>
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </IconButton>
                </div>
                <div id="box">
                    <div id="check">
                        <Checkbox id="checkbox" size="small"></Checkbox>
                        <label htmlFor="checkbox" id="label">Remind Me</label>
                    </div>
                    <a id="link" href="https://mail.google.com" target="blank">Forgot Password?</a>
                </div>
                <Button variant="contained" type="submit" id="button">Login</Button>
            </form>
        </div>
    );
}

export default LoginForm;