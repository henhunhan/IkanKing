import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LogoIkanking from './LogoIkanking';
import LocationDropdown from './location';
import cart from './assets/add-shopping-cart.png';
import portrait from './assets/portrait.png';
import { AuthContext } from './auth';

function DetailIkanKonsumsi() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, userId, handleLogout } = useContext(AuthContext); // Tambahkan userId dari AuthContext
    const [ikankonsumsi, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/ikankonsumsi/product/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // Fungsi untuk menangani "Masukkan Keranjang"
    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect ke login jika belum login
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/product/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: quantity,
                    harga_total: quantity * ikankonsumsi.harga
                })
            });

            if (response.ok) {
                alert('Produk berhasil ditambahkan ke keranjang');
                // Berikan notifikasi atau update UI jika berhasil
            } else {
                alert('Gagal menambahkan produk ke keranjang');
                // Tangani error, tampilkan pesan atau notifikasi ke user
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect ke login jika belum login
            return;
        }
        navigate('/checkout');
    };

    if (!ikankonsumsi) {
        return <div className='flex h-screen justify-center items-center text-3xl'>Loading...</div>;
    }

    return (
        <div className='h-screen mt-9'>
            <div>
                <LogoIkanking />
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

            <div className="flex justify-center p-8 h-2/3 mt-10">
                <div className="flex">
                    <div className="flex justify-center w-2/3 p-3">
                        <img src={ikankonsumsi.gambar_url} alt={ikankonsumsi.nama} className="w-full h-full object-contain" />
                    </div>

                    <div className="w-1/2 pt-2 pb-7 pr-2 pl-4 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800">{ikankonsumsi.nama}</h1>
                            <p className="text-3xl text-dark-blue font-bold mt-6 bg-light-gray px-5 py-4">
                                Rp. {ikankonsumsi.harga ? parseFloat(ikankonsumsi.harga).toLocaleString('id-ID') : "Harga tidak tersedia"}
                            </p>
                        </div>

                        <div className="space-y-4"> 
                            <LocationDropdown />
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
                            <button onClick={handleAddToCart} className="flex items-center justify-center space-x-2 bg-light-blue py-2 px-4 rounded-md">
                                <img src={cart} alt="cart" className='w-5 h-5'/>
                                <span>Masukkan Keranjang</span>
                            </button>
                            <button onClick={handleBuyNow} className="bg-blue text-white rounded-md font-bold py-2 px-4">Beli Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailIkanKonsumsi;
