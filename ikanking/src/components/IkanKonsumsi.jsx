// src/PageIkanKonsumsi.jsx
import LogoIkanking from "./LogoIkanking";
import { useContext, useEffect, useState } from 'react';
import './IkanJual.css';
import { Link } from "react-router-dom";
import { AuthContext } from "./auth";
import portrait from './assets/portrait.png';
import search from './assets/loupe.png';


function PageIkanKonsumsi() {
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    const [ikans, setIkans] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchIkansByCategory = async (category) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ikankonsumsi/category/${category}`);
            const data = await response.json();
            setIkans(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (selectedCategory) {
            fetchIkansByCategory(selectedCategory);
        } else {
            fetchIkans();
        }
    }, [selectedCategory]);

    const fetchIkans = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ikankonsumsi');
            const data = await response.json();
            setIkans(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchIkans();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredIkans = ikans.filter((ikankonsumsi) =>
        ikankonsumsi.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-screen">
            <div>
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
                            onChange={handleSearchChange}
                        />
                        <button className="search" type="submit"><img src={search} alt="Search" /></button>
                    </form>
                </div>
                <div className='flex justify-end items-center mr-8 gap-8'>
                    {isLoggedIn ? (
                        <div className="flex items-center gap-5">
                            <img src={portrait} alt="User Icon" className="w-6 h-6" />
                            <button onClick={handleLogout} className="button-logout">Logout</button>
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
                <div className="w-1/5 h-full mt-10 ml-20 text-2xl sidebar">
                    <div>
                        <h2 className="bg-dark-blue text-white font-bold py-3 px-2">CATEGORY</h2>
                        <ul className="flex flex-col space-y-5 text-center py-2">
                            <div className="py-5">
                                <button onClick={() => setSelectedCategory('laut')} className="menu">Ikan Air Laut</button>
                            </div>
                            <div className="py-5">
                                <button onClick={() => setSelectedCategory('tawar')} className="menu">Ikan Air Tawar</button>
                            </div>
                            <div className="py-5">
                                <button onClick={() => setSelectedCategory('payau')} className="menu">Ikan Air Payau</button>
                            </div>
                            <div className="py-5">
                                <button onClick={() => setSelectedCategory('')} className="menu">All</button>
                            </div>
                        </ul>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {filteredIkans.map(ikankonsumsi => (
                            <Link to={`/ikankonsumsi/product/${ikankonsumsi.id}`} key={ikankonsumsi.id} className="product-card">
                                <img src={ikankonsumsi.gambar_url} alt={ikankonsumsi.nama} className="w-60 h-32 object-cover mb-2" />
                                <h3 className="text-lg font-bold">{ikankonsumsi.nama}</h3>
                                <p className="text-red-500 font-semibold">Rp. {ikankonsumsi.harga ? parseFloat(ikankonsumsi.harga).toLocaleString('id-ID') : "Harga tidak tersedia"}/Kg</p>
                                <p className="text-gray-500">{ikankonsumsi.kota}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageIkanKonsumsi;
