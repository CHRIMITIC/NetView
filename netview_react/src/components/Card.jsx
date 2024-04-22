import React from 'react';
import {useEffect, useState} from 'react'
import '../stylesheets/Card.css'
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
function Card({desc,page,i}) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [ip,setIp]=useState('');
    const [type,setType]=useState('');
    const [sm,setSm]=useState('');
    const [anchor, setAnchor] = React.useState(null);
    const [image,setImage]=React.useState('');
    const location=useLocation();
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
            switch (type){
                case "Host":
                    setImage(icons[0]);
                    break;
                case "Router":
                    setImage(icons[1]);
                    break;
                case "Server":
                    setImage(icons[2]);
                    break;
                case "Switch":
                    setImage(icons[3]);
                    break;
                default:
                    break;
            }
            console.log(image.toString())
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
          border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
          background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
          box-shadow: ${
                    theme.palette.mode === 'dark'
                        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
                        : `0px 4px 8px rgb(0 0 0 / 0.1)`
                };
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.875rem;
          z-index: 1000;
          color:black;
        `,
    );
    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };
    return (
        <div>
            <button id={i} className="text-black" onClick={handleClick}>
                {(page == "network") ? desc : name}
            </button>
            <BasePopup id={i} open={open} anchor={anchor}>
                <PopupBody>
                    <img src="src/assets/Pc.png"></img>
                    <input id={"Input " + i} type="text" placeholder={name} defaultValue={name}/>
                    {name + "," + ip + "," + sm + "," + type}
                    <br/>
                    <button>Save</button>
                </PopupBody>
            </BasePopup>
        </div>
    );
}

export default Card;