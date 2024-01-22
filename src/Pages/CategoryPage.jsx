import React from "react"
import {useParams} from "react-router-dom"
import {products2} from "/src/data.jsx"
import ItemCard from "/src/components/ItemCard"
import Navbar from "/src/components/Navbar"
import Footer from "/src/components/Footer"
import "./CategoryPage.css"

export default function CategoryPage(props){
    let currentCategory = useParams().Category

    let itemsInCategory = products2.filter((item)=>{
        return item.type.toLowerCase() === currentCategory.toLowerCase()
    })

    let itemsAll = products2.map((item)=>{
        return (<ItemCard key={item.title} item = {item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} theCart = {props.theCart}/>)
    })

    let itemsToCards = itemsInCategory.map((item)=>{
        return (<ItemCard key={item.title} item = {item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} theCart = {props.theCart}/>)
    })

    
    

    console.log(currentCategory)

    return(
        <div className="categoryPage--mainContainer">
            <Navbar props={props} />
            <div>
                <h1 style={{margin:"5px 10px"}}>{currentCategory} category:</h1>

                <div className="CategoryPage--cardContainer">
                    {currentCategory === "All Products" ? itemsAll : itemsToCards}
                </div>
            </div>
            <Footer />
        </div>
    )
}