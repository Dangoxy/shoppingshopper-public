import React from "react"
import { useRef } from "react"
import Navbar from "/src/components/Navbar"
import Footer from "/src/components/Footer"
import "./CheckoutPage.css"
import emailjs from 'emailjs-com';


import Popup from "/src/components/Popup"



export default function CheckoutPage(props){


    const [notificationPopup,setNotificationPopup] = React.useState({visibility:false,color:"green",text:""})
    const [submitTriggered, setSubmitTriggered] = React.useState(false)

    function notiShow(theColor,theText){
        console.log(theText)
        setNotificationPopup({visibility:true,color:theColor,text:theText})

        setTimeout(()=>{
            setNotificationPopup({visibility:false,color:theColor,text:theText})
        },2000)

    }

    
    


    let sortedCart = props.theCart.sort(function(a,b){
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

    const [itemReciept, setItemReciept] = React.useState([])
    const [itemRecieptHTML,setItemRecieptHTML] = React.useState("")

    React.useEffect(()=>{
        setItemRecieptHTML("")
        let tempItemReciept = itemsWithQuantities.map((item)=>{
            return(
                <div>
                    <h5 style={{margin:"0"}}>{item.item.title}</h5>
                    <h5 style={{margin:"0"}}>${item.item.price} x {item.qty} = ${(item.item.price*item.qty).toFixed(2)}</h5>
                    <h5 style={{margin:"10px 0px"}}>------------------------------------</h5>
                </div>
            )
        })

        let tempString = ""
        for (let i=0; i<itemsWithQuantities.length; i++){
            
            if(tempString === ""){
                tempString = `${itemsWithQuantities[i].item.title} <br/>$${itemsWithQuantities[i].item.price} x ${itemsWithQuantities[i].qty} = $${(itemsWithQuantities[i].item.price*itemsWithQuantities[i].qty).toFixed(2)} <br/><br/>------------------------------------<br/><br/>`
            }
            else{    
                tempString = tempString + `${itemsWithQuantities[i].item.title} <br/>$${itemsWithQuantities[i].item.price} x ${itemsWithQuantities[i].qty} = $${(itemsWithQuantities[i].item.price*itemsWithQuantities[i].qty).toFixed(2)} <br/><br/>------------------------------------<br/><br/>`    
            }
            if(i+1 === itemsWithQuantities.length){
                tempString = tempString + `<span style="font-size:0.9rem; text-align:center">Total price: $${totalPrice.toFixed(2)} <br/>Price including delivery<br/>fee: $${(Number(totalPrice)+5).toFixed(2)}</span>`
            }
            
            console.log(i+1 +" " + itemsWithQuantities.length)
            console.log(tempString)
            setItemRecieptHTML(tempString)

            setItemReciept(tempItemReciept)
            
        }
        
        
    },[props.theCart,totalPrice])
    
    React.useEffect(()=>{
        setUserInput({...userInput,idktest:itemRecieptHTML})
    },[itemReciept])
    

    const [userInput, setUserInput] = React.useState({
        fullname:"",
        email:"",
        number:"",
        area:"",
        block:"",
        street:"",
        avenue:"",
        building:"",
        floor:"",
        apartment:"",
        additional:"",
        idktest:itemRecieptHTML})

    React.useEffect(()=>{
        
        
        setUserInput({...userInput,idktest:itemRecieptHTML})
    },[itemReciept])
    


    const form = useRef();

    function handleOnClick(e){
        e.preventDefault()
        console.log(userInput)
        setSubmitTriggered(true)

        if (userInput.fullname.length > 1 &&
        (userInput.email.length > 9 && userInput.email.includes("@")) &&
        userInput.number.length > 7 &&
        userInput.area !== "" &&
        userInput.block !== "" &&
        userInput.street !== "" &&
        userInput.avenue !== "" &&
        userInput.building !== "" &&
        userInput.floor !== "" &&
        userInput.apartment !== "" &&
        props.theCart.length !==0){

            console.log(
                userInput.area !== "" ,
                userInput.block !== "" ,
                userInput.street !== "" ,
                userInput.avenue !== "" ,
                userInput.floor !== "" ,
                userInput.apartment !== "" ,
                props.theCart.length !== 0
            )

              
            emailjs.sendForm('---', '---', form.current, '---')
            .then((result) => {
            
            console.log(result.text);

            if(result.text === "OK"){

                emailjs.sendForm('---', '---', form.current, '---')
                .then((result) => {
            
                    console.log(result.text);
                    notiShow("green","Thank you for ordering from ShoppingShopper!")
                    setUserInput({
                        fullname:"",
                        email:"",
                        number:"",
                        area:"",
                        block:"",
                        street:"",
                        avenue:"",
                        building:"",
                        floor:"",
                        apartment:"",
                        additional:"",
                        idktest:itemRecieptHTML})
                    setSubmitTriggered(false)
                
                    }, (error) => {console.log(error.text);notiShow("red",error.text)}
                );
            }
            
        }, (error) => {
            console.log(error.text);
            notiShow("red",error.text)
            
        }); 

        } 
        else if(props.theCart.length === 0){
            notiShow("red","Cart empty, try adding some items first.")  
        }
        else{
            notiShow("red","Please enter data correctly.")  
        }

 

        
    
    }

    return(
        <div>
            <Navbar props={props} />

            <div className="checkoutPage--mainContainer">

                <div>
                    <h1>Order summary</h1>
                    <div style={{border:"1px solid black",padding:"20px"}}>
                        {itemReciept}
                        <h5 style={{margin:"0"}}>Total price: ${totalPrice.toFixed(2)}</h5>
                        <h5 style={{margin:"0"}}>Price including delivery fee:</h5>
                        <h5 style={{margin:"0"}}>${Number(totalPrice.toFixed(2))+5}</h5>
                    </div>
                </div>

                <h1>Billing details</h1>
                <form ref={form} id="infoForm" className="checkoutPage--formContainer">
                    <div className="checkoutPage--info">
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.fullname === "" ? "Required *" : ""}</h4>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && (!(userInput.fullname.length > 1) && userInput.fullname !== "") ? "Please enter a name using more than 2 characters." : ""}</h4>
                        <input value={userInput.fullname || ""} onChange={(e)=>{setUserInput({...userInput,fullname: e.target.value})}}  placeholder="Full name" name="FullName"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.email === "" ? "Required *" : ""}</h4>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && (!((userInput.email.length > 9) && (userInput.email.includes("@"))) && userInput.email !== "") ? "Email must contain (@)." : ""}</h4>
                        <input type="email" value={userInput.email || ""} onChange={(e)=>{setUserInput({...userInput,email: e.target.value})}} placeholder="Email" name="Email"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.number === "" ? "Required *" : ""}</h4>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && (!(userInput.number.length > 7) && userInput.number !== "") ? "Number must atleast be 8 characters." : ""}</h4>
                        <input value={userInput.number || ""} onChange={(e)=>{setUserInput({...userInput,number: e.target.value})}} placeholder="Number" name="Number"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.area === "" ? "Required *" : ""}</h4>
                        <input value={userInput.area || ""} onChange={(e)=>{setUserInput({...userInput,area: e.target.value})}} placeholder="Area" name="Area"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.block === "" ? "Required *" : ""}</h4>
                        <input value={userInput.block || ""} onChange={(e)=>{setUserInput({...userInput,block: e.target.value})}} placeholder="Block" name="Block"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.street === "" ? "Required *" : ""}</h4>
                        <input value={userInput.street || ""} onChange={(e)=>{setUserInput({...userInput,street: e.target.value})}} placeholder="Street" name="Street"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.avenue === "" ? "Required *" : ""}</h4>
                        <input value={userInput.avenue || ""} onChange={(e)=>{setUserInput({...userInput,avenue: e.target.value})}} placeholder="Avenue" name="Avenue"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.building === "" ? "Required *" : ""}</h4>
                        <input value={userInput.building || ""} onChange={(e)=>{setUserInput({...userInput,building: e.target.value})}} placeholder="Building" name="Building"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.floor === "" ? "Required *" : ""}</h4>
                        <input value={userInput.floor || ""} onChange={(e)=>{setUserInput({...userInput,floor: e.target.value})}} placeholder="Floor" name="Floor"></input>
                        <h4 style={{margin:"0px",textAlign:"start", width:"50%",color:"rgba(255,0,0,0.75)",boxSizing:"border-box",padding:"0px 10px",marginBottom:"4px"}}>{submitTriggered && userInput.apartment === "" ? "Required *" : ""}</h4>
                        <input value={userInput.apartment || ""} onChange={(e)=>{setUserInput({...userInput,apartment: e.target.value})}} placeholder="Apartment" name="Apartment"></input>
                        <textarea value={userInput.additional || ""} onChange={(e)=>{setUserInput({...userInput,additional: e.target.value})}} id="checkoutPage--addDirections" type="text" placeholder="Additional Directions (Optional)" name="AdditionalDirections"></textarea>
                        <input style={{display:"none"}} value={itemRecieptHTML} name="idktest"></input>
                    </div>    

                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"15px"}}>
                        <h4 style={{margin:"0"}}>Payment method: Cash on delivery.</h4>
                        <h4 style={{margin:"0"}}>Total including delivery: ${Number(totalPrice.toFixed(2))+5}</h4>
                        <input className="formButton" type="submit" value="Confirm order" onClick={(e)=>{handleOnClick(e)}}></input>
                    </div>
                </form>
                
                
            </div>
            <Popup 
            visibility={notificationPopup.visibility} 
            color = {notificationPopup.color} 
            text = {notificationPopup.text} 
            />
            <Footer />
        </div>
    )
}