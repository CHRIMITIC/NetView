import {useEffect, useState} from 'react'
import '../stylesheets/Signup.css'
import axios from "axios";

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nwId, setNwId] = useState('');
    const [type, setType] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
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
            {loggedIn ? (
                <div>
                    <h2>Benvenuto, {username}!</h2>
                    <button onClick={() => setLoggedIn(false)}>Logout</button>
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default SignupForm