import React from 'react'
import Navbar from './components/Navbar'
import "./App.css"
import ItemCard from './components/ItemCard.jsx'
import Footer from "./components/Footer.jsx"
import CarouselBanner from "./components/CarouselBanner.jsx"

import Draggable from "./components/Draggable.jsx"

import {products, products2, banners} from "./data.jsx"
import CategoryCard from './components/CategoryCard.jsx'

import {useLocation} from "react-router-dom"

export default function App(props) {


  console.log(products2)
  

  let AllProducts = products.map((item) => {
    /* console.log(item) */
    return (<ItemCard key={item.title} item = {item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} theCart = {props.theCart}/>)
  })

  let FeaturedProducts = products2.slice(0,9).map((item) => {
    /* console.log(item) */
    return (<ItemCard key={item.title} item = {item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} theCart = {props.theCart}/>)
  })


  let idk = products2.map((item)=>{
    return item.type
  })

  let tempSet = new Set([...idk])
  let tempArr = [...tempSet]

  let productsCategories = tempArr.map((item)=>{
      return <CategoryCard key={item} name ={item.charAt(0).toUpperCase() + item.slice(1)} />
      
  })


  /* All items shown in a grid
  <div className='grocItems--maincontainer'>
      <div className='grocItems--container'>
        {idk}
      </div>
      
    </div> */

  

  return(
    <div>
    <Navbar props={props} />

    <div className='mainContent'>
      <div>
        <div className='appCarouselContainer'>
          <CarouselBanner props={banners} />
        </div>

        <div className='featuredItemsContainer'>
          <h1>Featured Items</h1>
          <Draggable>
            <div className='ScrollableItems'>
                {FeaturedProducts}
            </div>
          </Draggable>
        </div>


        
        <div style={{padding:"20px"}}>
          <h1 style={{paddingBottom:"20px"}}>Featured Catagories</h1>
          <div className="categoriesContainerGrid">

            <CategoryCard key={"Products"} name = {"Products"} />

            {productsCategories}
          </div>
        </div>

      </div>
    </div>

    
    
    <Footer />
    </div>
  )
  

}

