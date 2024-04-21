import {useEffect, useState} from 'react'
import '../stylesheets/Signup.css'
import axios from "axios";
import NavBar from "./NavBar.jsx";
import Cookies from "js-cookie";

function SignupForm() {
    const u=Cookies.get("username");
    const p=Cookies.get("password");
    const n=Cookies.get("nwId");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nwId, setNwId] = useState('');
    const [type, setType] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        getUsers();
    },[]);
    const getUsers=()=>{
        const url=`http://localhost:8080/api/users?username='${u}'&password='${p}'&nwId='${n}'`;
        axios.get(url)
            .then(resp => {
                setUsers(resp.data);
                // console.log(resp.data)
                // if(!resp.data){
                //     alert("Not logged in");
                // }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    const handleSignup=async (e) => {
        e.preventDefault();
        const url=`http://localhost:8080/api/signup?username='${username}'&password='${password}'&nwId='${nwId}'&type='${type}'`;
        axios.get(url)
            .then(resp => {
                setLoggedIn(resp.data);
                console.log(resp.data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    return (
        <div>
            <div className="app-container h-full w-full">
                <NavBar></NavBar>
                <table border="1">
                    <tr><td>Username</td><td>Password</td><td>Type</td><td>NetworkId</td></tr>
                    {users.map((item,index)=>(
                        <tr key={index}>
                            {item.map((l,i)=>(
                                <td key={i}>{l}</td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
            <div>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
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
                    <input
                        type="text"
                        placeholder="NwId"
                        value={nwId}
                        onChange={(e) => setNwId(e.target.value)}
                    />
                    <br/>
                    <input
                        type="text"
                        placeholder="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <br/>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm