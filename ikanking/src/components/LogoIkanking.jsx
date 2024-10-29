import { Link } from "react-router-dom"
import icon from "./assets/Icon.png"
import './LogoIkanking.css'

const LogoIkanking = () => {
    return (
        <div className="absolute top-5 left-20">
            <Link to='/'>
                <button className="flex flex-row">
                    <img src={icon} alt="icon" className=" mx-1" />
                    <h1 className="text" >IKANKING</h1>
                </button>
            </Link>

        </div>



    )
}

export default LogoIkanking