import './LandingPage.css';
import LogoIkanking from "./LogoIkanking";
import picikankonsum from './assets/ikan-konsum.jpg';
import picikanhias from './assets/ikan-hias.jpg';
import { Link } from 'react-router-dom';


const ContentLanding = () =>{
    return(

        <div>
            <div >
                <LogoIkanking/>
            </div>

            <div className='flex justify-end mt-10 mr-24 gap-5'>
                    <Link to="/login" className='button-login'>Log In</Link>
                    <Link to="/signup" className='button-signup'>Sign Up</Link>
            </div>


        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="text-7xl relative titletext">Rajanya Pasar Ikan</h1>
                <h1 className="text-dark-blue relative producttext">Jenis Produk</h1>
            </div>

            <div className="flex flex-row fish-sell">
                <div className="w-2/5 h-auto bg-dark-blue mx-20">
                    <img src={picikankonsum} alt='gambarikankonsum' className="w-full h-72 object-cover" />
                    <div className="flex flex-col items-center mt-6 mb-14">
                        <h2 className="mb-12 ikan-text">Ikan Konsumsi</h2>
                        <Link to="/login" className='button-buy'> BELI </Link> 
                    </div>
                </div>

                <div className="w-2/5 h-auto bg-dark-blue mx-10">
                    <img src={picikanhias} alt='gambarikanhias' className="w-full h-72 object-cover" />
                    <div className="flex flex-col items-center mt-6 mb-12">
                        <h2 className="mb-12 ikan-text">Ikan Hias</h2>
                        <Link to="/login" className='button-buy'> BELI </Link>
                    </div>
                </div>
            </div>
      </div>

    </div>
    )
}

export default ContentLanding;