import React from "react"
import Navbar from "/src/components/Navbar"
import Footer from "/src/components/Footer"
import { products2 } from "/src/data"
import ItemCard from "/src/components/ItemCard"
import "./AllItemsPage.css"

export default function AllItemsPage(props){

    

    let AllItems = products2.map((item)=>{
        return (<ItemCard key={item.title} item = {item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} theCart = {props.theCart}/>)
    })

    const [allCheckies,setAllCheckies] = React.useState([])

    React.useEffect(()=>{

        let idk1 = products2.map((item)=>{
            return item.type
        })

        let tempSet = new Set([...idk1])
        let tempArr = [...tempSet]

        let idk2 = tempArr.map((item)=>{
            let itemsInCat = products2.filter((oneItem) =>{
                return oneItem.type === item
            })
            let count = itemsInCat.length
            
            return {name: item, checkstate: false, count: count}
        })

        setAllCheckies(idk2)
    },[1])
    


    let idkCheckies = allCheckies.map((current)=>{
        return(
            <div>
                <input className="checkboxForFilters"
                checked={current.checkstate} 
                value={current.name}
                id={current.name}
                onChange={()=>{
                    let temp = allCheckies.map((old) =>{
                        /* old.name === current.name ? console.log(old.name, !old.checkstate) : "" */
                        return old.name === current.name ? ({name:current.name,checkstate:!current.checkstate,count:current.count}) : (old)
                    })
                    setAllCheckies(temp)

                    
                }}
                type="checkbox">
                </input>
                
                <label htmlFor={current.name}>
                    {" " + current.name.charAt(0).toUpperCase() + current.name.slice(1)} 
                    <span className="countForFilters"> ({current.count})</span>
                </label>
            </div>
        )
    })

    const [itemsWithChecks, setItemsWithChecks] = React.useState([])

    React.useEffect(()=>{
        let tempArr = []

        allCheckies.map((item) =>{
            if (item.checkstate){
                let cuu = products2.filter((one) =>{
                    return one.type === item.name
                })
                tempArr = [...tempArr, ...cuu]
            }
                
                 
        })

        setItemsWithChecks(tempArr)

    },[allCheckies])

    const[showFilterList,setShowFilterList] = React.useState(false)

    return(
        <div>
            <Navbar props={props} />
            <div className="AllItemsPage--mainContainer">

                <div className="AllItemsPage--Sidebar">

                    <h2>Filters: </h2>

                    <div>    
                        {idkCheckies}
                    </div>
                    
                </div>
                
                <button 
                className="AllItemsPage--filterListButton"
                style={{position:"absolute",background:"none",border:"none",padding:"10px"}}
                onClick={()=>{
                    setShowFilterList((old)=>{return !old})
                    console.log("clicked")
                    console.log(showFilterList)
                }}>
                    <span 
                    style={{position:"absolute",zIndex:"100"}}
                    class="material-symbols-outlined">
                    list
                    </span>
                </button>
                
                <div className="AllItemsPage--SidebarWithIcon" style={showFilterList? {} :{display:"none"}}>

                    <h2>Filters: </h2>

                    <div>    
                        {idkCheckies}
                    </div>
                    
                </div>

                <div className="AllItemsPage--CardContainer">
                    {itemsWithChecks.length !== 0 ? itemsWithChecks.map((item)=>{
                        return (<ItemCard key={item.title} item = {item} handleAdd = {props.handleAdd} handleRemove = {props.handleRemove} theCart ={props.theCart}/>)
                    }) : AllItems}
                </div>

            </div>
            <Footer />
        </div>
    )
}