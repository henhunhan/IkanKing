import LogoIkanking from "./LogoIkanking";
import './IkanJual.css'
import { Link } from "react-router-dom";

const PageIkanKonsumsi = () => {
    return (
        <div>
            <div>
                <LogoIkanking />
            </div>


            <div className='flex justify-end mt-10 mr-24 gap-5'>
                    <Link to="/login" className='button-login'>Log In</Link>
                    <Link to="/signup" className='button-signup'>Sign Up</Link>
            </div>
            

            <div className=" flex justify-center w-1/5 mt-20 ml-20 text-2xl sidebar">
                <div className="flex flex-col w-72">
                    <h2 className="bg-dark-blue text-white font-bold py-3">CATEGORY</h2>
                    <ul className="flex flex-col space-y-10 text-center">
                        <Link>Ikan Air Laut</Link>
                        <Link>Ikan Air Tawar</Link>
                        <Link>Ikan Air Payau</Link>
                    </ul>

                </div>
            </div>


        </div>
    )
}

export default PageIkanKonsumsi