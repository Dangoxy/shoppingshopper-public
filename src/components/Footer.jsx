import React from "react"
import "./Footer.css"

export default function Footer(){
    return(
        <div className="footer--container">
            <h4>Developed by: Ammar Abdelwadoud<br/>
            <a 
            href="https://www.linkedin.com/in/ammar-abdelwadoud-20457a272/" 
            target="_blank"
            style={{textDecoration:"none",color:"rgb(137,124,225)"}}>
                LinkedIn: Ammar Abdelwadoud
                </a>
            </h4>
            
        </div>
    )
}