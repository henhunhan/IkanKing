// ContentLanding.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './auth';
import LogoIkanking from "./LogoIkanking";
import picikankonsum from './assets/ikan-konsum.jpg';
import picikanhias from './assets/ikan-hias.jpg';
import portrait from './assets/portrait.png';

function ContentLanding() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <div className='h-screen'>
      <div>
        <LogoIkanking />
      </div>

      <div className='flex justify-end mt-10 mr-24 gap-5'>
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <button onClick={handleLogout} className="text-gray-500 hover:text-dark-blue">Logout</button>
            <img src={portrait} alt="User Icon" className="w-6 h-6" />
          </div>
        ) : (
          <>
            <Link to="/login" className='button-login'>Log In</Link>
            <Link to="/signup" className='button-signup'>Sign Up</Link>
          </>
        )}
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
              <Link to="/ikankonsumsi" className='button-buy'> BELI </Link> 
            </div>
          </div>

          <div className="w-2/5 h-auto bg-dark-blue mx-10">
            <img src={picikanhias} alt='gambarikanhias' className="w-full h-72 object-cover" />
            <div className="flex flex-col items-center mt-6 mb-12">
              <h2 className="mb-12 ikan-text">Ikan Hias</h2>
              <Link to="/ikanhias" className='button-buy'> BELI </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentLanding;
