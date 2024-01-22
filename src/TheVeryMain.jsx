import React from 'react'

import App from './App.jsx'
import './index.css'
import ItemDetailsPage from "./Pages/ItemDetailsPage.jsx"
import {Router, BrowserRouter,Routes, Route } from "react-router-dom"
import CategoryPage from './Pages/CategoryPage.jsx'
import AllItemsPage from './Pages/AllItemsPage.jsx'
import CartPage from './Pages/CartPage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import FAQPage from "./Pages/FAQPage.jsx"

export default function TheVeryMain(){

    const [theCart, setTheCart] = React.useState([])

    function handleAddToCart(obj){
        
        setTheCart([...theCart, obj])
        console.log("added "+ obj.title +" to the cart")
        
    }

    function handleRemoveFromCard(objToRemove){

        let temp = theCart
        let index = theCart.indexOf(objToRemove)

        if (index > -1) {
            temp.splice(index, 1);
        }
            
        setTheCart([...temp])
        console.log("removed " + objToRemove.title + " from the cart")
        
    }

    function showTheCart(){
        console.log(theCart.length)
        console.log(theCart)
    }

    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart} />}></Route>
            <Route path='/:itemName' element={<ItemDetailsPage  handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart}/>}></Route>
            <Route path='/category/:Category' element={<CategoryPage handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart} />}></Route>
            <Route path='/products' element={<AllItemsPage handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart} />}></Route>
            <Route path='/cart' element={<CartPage handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart} />}></Route>
            <Route path='/checkout' element={<CheckoutPage handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart} />}></Route>
            <Route path='/faq' element={<FAQPage handleAdd = {handleAddToCart} handleRemove = {handleRemoveFromCard} theCart={theCart} />} ></Route>
        </Routes>
    </BrowserRouter>
    )
}