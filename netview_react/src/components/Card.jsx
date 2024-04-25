import React from 'react';
import {useEffect, useState} from 'react'
import '../stylesheets/Card.css'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import axios from "axios";
function Card({desc,page,i}) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [ip,setIp]=useState('');
    const [sm,setSm]=useState('');
    const [type,setType]=useState('');
    const [avPorts,setavPorts]=useState('');
    const [ports,setPorts]=useState([]);
    const [routes,setRoutes]=useState([])
    const [protocols,setProtocols]=useState([])
    const [anchor, setAnchor]=useState(null);
    const open= Boolean(anchor);
    let list
    let flag=false
    useEffect(()=>{
        const b=document.getElementById(i);
        if(desc.includes(";")) {
            list = desc.split(";")
            setName(list[0])
            setIp(list[1])
            setSm(list[2])
            setType(list[3])
            setavPorts(list[4])
            b.innerText = name;
        }
    },[])
    const handleClick=(e)=>{
        getSpecs("ports")
        getSpecs("routes")
        setAnchor(anchor ? null : e.currentTarget);
        if(page==="network"){
            Cookies.set("nwId",desc);
            navigate(`/${page}`)
        }
    }
    const getSpecs=async(api)=>  {
        const url=`http://localhost:8080/api/${api}?devName='${name}'&nwId='${Cookies.get("nwId")}'`;
        axios.get(url)
            .then(resp => {
                switch (api){
                    case "ports":
                        setPorts(resp.data)
                        break;
                    case "routes":
                        setRoutes(resp.data)
                        break;
                    case "protocols":
                        setProtocols(resp.data)
                        break;
                    default:
                        break;
                }

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
        });
    }
    const saveSpecs=async()=>{
        const n=name;
        const nw=Cookies.get("nwId");
        const nameText=document.getElementById("nameText "+i).value;
        const ipText=document.getElementById("ipText "+i).value;
        const smText=document.getElementById("smText "+i).value;
        const typeText=document.getElementById("typeText "+i).value;
        const url=`http://localhost:8080/api/saveChanges?devName='${n}'&nwId='${nw}'&newName='${nameText}'&newIp='${ipText}'&newSm='${smText}'&newType='${typeText}'`;
        axios.get(url)
            .then(resp => {
                if(!resp.data){
                    alert("Operation failed")
                }else{
                    if(Cookies.get("check")==="true"){
                        location.reload()
                    }
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
        });

    }
    const newNetwork=async ()=>{
        const ipText=document.getElementById("NewIp "+i).value;
        const smText=document.getElementById("NewSm "+i).value;
        const typeText=document.getElementById("NewType "+i).value;
        const url=`http://localhost:8080/api/newNetwork?ip='${ipText}'&sm='${smText}'&type='${typeText}'`;
        axios.get(url)
            .then(resp => {
                if(!resp.data){
                    alert("Operation failed")
                }else{
                    if(Cookies.get("check")==="true"){
                        location.reload()
                    }
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    const newDevice=async ()=>{
        const nw=Cookies.get("nwId");
        const nameText=document.getElementById("NewName "+i).value;
        const ipText=document.getElementById("NewIp "+i).value;
        const smText=document.getElementById("NewSm "+i).value;
        const typeText=document.getElementById("NewType "+i).value;
        const url=`http://localhost:8080/api/newDevice?name='${nameText}'&ip='${ipText}'&sm='${smText}'&type='${typeText}'&nwId='${nw}'`;
        axios.get(url)
            .then(resp => {
                if(!resp.data){
                    alert("Operation failed")
                }else{
                    if(Cookies.get("check")==="true"){
                        location.reload()
                    }
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
    const newPort=async ()=>{
        if(avPorts==0){
            alert("No more available ports")
        }else{
            const nw=Cookies.get("nwId");
            const newPort=document.getElementById("portText " + i).value
            const url=`http://localhost:8080/api/newPort?devName='${name}'&nwId='${nw}'&np='${newPort}'`;
            axios.get(url)
                .then(resp => {
                    if(!resp.data){
                        alert("Operation failed")
                    }else{
                        if(Cookies.get("check")==="true"){
                            location.reload()
                        }
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
            });
        }
    }
    const icons=[
        "./src/assets/Pc.png",
        "./src/assets/Router.png",
        "./src/assets/Server.png",
        "./src/assets/Switch.png"
    ]
    const PopupBody = styled('div')(
        ({ theme }) => `
          width: max-content;
          padding: 12px 16px;
          margin: 8px;
          border-radius: 8px;
          border: 1px solid #DAE2ED;
          background-color: #fff;
          box-shadow: 0px 4px 8px rgb(0 0 0 / 0.1);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.875rem;
          z-index: 1000;
          color:black;
        `,
    );
    return (
        <div id={"container"}>
            {/*{(page === "network" || page === "newnetwork" || page === "newdevice") ? desc : "Device " + name}*/}
            <button className={"info"} id={i} onClick={handleClick}>
                {(page === "network" || page === "newnetwork" || page === "newdevice") ? desc : "Device " + name}
            </button>
            <BasePopup id={i} open={open} anchor={anchor}>
                <PopupBody>
                    {(page === "") ?
                        <div>
                            <img className={"img"} src={(type === "Host") ? icons[0] : (type === "Router") ? icons[1] : (type === "Server") ? icons[2] : (type === "Switch") ? icons[3] : ""}/>
                            <input id={"nameText " + i} type="text" placeholder={name} defaultValue={name}/>
                            <input id={"ipText " + i} type="text" placeholder={ip} defaultValue={ip}/>
                            <input id={"smText " + i} type="text" placeholder={sm} defaultValue={sm}/>
                            <input id={"typeText " + i} type="text" placeholder={type} defaultValue={type}/>
                            <label>{avPorts}</label>
                            <br/>
                            <input id={"portText " + i} type="text" placeholder={"New Port"}/>
                            <button onClick={newPort}>+</button>
                            <br/>
                            {ports.map((item, index) => (
                                <div key={index}>
                                    {item.map((l, ind) => (
                                        (ind === 1) ?
                                            // <div key={ind}>
                                            <input key={ind} type="checkbox" id={"CheckBox " + index}
                                                   defaultChecked={(l === "Up")}></input>
                                            //     <label>{l}</label>
                                            // </div>
                                            : (ind === 0) ?
                                                <input type={"text"} key={ind} id={"Pname " + index} defaultValue={l}/>
                                                :
                                                <input type={"text"} key={ind} id={"Pconn" + index} defaultValue={l}/>

                                    ))}
                                </div>
                            ))}
                            <br/>
                            {(type === "Router") ?
                                routes.map((item, index) => (
                                    <div key={index}>
                                        <input type={"text"} id={"Route " + index} defaultValue={item}/>
                                    </div>
                                )) : ""
                            }
                            {(type === "Server") ?
                                protocols.map((item, index) => (
                                    <div key={index}>
                                        <button>
                                            {item}
                                        </button>
                                        <br/>
                                    </div>
                                )) : ""
                            }
                            <button onClick={saveSpecs}>Save</button>
                        </div>
                        : (page === "newnetwork") ?
                            <div>
                                <input id={"NewIp " + i} type="text" placeholder={"NetworkIp"}/>
                                <input id={"NewSm " + i} type="text" placeholder={"NetworkSm"}/>
                                <select id={"NewType " + i}>
                                    <option value={"Physical"}>Physical</option>
                                    <option value={"Vlan"}>Vlan</option>
                                </select>
                                <br/>
                                <button onClick={newNetwork}>Save</button>
                            </div>
                            :
                            <div>
                                <input id={"NewName " + i} type="text" placeholder={"DeviceName"}/>
                                <input id={"NewIp " + i} type="text" placeholder={"DeviceIp"}/>
                                <input id={"NewSm " + i} type="text" placeholder={"DeviceSm"}/>
                                <select id={"NewType " + i}>
                                    <option value={"Host"}>Host</option>
                                    <option value={"Router"}>Router</option>
                                    <option value={"Server"}>Server</option>
                                    <option value={"Switch"}>Switch</option>
                                </select>
                                <br/>
                                <button onClick={newDevice}>Save</button>
                            </div>
                    }
                </PopupBody>
            </BasePopup>
        </div>
    );
}

export default Card;