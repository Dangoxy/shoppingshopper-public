import React from "react"
import "./CategoryCard.css"
import {Link} from "react-router-dom"






export default function CategoryCard(props){

    
          
        
    
    return(
        <Link to={props.name.toLowerCase() === "products" ? 
        `products` : `/category/${props.name}`} style={{textDecoration:"none"}}>
            <div className="CategoryCardContainer" style={{
                background: `linear-gradient(${Math.floor(Math.random()*90)}deg, rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 25)} ,${Math.floor(Math.random() * 255)},0.8)
                                                    ,rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 25)},${Math.floor(Math.random() * 255)},0.8))`}}>
                <h2>{props.name}</h2>
            </div>
        </Link>
    )
}