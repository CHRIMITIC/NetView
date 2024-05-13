import React from 'react'
import {useEffect, useState} from 'react'
import '../stylesheets/Signup.css'
import axios from "axios";
import NavBar from "./NavBar.jsx";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus,faUserPlus} from "@fortawesome/free-solid-svg-icons";

function SignupForm() {
    const u=Cookies.get("username");
    const p=Cookies.get("password");
    const n=Cookies.get("nwId");
    const t=Cookies.get("type");
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
    const handleAdd=async (e) => {
        e.preventDefault();
        let flag=true
        let userText=document.getElementById("username").value;
        let pswText=document.getElementById("password").value;
        let typeText=document.getElementById("type").value;
        users.map((item)=>(
            item.map((l,i)=>{
                if(i===0){
                    if((l.toString()===userText)||(Cookies.get("username")===userText)){
                        flag=false
                    }else{
                        console.log(userText+","+pswText+","+typeText)
                    }
                }
            })
        ))
        if(flag){
            const url=`http://localhost:8080/api/add?username='${userText}'&password='${pswText}'&nwId='${Cookies.get("nwId")}'&type='${typeText}'`;
            axios.get(url)
                .then(resp => {
                    if(!resp.data){
                        alert("Operation failed")
                    }else{
                        location.reload()
                    }
                    console.log(resp.data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }else{
            alert("User already existing");
        }
    }
    const handleRemove=async (index) => {
        let flag=true
        let userText;
        let pswText;
        let typeText;
        users.map((item,ind)=> {
            if (index === ind) {
                item.map((l, i) => {
                    switch(i){
                        case 0:
                            userText=l;
                            break;
                        case 1:
                            pswText=l;
                            break
                        case 2:
                            typeText=l;
                            break;
                        default:
                            break;
                    }
                })
            }
        })
        const url=`http://localhost:8080/api/remove?username='${userText}'&password='${pswText}'&nwId='${Cookies.get("nwId")}'&type='${typeText}'`;
        axios.get(url)
            .then(resp => {
                if(!resp.data){
                    alert("Operation failed")
                }else{
                    location.reload()
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    return (
        <div id={"div"}>
            <div id={"navBar"}>
                <NavBar></NavBar>
            </div>
            <div id={"cardsContainer"}>
                <table border="1">
                    {t == ("Simple") ?
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Type</th>
                            </tr>
                            {users.map((item, index) => (
                                <tr key={index}>
                                    {item.map((l, i) => (
                                        <td key={i}>
                                            {l}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    : (t == "Admin") ?
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Type</th>
                                <th>Remove</th>
                            </tr>
                            {users.map((item, index) =>
                                <tr key={index}>
                                    {item.map((l, i) =>(
                                        <React.Fragment key={i}>
                                            <td>{l}</td>
                                            {(i === 2 && (l !== "Admin" && l !== "Owner")) &&
                                                <td key={3}>
                                                    <button onClick={() => handleRemove(index)}>
                                                        <FontAwesomeIcon icon={faUserMinus}/>
                                                    </button>
                                                </td>
                                            }
                                        </React.Fragment>
                                    ))}
                                </tr>
                            )}
                            <tr>
                                <td><input type={"text"} placeholder={"Username"} id={"username"}/></td>
                                <td><input type={"text"} placeholder={"Password"} id={"password"}/></td>
                                <td>
                                    <select id={"type"}>
                                        <optgroup label="Type">
                                            <option value={"Simple"}>Simple</option>
                                        </optgroup>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={handleAdd}><FontAwesomeIcon icon={faUserPlus}/></button>
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Type</th>
                                <th>Remove</th>
                            </tr>
                            {users.map((item, index) => (
                                <tr key={index}>
                                    {item.map((l, i) => (
                                        <td key={i}>
                                            {l}
                                        </td>
                                    ))}
                                    <td key={3}>
                                        <button onClick={() => handleRemove(index)}><FontAwesomeIcon
                                            icon={faUserMinus}/></button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td><input type={"text"} placeholder={"Username"} id={"username"}/></td>
                                <td><input type={"text"} placeholder={"Password"} id={"password"}/></td>
                                <td>
                                    <select id={"type"}>
                                        <optgroup label="Type">
                                            <option value={"Admin"}>Admin</option>
                                            <option value={"Simple"}>Simple</option>
                                        </optgroup>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={handleAdd}><FontAwesomeIcon icon={faUserPlus}/></button>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
}

export default SignupForm