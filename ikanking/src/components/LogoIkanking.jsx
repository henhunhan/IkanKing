import icon from "./assets/Icon.png"
import './LogoIkanking.css'

const HeaderLanding = () =>{
    return(
            <div className="absolute top-5 left-20">
                <button className="flex flex-row">
                <img src={icon} alt="icon" className=" mx-1"/>
                <h1 className="text" >IKANKING</h1>
                </button>

        </div>



    )
}

export default HeaderLanding