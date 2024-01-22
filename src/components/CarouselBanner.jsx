import React from "react"
import "./CarouselBanner.css"
import Draggable from "./Draggable";
import { Link } from "react-router-dom";


export default function CarouselBanner(props){

    const [activeIndex, setActiveIndex] = React.useState(0)

    function updateIndex(newIndex){
        if(newIndex <0){
            newIndex = props.props.length -1;
        }
        else if (newIndex >= props.props.length){
            newIndex = 0
        }

        setActiveIndex(newIndex)
    }

    React.useEffect(()=>{
        console.log("useeffect ran")
        const bruh = setTimeout(() => setActiveIndex((activeIndex+1)%props.props.length), 5000);

        return ()=>{
            clearTimeout(bruh)
        }
        
    })
    

    return (
        <div className="carouselMainContainer">

            <Link to={"/products"}>
                <div className="carouselContainer" style={{transform: `translate(-${activeIndex *100}%)`}}>

                    {props.props.map((item) => {
                        return <div key={item} className="carouselItem"><img src={item} style={{width:"90%",aspectRatio:"1.78"}}></img></div>
                    })}
 
                </div>
            </Link>

            <div className="carouselButtons">
                <button className="carouselButtonAbsoluteL" onClick={()=>{updateIndex(activeIndex -1)}}>
                <span className="material-symbols-outlined">
                        keyboard_arrow_left
                </span>
                </button>
                
                <div>
                    {props.props.map((item,index)=>{
                        return <button className={`carouselPageIndicator ${index === activeIndex ? "carouselPageIndicatorActive" : ""}`} key={item} onClick={()=>{updateIndex(index)}}>
                            
                        </button>})}
                </div>
                
                <button className="carouselButtonAbsoluteR" onClick={()=>{updateIndex(activeIndex +1)}}>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_right
                    </span>
                </button>
            </div>

        </div>
        
    
    )
}

