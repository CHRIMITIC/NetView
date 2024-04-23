import React from 'react';
import {useEffect, useState} from 'react'
import '../stylesheets/Card.css'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
function Card({desc,page,i}) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [ip,setIp]=useState('');
    const [sm,setSm]=useState('');
    const [type,setType]=useState('');
    const [anchor, setAnchor]=useState(null);
    const open= Boolean(anchor);
    let list
    useEffect(()=>{
        const b=document.getElementById(i);
        if(desc.includes(";")){
            list=desc.split(";")
            setName(list[0])
            setIp(list[1])
            setSm(list[2])
            setType(list[3])
            b.innerText=name;
        }
    },[])
    const handleClick=(e)=>{
        setAnchor(anchor ? null : e.currentTarget);
        if(page=="network"){
            Cookies.set("nwId",desc);
            navigate(`/${page}`)
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
        <div>
            <button id={i} className="text-black" onClick={handleClick}>
                {(page==="network" || page==="newnetwork" || page==="newdevice") ? desc : name}
            </button>
            <BasePopup id={i} open={open} anchor={anchor}>
                <PopupBody>
                    {(page==="")?
                        <div>
                        <img src={(type==="Host")?icons[0]:(type==="Router")?icons[1]:(type==="Server")?icons[2]:icons[3]}></img>
                        <input id={"nameText " + i} type="text" placeholder={name} defaultValue={name}/>
                        <input id={"ipText " + i} type="text" placeholder={ip} defaultValue={ip}/>
                        <input id={"smText " + i} type="text" placeholder={sm} defaultValue={sm}/>
                        <input id={"typeText " + i} type="text" placeholder={type} defaultValue={type}/>
                        <br/>
                        <button>Save</button>
                        </div>
                    :(page==="newnetwork") ?
                        <div>
                            <input id={"Input " + i} type="text" placeholder={name} defaultValue={name}/>
                            {name + "," + ip + "," + sm + "," + type}
                            <br/>
                            <button>Save</button>
                        </div>
                    :
                        <div>
                            <input id={"Input " + i} type="text" placeholder={name} defaultValue={name}/>
                            {name + "," + ip + "," + sm + "," + type}
                            <br/>
                            <button>Save</button>
                        </div>
                    }
                </PopupBody>
            </BasePopup>
        </div>
    );
}

export default Card;