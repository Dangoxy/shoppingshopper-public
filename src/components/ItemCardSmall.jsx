import React from "react"
import "./ItemCardSmall.css"
import { Link } from "react-router-dom"

export default function ItemCardSmall(props){

    return(
        
        <div className="ItemCardSmall--container">

            <Link to={`/${props.item.title}`}>
            <div style={{display:"flex"}}>
                <img src={`/${props.item.filename}`}></img>
            </div>
            </Link>
            
            <div style={{width:"100%"}}>
                <h4>{props.item.title}</h4>
                <h4>${props.item.price}</h4>
                
                <h4>Total: ${(props.item.price * props.qty).toFixed(2)}</h4>
                
            </div>

            <div 
            style={{
                display:"flex", 
                justifyContent:"space-around",
                alignItems:"center" ,
                flexDirection:"column",
                }}>

                <button 
                className="itemcardsmall--button" 
                style={{color:"green",cursor:"pointer"}}
                onClick={()=>{
                    props.handleAdd(props.item)
                    
                }}
                >+</button>
                <h4>{props.qty}</h4>
                <button 
                className="itemcardsmall--button" 
                style={{color:"red",cursor:"pointer"}}
                onClick={()=>{
                    props.handleRemove(props.item)
                }}
                >-</button>
            </div>           
        </div>
        
    )
}