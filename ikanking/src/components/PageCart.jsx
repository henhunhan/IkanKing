import { useEffect, useState } from "react";
import LogoIkanking from "./LogoIkanking";
import { useNavigate } from "react-router-dom";

function PageCart() {
    const [belumBayarItems, setBelumBayarItems] = useState([]);
    const [sudahBayarItems, setSudahBayarItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/cart/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch cart items");
                }

                const data = await response.json();

                // Pisahkan item berdasarkan status
                const belumBayar = data.filter(item => item.status === "pending");
                const sudahBayar = data.filter(item => item.status === "paid");

                setBelumBayarItems(belumBayar);
                setSudahBayarItems(sudahBayar);

            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const handleCartClick = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/api/cart/setpending", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                navigate('/checkout'); // Redirect ke halaman checkout
            } else {
                alert("Gagal mengatur status keranjang.");
            }
        } catch (error) {
            console.error("Error setting cart to pending:", error);
            alert("Terjadi kesalahan saat mengatur status keranjang.");
        }
    };

    return (
        <div>
            <div>
                <LogoIkanking />
            </div>

            <div className="py-28 px-24">
                <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

                {/* Daftar Belum Bayar */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Belum Bayar</h2>
                    {belumBayarItems.length === 0 ? (
                        <p className="text-gray-600">Keranjang kosong.</p>
                    ) : (
                        <div className="space-y-10">
                            {belumBayarItems.map((item) => (
                                <div key={item.product_id} className="flex items-center gap-6 border p-4 rounded shadow bg-light-gray">
                                    <img
                                        src={item.image_url}
                                        alt={item.nama_produk}
                                        className="w-24 h-24 object-cover"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold">{item.nama_produk}</h2>
                                        <p>Kuantitas: {item.quantity}</p>
                                        <p>Total: Rp. {item.harga_total ? parseFloat(item.harga_total).toLocaleString('id-ID') : "Harga tidak tersedia"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Daftar Sudah Bayar */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Sudah Bayar</h2>
                    {sudahBayarItems.length === 0 ? (
                        <p className="text-gray-600">Keranjang kosong.</p>
                    ) : (
                        <div className="space-y-10">
                            {sudahBayarItems.map((item) => (
                                <div key={item.product_id} className="flex items-center gap-6 border p-4 rounded shadow bg-light-gray">
                                    <img
                                        src={item.image_url}
                                        alt={item.nama_produk}
                                        className="w-24 h-24 object-cover"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-semibold">{item.nama_produk}</h2>
                                        <p>Kuantitas: {item.quantity}</p>
                                        <p>Total: Rp. {item.harga_total ? parseFloat(item.harga_total).toLocaleString('id-ID') : "Harga tidak tersedia"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tombol Beli Sekarang */}
            {belumBayarItems.length > 0 && (
                <div className="flex justify-center pb-5">
                    <button onClick={handleCartClick} className="bg-dark-blue text-white px-4 py-2 rounded-md hover:scale-105 transform transition duration-300">Beli Sekarang</button>
                </div>
            )}
        </div>
    );
}

export default PageCart;
