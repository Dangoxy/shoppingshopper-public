import React from "react"
import { useParams,Link } from "react-router-dom"
import {products2,products} from "/src/data.jsx"
import Navbar from "/src/components/Navbar.jsx"
import Footer from "/src/components/Footer"
import "./CartPage.css"
import ItemCardSmallForCart from "/src/components/ItemCardSmallForCart"

export default function CartPage(props){
    
    console.log(props)

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

    const [totalPrice, setTotalPrice] = React.useState(0)

    React.useEffect(()=>{
        setTotalPrice(0)
        let idk = itemsWithQuantities.map((item)=>{
            return item.item.price * item.qty
        })
        let tempTotalPrice = 0
        for (let i = 0; i<idk.length; i++){
            tempTotalPrice += idk[i]
        }

        setTotalPrice(tempTotalPrice)

    },[props.theCart])

    let cartItems2 = itemsWithQuantities.map((grouped)=>{
        return(<ItemCardSmallForCart item={grouped.item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} qty = {grouped.qty}/>)
    })
    
    
    
    return(
        <div>
            <Navbar props={props} />

            <div className="cartPage--mainContainer">

                <h1>The cart</h1>
                <div className="cartPage--itemsContainer">
                    {cartItems2}
                </div>
                <h2 style={{paddingTop:"20px"}}>Total price: ${totalPrice.toFixed(2)}</h2>
                <Link className="cartPage--button" to={"/checkout"}>Checkout</Link>
                
            </div>


            <Footer />
        </div>
    )
}