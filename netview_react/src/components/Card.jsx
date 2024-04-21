import {useEffect, useState} from 'react'
import '../stylesheets/Card.css'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function Card({desc,page,i}) {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [ip,setIp]=useState('');
    const [type,setType]=useState('');
    const [sm,setSm]=useState('');
    let list
    useEffect(()=>{
        console.log(i)
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
    const handleClick=()=>{
        if(page=="network"){
            Cookies.set("nwId",desc);
            navigate(`/${page}`)
        }else{
            alert(name+","+ip+","+sm+","+type);
        }
    }
    return(
        <button id={i} className="bg-amber-500" onClick={handleClick}>{(page=="network")?desc:name}</button>
    );
}
export default Card;