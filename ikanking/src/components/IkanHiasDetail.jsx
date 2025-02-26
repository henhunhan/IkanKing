import { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LogoIkanking from './LogoIkanking';
import cart from './assets/add-shopping-cart.png';
import portrait from './assets/portrait.png';
import { AuthContext } from './auth';
import usercart from './assets/shopping-cart.png'
import dataikan from './allikan.json'

function DetailIkanHias() {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, handleLogout } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);

    const ikanhias = dataikan.ikan.find(item => item.product_id === product_id) // Pastikan id cocok
    console.log('product_id:', product_id);
    console.log('ikanhias:', ikanhias);

    if (!ikanhias) {
        return <div className="flex h-screen justify-center items-center text-3xl">Produk tidak ditemukan</div>;
    }

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id: product_id,
                    quantity,
                    harga_total: quantity * ikanhias.harga
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Produk berhasil dimasukkan ke keranjang');
                console.log('Produk berhasil dimasukkan ke keranjang:', data);
            } else {
                alert('Gagal menambahkan ke keranjang');
                console.error('Gagal menambahkan ke keranjang:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBuyNow = async() => {
        const token = localStorage.getItem('token');
        if (!isLoggedIn) {
            navigate('/login'); // Redirect ke login jika belum login
            return;
        }
        navigate('/checkout');
        try {
            const response = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id: product_id,
                    quantity,
                    harga_total: quantity * ikanhias.harga
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Produk berhasil dimasukkan ke keranjang:', data);
            } else {    
                console.error('Gagal menambahkan ke keranjang:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (!ikanhias) {
        return <div className='flex h-screen justify-center items-center text-3xl'>Loading...</div>;
    }


    const handleUserIconClick = () => {
        navigate('/profile'); // Navigasi ke halaman UserInfo
    };

    return (
        <div className='h-screen mt-9'>
            <div>
                <LogoIkanking />
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

            <div className="flex justify-center p-8 h-2/3 mt-10">
                <div className="flex">
                    <div className="flex justify-center w-2/3 p-3">
                        <img src={ikanhias.images} alt={ikanhias.nama} className="w-full h-full object-contain" />
                    </div>

                    <div className="w-1/2 pt-2 pb-7 pr-2 pl-4 flex flex-col justify-center">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800">{ikanhias.nama}</h1>
                            <p className="text-3xl text-dark-blue font-bold mt-6 bg-light-gray px-5 py-4">
                                Rp. {ikanhias.harga ? parseFloat(ikanhias.harga).toLocaleString('id-ID') : "Harga tidak tersedia"}
                            </p>
                        </div>

                        <div className="space-y-4">

                            <div className="flex items-center space-x-4">
                                <p className="text-gray-600">Ongkos Kirim:</p>
                                <span className="text-gray-800">Rp. 13.000</span>
                            </div>

                            <div className="flex items-center mt-4">
                                <p className="text-gray-600">Kuantitas:</p>
                                <div className="flex items-center ml-4">
                                    <button onClick={decreaseQuantity} className="px-2 py-1 border rounded-l bg-gray-200">-</button>
                                    <span className="px-4 py-1 border-t border-b">{quantity}</span>
                                    <button onClick={increaseQuantity} className="px-2 py-1 border rounded-r bg-gray-200">+</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-6 mt-8">
                            <button onClick={handleAddToCart} className="flex items-center justify-center space-x-2 bg-light-blue py-2 px-4 rounded-md hover:scale-105 transform transition duration-300">
                                <img src={cart} alt="cart" className='w-5 h-5' />
                                <span>Masukkan Keranjang</span>
                            </button>
                            <button onClick={handleBuyNow} className="bg-blue text-white rounded-md font-bold py-2 px-4 hover:scale-105 transform transition duration-300">Beli Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailIkanHias;
