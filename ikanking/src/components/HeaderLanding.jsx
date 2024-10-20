import React from "react";
import icon from "./assets/Icon.png"

const HeaderLanding = () =>{
    return(
        <div className="flex flex-row items-center">
            <img src={icon} alt="icon" className=" mx-1"/>
            <h1 className="text" >IKANKING</h1>
        </div>
    )
}

export default HeaderLanding