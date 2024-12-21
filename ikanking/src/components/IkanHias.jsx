import LogoIkanking from "./LogoIkanking";
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth";
import portrait from './assets/portrait.png';
import search from './assets/loupe.png'
import usercart from './assets/shopping-cart.png'
import dataikan from './allikan.json'

function PageIkanHias() {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    const [ikans, setIkans] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIkans, setFilteredIkans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIkanKonsumsi = () => {
            const ikanKonsumsi = dataikan.ikan.filter(item => item.tipe === "ikan-hias");
            setIkans(ikanKonsumsi);
            setFilteredIkans(ikanKonsumsi);
        };
        fetchIkanKonsumsi();
    }, []);

    useEffect(() => {
        const filtered = ikans.filter(ikan => {
            if (selectedCategory === 'laut') return ikan.category === 'laut';
            if (selectedCategory === 'payau') return ikan.category === 'payau';
            return true; // Jika kategori kosong, tampilkan semua
        });
    
        setFilteredIkans(filtered);
    }, [selectedCategory, ikans]);

    // Handle input pencarian
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = ikans.filter(ikan => 
            ikan.nama.toLowerCase().includes(term) || 
            ikan.kota.toLowerCase().includes(term) || 
            ikan.provinsi.toLowerCase().includes(term)
        );
        setFilteredIkans(filtered);
    };

    const handleUserIconClick = () => {
        navigate('/profile'); // Navigasi ke halaman UserInfo
    };

    return (
        <div className="h-screen">
            <div >
                <LogoIkanking />
            </div>
            <div className="flex justify-between mt-8 ml-72">
                <div className="flex justify-center w-8/12 ml-24">
                    <form className="border border-gray-300 rounded-md px-4 py-1 mt-1 w-full flex items-center">
                        <input
                            type="text"
                            placeholder="Search....."
                            className="w-full outline-none"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="w-8 h-8" type="submit"><img src={search} /></button>
                    </form>
                </div>
                <div className='flex justify-end items-center mr-8 gap-8'>
                    {isLoggedIn ? (
                        <div className="flex items-center gap-5">
                            <Link to="/cart" className="w-8 h-8">
                                <img src={usercart} />
                            </Link>
                            <img
                                src={portrait}
                                alt="User Icon"
                                className="w-8 h-8 cursor-pointer"
                                onClick={handleUserIconClick} // Tambahkan event click
                            />
                            <button onClick={handleLogout} className="bg-red text-white inline-block text-lg py-1 px-4 border-solid border-2 border-red rounded-md hover:bg-white hover:text-red transform transition duration-300">Logout</button>

                        </div>
                    ) : (
                        <>
                            <Link to="/login" className='button-login'>Log In</Link>
                            <Link to="/signup" className='button-signup'>Sign Up</Link>
                        </>
                    )}
                </div>

            </div>

            <div className="flex flex-row">

                <div className="w-1/5 h-full mt-10 ml-20 text-2xl border-solid border-2 border-dark-blue">
                    <div className="">
                        <h2 className="bg-dark-blue text-white font-bold py-3 px-2">CATEGORY</h2>
                        <ul className="flex flex-col space-y-5 text-center py-2">

                            <div className="py-5">
                                <Link onClick={() => setSelectedCategory('laut')} className="text-black hover:text-dark-blue hover:underline underline-offset-4">Ikan Air Laut</Link>
                            </div>

                            <div className="py-5">
                                <Link onClick={() => setSelectedCategory('tawar')} className="text-black hover:text-dark-blue hover:underline underline-offset-4">Ikan Air Tawar</Link>
                            </div>
                            <div className="py-5">
                                <button onClick={() => setSelectedCategory('')} className="text-black hover:text-dark-blue hover:underline underline-offset-4">All</button>
                            </div>

                        </ul>
                    </div>
                </div>
                {/* Main Content */}
                <div className="p-6">
                    {/* Product Cards */}
                    <div className="grid grid-cols-4 gap-4 mt-4">{filteredIkans.map(ikanhias => (
                        <Link to={`/ikanhias/product/${ikanhias.product_id}`} key={ikanhias.product_id} className="hover:scale-105 transform transition duration-300 border-solid border-2 border-black rounded-lg p-4">
                            <img src={ikanhias.gambar_url} alt={ikanhias.nama} className="w-60 h-32 object-cover mb-2" />
                            <h3 className="text-lg font-bold">{ikanhias.nama}</h3>
                            <p className="text-red-500 font-semibold">    Rp. {ikanhias.harga ? parseFloat(ikanhias.harga).toLocaleString('id-ID') : "Harga tidak tersedia"}/Ekor</p>
                            <p className="text-gray-500">{ikanhias.kota}</p>
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageIkanHias