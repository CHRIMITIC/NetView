import Card from "../components/Card.jsx";
function CardContainer({list,page}) {
    return(
        <div className="grid grid-cols-4 h-96 border-2 border-gray-200 float-right gap-5">
            <div className="border-2 border-gray-200">
                <Card desc={"+"} page={(page==="newtwork")?"nenetwork":"newdevice"} i={0}></Card>
            </div>
            {list.map((item, index) => (
                <div key={(index+1)} className="border-2 border-gray-200">
                    <Card desc={item} page={page} i={(index+1)}></Card>
                </div>
            ))}
        </div>
    );
}

export default CardContainer;