import React from "react"
import "./ItemCard.css"
import { Link } from "react-router-dom"
import Popup from "./Popup"


export default function ItemCard(props) {


    let urlTo = props.item.title.replace("%20", " ")

    const [currItemCounter, setCurrItemCounter] = React.useState(0)

   


    React.useEffect(() => {

        let ccc = 0
        
        for (let i = 0; i < props.theCart.length; i++) {
            if (props.theCart[i].title === props.item.title) {
                ccc++
                console.log(props.theCart[i].title, props.item.title, ccc)
                
            }
            setCurrItemCounter(ccc)
        }
        if (props.theCart.length < 1){
                setCurrItemCounter(0)
        }
        
    }, [props.theCart])

    

    return (
        <div className="itemcard--maincontainer">

            <Link className="linkStyling" to={`/${urlTo}`}>
                <div className="itemcard--container">

                    <img draggable={false} src={`/${props.item.filename}`}></img>
                    <h2>{props.item.title}</h2>
                    <div className="itemcard--pricerating">
                        <h3 id="greencolor">${props.item.price}</h3>
                        <h3>{props.item.type.charAt(0).toUpperCase() + props.item.type.slice(1)}</h3>
                    </div>

                </div>
            </Link>


            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <button
                    className="itemcard--button"
                    style={{ color: "green" }}
                    onClick={() => {
                        props.handleAdd(props.item);

                    }}
                >+</button>

                <h4>{currItemCounter}</h4>

                <button
                    className="itemcard--button"
                    style={{ color: "red" }}
                    onClick={() => {
                        props.handleRemove(props.item);

                    }}
                >-</button>
            </div>

            {/* <h3>{props.item.rating}</h3> */}

        </div>
    )
}