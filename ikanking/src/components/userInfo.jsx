import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth';

function UserInfo() {
  const { handleLogout } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: '', alamat: '', username: '', kecamatan: '', kota: '', saldo: '', });
  const [newAlamat, setNewAlamat] = useState('');
  const [newKecamatan, setNewKecamatan] = useState('');
  const [newKota, setNewKota] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newSaldo, setNewSaldo] = useState('');
  const [showAlamatModal, setShowAlamatModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showSaldoModal, setShowSaldoModal] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData({
            email: data.email,
            alamat: data.alamat || '',
            username: data.username || '',
            kecamatan: data.kecamatan || '',
            kota: data.kota || '',
            saldo: data.saldo || '',
          });
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAlamatUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost/api/users/updatealamat', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alamat: newAlamat, kecamatan: newKecamatan, kota: newKota }),
      });
      if (response.ok) {
        setUserData((prevData) => ({
          ...prevData,
          alamat: newAlamat,
          kecamatan: newKecamatan,
          kota: newKota,
        }));
        setNewAlamat('');
        setNewKecamatan('');
        setNewKota('');
        setNewSaldo('');
        setShowAlamatModal(false);
      } else {
        const data = await response.json();
        console.error('Error updating alamat:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUsernameUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost/api/users/username', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername }),
      });
      if (response.ok) {
        setUserData((prevData) => ({
          ...prevData,
          username: newUsername,
        }));
        setNewUsername('');
        setShowUsernameModal(false);
      } else {
        const data = await response.json();
        console.error('Error updating username:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaldoUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost/api/users/saldo', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ saldo: newSaldo }), // Hanya kirimkan newSaldo
      });
  
      if (response.ok) {
        const data = await response.json(); // Ambil saldo terbaru dari respons backend
        setUserData((prevData) => ({
          ...prevData,
          saldo: data.saldo, // Perbarui saldo dengan nilai dari backend
        }));
        setNewSaldo('');
        setShowSaldoModal(false);
      } else {
        const errorData = await response.json();
        console.error('Error updating saldo:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col justify-between w-1/3 bg-white h-auto shadow-2xl rounded-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4 bg-dark-blue text-white py-2">User Information</h1>
        <p className="text-xl text-dark-blue mb-4">Email: {userData.email}</p>
        <p className="text-xl text-dark-blue mb-4">
          Username: {userData.username || 'Username belum diisi'}{' '}
          <button onClick={() => setShowUsernameModal(true)} className="text-blue-500 underline ml-2">
            Ubah
          </button>
        </p>
        <p className="text-xl text-dark-blue mb-4">
          Alamat: {userData.alamat || 'Alamat belum diisi'}, {userData.kecamatan || ''}, {userData.kota || ''}{' '}
          <button onClick={() => setShowAlamatModal(true)} className="text-blue-500 underline ml-2">
            Ubah
          </button>
        </p>

        <p className="text-xl text-dark-blue mb-4">
          Saldo: Rp. {userData.saldo? parseFloat(userData.saldo).toLocaleString('id-ID') : 'Tidak ada saldo'}{''}
          <button onClick={() => setShowSaldoModal(true)} className="text-blue-500 underline ml-2">
            topup
          </button>
        </p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red text-white px-4 py-2 rounded-md w-full hover:scale-105 transform transition duration-300"
        >
          Logout
        </button>
      </div>
      {/* Modal Ubah Alamat */}
      {showAlamatModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Ubah Alamat</h2>
            <input
              type="text"
              placeholder="Masukkan alamat baru"
              value={newAlamat}
              onChange={(e) => setNewAlamat(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Masukkan kecamatan baru"
              value={newKecamatan}
              onChange={(e) => setNewKecamatan(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <input
              type="text"
              placeholder="Masukkan kota baru (Kapital)"
              value={newKota}
              onChange={(e) => setNewKota(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAlamatModal(false)}
                className="bg-red text-black px-4 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Batal
              </button>
              <button
                onClick={handleAlamatUpdate}
                className="bg-dark-blue text-white px-4 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Ubah Username */}
      {showUsernameModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Ubah Username</h2>
            <input
              type="text"
              placeholder="Masukkan username baru"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUsernameModal(false)}
                className="bg-red text-black px-4 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Batal
              </button>
              <button
                onClick={handleUsernameUpdate}
                className="bg-dark-blue text-white px-4 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/*Modal Ubah Saldo*/}
      {showSaldoModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Nominal Topup</h2>
            <input
              type="text"
              placeholder="Masukkan Nominal Topup"
              value={newSaldo}
              onChange={(e) => setNewSaldo(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowSaldoModal(false)}
                className="bg-red text-black px-4 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Batal
              </button>
              <button
                onClick={handleSaldoUpdate}
                className="bg-dark-blue text-white px-4 py-2 rounded-md hover:scale-105 transform transition duration-300"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserInfo;
