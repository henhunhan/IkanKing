import { useEffect, useState } from "react";
import LogoIkanking from "./LogoIkanking";
import { useNavigate } from "react-router-dom";

function PageCart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/users/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch cart items");
                }

                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const handleCartClick = () => {
        navigate('/checkout'); // Navigasi ke halaman UserInfo
      };

    if (cartItems.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">Keranjang Anda kosong.</p>
            </div>
        );
    }

    return (

        <div>
            <div>
            <LogoIkanking />
            </div>

        <div className="py-28 px-24">
            <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
            <div className="space-y-10">
                {cartItems.map((item) => (
                    <div key={item.product_id} className="flex items-center gap-6 border p-4 rounded shadow bg-light-gray">
                        <img
                            src={item.image_url}
                            alt={item.nama_produk}
                            className="w-24 h-24 object-cover"
                        />
                        <div className="flex-grow">
                            <h2 className="text-xl font-semibold">{item.nama_produk}</h2>
                            <p>Kuantitas: {item.quantity}</p>
                            <p>Total: Rp. {item.harga_total ? parseFloat(item.harga_total).toLocaleString('id-ID'): "Harga tidak tersedia"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-center pb-5">
            <button onClick={handleCartClick} className="bg-dark-blue text-white px-4 py-2 rounded-md hover:scale-105 transform transition duration-300">Beli Sekarang</button>
        </div>


        </div>
    );
}

export default PageCart;
