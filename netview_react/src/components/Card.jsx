import {useEffect, useState} from 'react'
import '../stylesheets/Card.css'
function Card({desc}) {
    return(
        <p>{desc}</p>
    );
}

export default Card;