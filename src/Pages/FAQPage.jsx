import React from "react"
import Navbar from "/src/components/Navbar"
import Footer from "/src/components/Footer"
import "./FAQPage.css"


export default function FAQPage(props){
    return(
        <div>
            <Navbar props={props}/>

            <div className="FAQ--mainContainer">
                <div className="FAQ--contentContainer">
                    <div>
                        <h1 className="FAQ--mainTitle">Frequently Asked Questions</h1>
                    </div>

                    <div className="FAQ--QAsec">
                        <div id="shadowContainerBox">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h2>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu massa ut lacus pulvinar luctus. Nam tincidunt eu magna non gravida. Nulla et porta mauris. Etiam et faucibus ex.</h3>
                        </div>
                        
                        <div id="shadowContainerBox">
                            <h2>Lorem ipsum dolor sit amet?</h2>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu massa ut lacus pulvinar luctus. Nam tincidunt eu magna non gravida.</h3>
                        </div>

                        <div id="shadowContainerBox">
                            <h2>Lorem ipsum dolor sit amet, elit?</h2>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                        </div>

                        <div id="shadowContainerBox">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h2>
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu massa ut lacus pulvinar luctus. Nam tincidunt eu magna non gravida. Nulla et porta mauris. Etiam et faucibus ex.</h3>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}