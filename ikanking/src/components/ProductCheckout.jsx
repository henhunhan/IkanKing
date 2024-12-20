import LogoIkanking from "./LogoIkanking";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth";
import { Link, useNavigate } from "react-router-dom";
import portrait from './assets/portrait.png';
import usercart from './assets/shopping-cart.png';

function ProductCheckout() {
    const [cartItems, setCartItems] = useState([]);
    const [totalHargaBarang, setTotalHargaBarang] = useState(0);
    const [totalPengiriman, setTotalPengiriman] = useState(0);
    const [userAlamat, setUserAlamat] = useState("");
    const [userNama, setUserNama] = useState("");
    const [userKecamatan, setUserKecamatan] = useState("");
    const [userKota, setUserKota] = useState("");
    const navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthContext);

    const handleUserIconClick = () => {
        navigate('/profile'); // Navigasi ke halaman UserInfo
    };

    // Fungsi untuk mengambil item dalam keranjang
    const fetchCartItems = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to fetch cart items");

            const data = await response.json();
            setCartItems(data);

            // Hitung total harga barang
            const totalHarga = data.reduce((acc, item) => acc + parseFloat(item.harga_total || 0), 0);
            setTotalHargaBarang(totalHarga);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Fungsi untuk mengambil data pengguna
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:5000/api/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to fetch user data");

            const data = await response.json();
            setUserAlamat(data.alamat || "Alamat belum diisi");
            setUserKecamatan(data.kecamatan || "");
            setUserKota(data.kota || "");
            setUserNama(data.username || "Nama belum diisi");
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Fungsi untuk menghitung biaya pengiriman
    const calculateDeliveryCost = async () => {
        const token = localStorage.getItem("token");
        try {
            // Kirim permintaan secara paralel untuk semua item dalam cart
            const promises = cartItems.map(async (item) => {
                const response = await fetch("http://localhost:5000/api/cart/calculatedeliverycost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_id: item.product_id,
                        kota_penjual: item.lokasi_product,
                        kota_pembeli: userKota,
                    }),
                });

                if (!response.ok) throw new Error("Failed to calculate delivery cost");

                const { deliveryCost } = await response.json();

                // Tambahkan biaya pengiriman ke item
                return { ...item, deliveryCost };
            });

            // Tunggu semua permintaan selesai
            const updatedCartItems = await Promise.all(promises);

            // Hitung total biaya pengiriman
            const totalOngkir = updatedCartItems.reduce(
                (acc, item) => acc + (item.deliveryCost || 0),
                0
            );

            // Perbarui state
            setCartItems(updatedCartItems);
            setTotalPengiriman(totalOngkir);
        } catch (error) {
            console.error("Error calculating delivery cost:", error);
        }
    };

    const handlePayment = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost/api/cart/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert("Pembayaran berhasil!");
                navigate("/"); // Redirect ke halaman profil setelah pembayaran berhasil
            } else {
                alert(data.message || "Gagal melakukan pembayaran.");
            }
        } catch (error) {
            console.error("Error during payment:", error);
            alert("Terjadi kesalahan saat melakukan pembayaran.");
        }
    };

    // useEffect untuk mengambil data awal
    useEffect(() => {
        if (isLoggedIn) {
            fetchCartItems();
            fetchUserData();
        }
    }, [isLoggedIn]);

    // useEffect untuk menghitung biaya pengiriman setelah cartItems dan userKota diperbarui
    useEffect(() => {
        if (cartItems.length > 0 && userKota) calculateDeliveryCost();
    }, [cartItems, userKota]);

    const totalKeseluruhan = parseFloat(totalHargaBarang || 0) + parseFloat(totalPengiriman || 0);

    return (
        <div>
            <div>
                <LogoIkanking />
            </div>

            <div className="flex justify-end mt-10 mr-24 gap-5">
                {isLoggedIn ? (
                    <div className="flex items-center gap-5">
                        <Link to="/cart" className="w-8 h-8">
                            <img src={usercart} />
                        </Link>
                        <img
                            src={portrait}
                            alt="User Icon"
                            className="w-8 h-8 cursor-pointer"
                            onClick={handleUserIconClick}
                        />
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="button-login">
                            Log In
                        </Link>
                        <Link to="/signup" className="button-signup">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            <div className="px-20">
                <section className="mt-8">
                    <div className="border p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">Alamat Pengiriman</h2>
                        <p className="flex flex-row gap-20">
                            <span className="text-2xl">{userNama}</span>
                            <span className="text-2xl">
                                {userAlamat}, {userKecamatan}, {userKota}
                            </span>
                        </p>
                    </div>
                </section>

                <section className="mt-8">
                    {cartItems.map((item) => (
                        <div key={item.product_id} className="border p-4 rounded-md shadow-md mb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image_url}
                                    alt={item.nama_produk}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-2xl">{item.nama_produk}</h3>
                                    <p className="text-2xl">Kuantitas: {item.quantity}</p>
                                    <p className="font-bold text-xl">
                                        Total Harga: Rp.{" "}
                                        {parseFloat(item.harga_total || 0).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-md mt-4">
                                <p className="flex justify-end items-center gap-8 text-lg">
                                    Biaya Kirim: Rp.{" "}
                                    {(item.deliveryCost || 0).toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="mt-8 border p-4 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold">Metode Pembayaran</h2>
                    <div className="mt-4 justify-between text-lg">
                        <p>Subtotal Produk: Rp. {totalHargaBarang.toLocaleString("id-ID")}</p>
                        <p>Subtotal Pengiriman: Rp. {totalPengiriman.toLocaleString("id-ID")}</p>
                        <p className="text-dark-blue font-bold">
                            Total: Rp. {totalKeseluruhan.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="bg-dark-blue text-white px-6 py-2 rounded-md mt-4 hover:bg-green-600"
                    >
                        Bayar Sekarang
                    </button>
                </section>
            </div>
        </div>
    );
}

export default ProductCheckout;
