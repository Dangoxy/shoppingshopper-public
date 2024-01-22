import React from "react"
import { useParams } from "react-router-dom"
import {products2,products} from "/src/data.jsx"
import Navbar from "/src/components/Navbar.jsx"
import Footer from "/src/components/Footer"
import "./ItemDetailsPage.css"

export default function ItemDetailsPage(props){
    let params = useParams()
    const [quant, setQuant] = React.useState(0)
    let currentItem = products2.filter((item)=>{
        
        return item.title.toLowerCase() === params.itemName.toLowerCase()
    })
    console.log(currentItem)


    console.log(props.theCart)
    let sortedCart = props.theCart.sort(function(a,b){
        return (a.title).localeCompare(b.title)
    })

    console.log(sortedCart)

    let current = null;
    let count = 0;
    let itemsWithQuantities = []

    for(let i = 0; i < sortedCart.length; i++){
        if(sortedCart[i] != current){
            if(count > 0)
            {
                console.log(current.title + " " + count);
                itemsWithQuantities.push({item:current,qty:count})
            }
            current = sortedCart[i];
            count = 1;
        } else {
            count++;
        }
    }

    if(count > 0){
        console.log(current.title + " " + count);
        itemsWithQuantities.push({item:current,qty:count})
    }
    
    console.log(itemsWithQuantities)

    let [currentQty, setCurrentQty] = React.useState(0)

    React.useEffect(()=>{
        if (itemsWithQuantities.length !== 0){
        itemsWithQuantities.map((item)=>{
            console.log(item)
            item.item.title === currentItem[0].title ? setCurrentQty(item.qty) : ""
        })}
        else{
            setCurrentQty(0)
        }
    },[currentItem[0],props.theCart])

    console.log("current quantity: " + currentQty)
    

    let [thumbsupDis,setThumbsupDis] = React.useState(false)
    let [thumbsdownDis,setThumbsdownDis] = React.useState(false)
    let [ratingCount, setRatingCount] = React.useState(currentItem[0].rating)
    
    
    return(
        <div>
            <Navbar props={props} />

            <div className="itemDetails--mainContainer">
                <div className="itemDetails--up--section">

                    <div style={{borderBottom:"2px solid rgba(155,155,155,0.5)",width:"100%",display:"flex",justifyContent:"center"}}>
                        <img src={`/${currentItem[0].filename}`}></img>
                        
                    </div>

                    <div style={{display:"flex", gap:"20px",width:"100%", justifyContent:"space-around",alignItems:"start"}}>

                        

                        

                        <div>
                            <div className="itemDetails--text--section">
                                <div>
                                    <h1>{currentItem[0].title}</h1>
                                    <p style={{fontSize:"1.3rem"}}>Description: {currentItem[0].description}</p>
                                </div>
                                <h2 style={{width:"100%", textAlign:"center"}}>${currentItem[0].price}</h2>
                                <div style={{display:"flex", gap:"20px"}}>
                                    <h3>Rating: {ratingCount}</h3>
                                    <h3>Category: {currentItem[0].type}</h3>
                                </div>
                                
                                
                            </div>

                            <div className="itemDetails--down--section">
                                <h2>Quantity in cart: {currentQty}</h2>
                                <button className="itemDetails--buttons" onClick={()=>{props.handleAdd(currentItem[0])}}>Add To Cart</button>
                                <button className="itemDetails--buttons" onClick={()=>{props.handleRemove(currentItem[0])}}>Remove from Cart</button>
                            </div>

                            <div className="itemDetails--ratingSection">

                                <h3 style={{marginTop:"15px"}}>Do you like this item?</h3>

                                <div>
                                    <button disabled={thumbsupDis} 
                                    onClick={()=>{
                                        
                                        setThumbsupDis(true)
                                        if(thumbsdownDis){
                                            setThumbsdownDis(false)
                                            setRatingCount(ratingCount+2)    
                                        }else{
                                        setThumbsdownDis(false)
                                        setRatingCount(ratingCount+1)
                                        }
                                        
                                    }}>
                                        <span class="material-symbols-outlined">
                                            thumb_up
                                        </span>
                                    </button>

                                    <button disabled={thumbsdownDis}
                                    onClick={()=>{
                                        setThumbsdownDis(true)
                                        if(thumbsupDis){
                                            setThumbsupDis(false)
                                            setRatingCount(ratingCount-2)    
                                        }else{
                                        setThumbsupDis(false)
                                        setRatingCount(ratingCount-1)
                                        }
                                    }}>
                                        <span class="material-symbols-outlined">
                                            thumb_down
                                        </span>
                                    </button>

                                    <button onClick={()=>{
                                        if(thumbsupDis){
                                            setThumbsupDis(!thumbsupDis)
                                            setRatingCount(ratingCount-1)
                                        } else if(thumbsdownDis){
                                            setThumbsdownDis(!thumbsdownDis)
                                            setRatingCount(ratingCount+1)
                                        }
                                    }}>
                                        <span class="material-symbols-outlined">
                                            thumbs_up_down
                                        </span>
                                    </button>

                                </div>
                                
                            </div>


                        </div>

                    </div>

                </div>

                
            </div>


            <Footer />
        </div>
    )
}