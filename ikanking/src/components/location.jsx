import { useState, useRef, useEffect } from 'react';

const LocationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Provinsi');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleTabChange = (tab) => setSelectedTab(tab);

  // Fetch provinces on component mount
  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error('Error fetching provinces:', error));
  }, []);

  // Fetch cities when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
      setSubdistricts([]);
    }
  }, [selectedProvince]);

  // Fetch subdistricts when a city is selected
  useEffect(() => {
    if (selectedCity) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity}.json`)
        .then((response) => response.json())
        .then((data) => setSubdistricts(data))
        .catch((error) => console.error('Error fetching subdistricts:', error));
    } else {
      setSubdistricts([]);
    }
  }, [selectedCity]);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <p className='text-2xl'>Pengiriman:</p>
      <button
        className="w-full text-left py-2 px-4 bg-white border border-gray-300 rounded"
        onClick={toggleDropdown}
      >
        {selectedProvinceName && selectedCityName && selectedSubdistrict
          ? `${selectedSubdistrict}, ${selectedCityName}, ${selectedProvinceName}`
          : 'Pilih Lokasi Pengiriman'}
      </button>

      {isOpen && (
        <div className="absolute w-72 mt-2 bg-white shadow-lg rounded z-50" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <div className="flex border-b">
            {['Provinsi', 'Kota', 'Kecamatan'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 text-center font-semibold ${selectedTab === tab ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                onClick={() => handleTabChange(tab)}
                disabled={tab === 'Kota' && !selectedProvince || tab === 'Kecamatan' && !selectedCity}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4">
            {selectedTab === 'Provinsi' && (
              <ul className="space-y-2">
                {provinces.map((province) => (
                  <li
                    key={province.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => {
                      setSelectedProvince(province.id);
                      setSelectedProvinceName(province.name);
                      setSelectedTab('Kota');
                      setSelectedCity('');
                      setSelectedCityName('');
                      setSelectedSubdistrict('');
                    }}
                  >
                    {province.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedTab === 'Kota' && selectedProvince && (
              <ul className="space-y-2">
                {cities.map((city) => (
                  <li
                    key={city.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => {
                      setSelectedCity(city.id);
                      setSelectedCityName(city.name);
                      setSelectedTab('Kecamatan');
                      setSelectedSubdistrict('');
                    }}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
            {selectedTab === 'Kecamatan' && selectedCity && (
              <ul className="space-y-2">
                {subdistricts.map((subdistrict) => (
                  <li
                    key={subdistrict.id}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => {
                      setSelectedSubdistrict(subdistrict.name);
                      setIsOpen(false); // Close dropdown after selecting subdistrict
                    }}
                  >
                    {subdistrict.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
