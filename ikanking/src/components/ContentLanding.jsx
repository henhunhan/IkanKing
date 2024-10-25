import './ContentLanding.css';
import picikankonsum from './assets/ikan-konsum.jpg';
import picikanhias from './assets/ikan-hias.jpg';

const ContentLanding = () =>{
    return(
        <div className="flex flex-col">

            <div className="flex flex-col justify-center items-center mt-20">
                <h1 className="titletext">Rajanya Pasar Ikan</h1>
                <h1 className="producttext">Jenis Produk</h1>
            </div>

            <div className="flex flex-row">
                <div className="w-2/5 h-auto card mx-20">
                    <img src={picikankonsum} alt='gambarikankonsum' className="w-full h-72 object-cover" />
                    <div className="flex flex-col items-center mt-6 mb-14">
                        <h2 className="ikan-text">Ikan Konsumsi</h2>
                        <button className="button-buy">BELI</button> 
                    </div>
                </div>

                <div className="w-2/5 h-auto mx-10 card">
                    <img src={picikanhias} alt='gambarikanhias' className="w-full h-72 object-cover" />
                    <div className="flex flex-col items-center mt-6 mb-12">
                        <h2 className="ikan-text">Ikan Hias</h2>
                        <button className="button-buy">BELI</button> 
                    </div>
                </div>
            </div>
      </div>

    )
}

export default ContentLanding;