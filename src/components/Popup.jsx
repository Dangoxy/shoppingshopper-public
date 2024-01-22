import React from "react"

export default function Popup(props){
    let noneVar= props.visibility ? "flex" : `none`

    

    let Visisble = props.visibility ? {
        position:"fixed",bottom:"10px",width:"100%",boxSizing:"border-box",
        display:"flex",justifyContent:"center",alignItems:"center"
        } : 
        {
        position:"fixed",bottom:"10px",width:"100%",boxSizing:"border-box",
        display:"flex",justifyContent:"center",alignItems:"center",padding:"20px", display:noneVar
        }

    let colorTemp = props.color === "green" ?
        {color:"rgba(255,255,255,1)",backgroundColor:"rgba(0,200,0,0.95)",textShadow:"2px 2px 1px rgba(0,0,0,1)",
        fontWeight:"600", border:"2px solid rgba(0,0,0,0.5)",padding:"20px 40px",
        width:"40%",textAlign:"center",borderRadius:"10px"} :
        {color:"rgba(255,255,255,1)",backgroundColor:"rgba(200,0,0,0.95)",textShadow:"2px 2px 1px rgba(0,0,0,1)",
        fontWeight:"600", border:"2px solid rgba(0,0,0,0.5)",padding:"20px 40px",
        width:"40%",textAlign:"center",borderRadius:"10px"}

     
    return(
        
        <div style={Visisble}> 
            <h3 style={colorTemp}>
                {props.text}</h3>
        </div>
    )
}