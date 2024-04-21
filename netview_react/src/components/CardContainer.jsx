import {useEffect, useState, useStatus} from 'react';
import Card from "../components/Card.jsx";
import axios from "axios";
function CardContainer({list,page}) {
    return(
        <div className="grid grid-cols-4 h-96 border-2 border-gray-200 float-right gap-5">
            {list.map((item,index) => (
                <div key={index} className="border-2 border-gray-200">
                    <Card desc={item} page={page} i={index}></Card>
                </div>
            ))}
        </div>
    );
}

export default CardContainer;