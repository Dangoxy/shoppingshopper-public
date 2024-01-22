import React from "react"
import "/src/components/Navbar.css"
import { products2 } from "/src/data"
import {Link} from "react-router-dom"

import ItemCardSmall from "./ItemCardSmall"

export default function Navbar(props){
    

    
    let idk = products2.map((item)=>{
        return item.type
    })

    let tempSet = new Set([...idk])
    let tempArr = [...tempSet]

    let productsCategories = tempArr.map((item)=>{
        return <li key={item} style={{paddingTop:"10px"}}><Link className="navbar--right--sec--a" to={`/Category/`+item.charAt(0).toUpperCase() + item.slice(1)}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link></li>
    })

    

    let sortedCart = props.props.theCart.sort(function(a,b){
        return (a.title).localeCompare(b.title)
    })



    let current = null;
    let count = 0;
    let itemsWithQuantities = []

    for(let i = 0; i < sortedCart.length; i++){
        if(sortedCart[i] != current){
            if(count > 0)
            {
                itemsWithQuantities.push({item:current,qty:count})
            }
            current = sortedCart[i];
            count = 1;
        } else {
            count++;
        }
    }

    if(count > 0){
        itemsWithQuantities.push({item:current,qty:count})
    }
    
 

    let cartItems2 = itemsWithQuantities.map((grouped)=>{
        return(<ItemCardSmall key={grouped.item.title} item={grouped.item} handleAdd = {props.props.handleAdd} handleRemove = {props.props.handleRemove} qty = {grouped.qty}/>)
    })

    let cartItems = props.props.theCart.map((item) => {
        return(<ItemCardSmall key={item.title} item={item} handleAdd = {props.props.handleAdd} handleRemove = {props.props.handleRemove}/>)
    })

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

    },[props.props.theCart])

    
        

    return(
        <div className="navbar--container">

            <div className="navbar--left--section">
                <Link className="navbar--logotext" to={"/"}>Shopping Shopper</Link>
                
            </div>

            

            <div className="navbar--right--section">
                <div>
                    <a className="navbar--right--section--hiddable showProdList"><Link  className="navbar--right--sec--a" to={"/products"}>PRODUCTS</Link>
                    <ul className="invisProductsList">
                        <li style={{paddingTop:"10px"}}><Link className="navbar--right--sec--a" to={`/products`}>All Products</Link></li>
                        {productsCategories}
                    </ul></a>
                    
                </div>
                <div>
                    <Link to={"/faq"} className="navbar--right--section--hiddable navbar--right--sec--a">FAQ</Link>
                </div>
                <div>
                    <a className="navbar--cart--list--handle">
                        <Link className="navbar--cart--atag navbar--right--sec--a" to={"/cart"}>CART {props.props.theCart.length !== 0 ? "(" + props.props.theCart.length +")" : ""}</Link>
                        <div className="navbar--cart--list">
                            <h1>Cart</h1>
                            {cartItems2}
                            <div style={{display:"flex"}}>

                                <Link className="navbar--cart--button" to={"/cart"}>
                                    Check cart
                                </Link>

                                <Link className="navbar--cart--button" to={"/checkout"}>
                                    Checkout
                                </Link>
                            </div>

                            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

                            
                        </div>
                    </a>
                    
                </div>
                
            </div>
            
        </div>
    )
}