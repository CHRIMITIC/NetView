import {useEffect,useStatus} from 'react';
import Card from "../components/Card.jsx";
function CardContainer() {
    const desc = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ];
    return(
        <div className="grid grid-rows-4 h-96 border-2 border-gray-200 float-right">
            {desc.map((item,index)=>(
                <div key={index} className="border-2 border-gray-200">
                    <Card desc={item}></Card>
                </div>
            ))}
        </div>
    );
}

export default CardContainer;