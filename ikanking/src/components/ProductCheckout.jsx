import LogoIkanking from "./LogoIkanking";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./auth";
import { useNavigate } from "react-router-dom";

function ProductCheckout() {
    const [cartItems, setCartItems] = useState([]);
    const [totalHargaBarang, setTotalHargaBarang] = useState(0);
    const [totalPengiriman, setTotalPengiriman] = useState(0);
    const [userAlamat, setUserAlamat] = useState(""); // Tambahkan state untuk alamat pengguna
    const [userNama, setUserNama] = useState(""); // Tambahkan state untuk nama pengguna
    const navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const fetchCartItems = async () => {
            const token = localStorage.getItem("token");
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

                // Hitung total harga barang
                const totalHarga = data.reduce(
                    (acc, item) => acc + parseFloat(item.harga_total || 0),
                    0
                );

                const totalOngkir = data.length * 18000; // Asumsi pengiriman Rp. 18.000 per item
                setTotalHargaBarang(totalHarga);
                setTotalPengiriman(totalOngkir);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:5000/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUserAlamat(data.alamat || "Alamat belum diisi"); // Simpan alamat
                setUserNama(data.username || "Nama belum diisi"); // Simpan nama pengguna
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchCartItems();
        fetchUserData();
    }, [isLoggedIn, navigate]);

    const totalKeseluruhan = totalHargaBarang + totalPengiriman;

    return (
        <div>
            <div>
                <LogoIkanking />
            </div>

            <div className="p-20">
                <section className="mt-8">
                    <div className="border p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">Alamat Pengiriman</h2>
                        <p className="flex flex-row gap-24">
                            <span className="text-2xl">{userNama}</span> 
                            <span className="text-2xl">{userAlamat}</span> 
                        </p>
                    </div>
                </section>

                <section className="mt-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="border p-4 rounded-md shadow-md mb-4">
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
                                    Opsi pengiriman: <span>Hemat</span>
                                    <span className="text-blue-500 cursor-pointer">Ubah</span>
                                    <span>Rp. 18.000</span>
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
                </section>
            </div>
        </div>
    );
}

export default ProductCheckout;
