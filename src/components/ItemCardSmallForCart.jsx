import React from "react"
import "./ItemCardSmallForCart.css"
import {Link} from "react-router-dom"

export default function ItemCardSmallForCart(props){
    console.log(props)
    return(
        <div className="ItemCardSmallForCart--container">

            <Link to={`/${props.item.title}`}>
            <div style={{display:"flex"}}>
                <img src={`/${props.item.filename}`}></img>
            </div>
            </Link>
            
            <div style={{width:"100%"}}>
                <h2>{props.item.title}</h2>
                <h2>${props.item.price}</h2>
                
                <h2>Total: ${(props.item.price * props.qty).toFixed(2)}</h2>
                
            </div>

            <div 
            style={{
                display:"flex", 
                justifyContent:"space-around",
                alignItems:"center" ,
                flexDirection:"column",
                }}>

                <button 
                className="ItemCardSmallForCart--button" 
                style={{color:"green",cursor:"pointer"}}
                onClick={()=>{
                    props.handleAdd(props.item)
                    
                }}
                >+</button>
                <h2>{props.qty}</h2>
                <button 
                className="ItemCardSmallForCart--button" 
                style={{color:"red",cursor:"pointer"}}
                onClick={()=>{
                    props.handleRemove(props.item)
                }}
                >-</button>
            </div>
            
            
        </div>
    )
}