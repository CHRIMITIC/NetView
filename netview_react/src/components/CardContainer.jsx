import Card from "../components/Card.jsx";
import "../stylesheets/Card.css";
function CardContainer({list,page}) {
    return(
        <div id={"cardContainer"}>
            <Card desc={"+"} page={(page==="network")?"newnetwork":"newdevice"} i={0}></Card>
            {list.map((item, index) => (
                <div key={(index+1)}>
                    <Card desc={item} page={page} i={(index+1)}></Card>
                </div>
            ))}
        </div>
    );
}

export default CardContainer;