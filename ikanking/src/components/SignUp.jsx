import { useState } from 'react'
import LogoIkanking from './LogoIkanking'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUp(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
      });
      
      navigate('/login')
      setMessage(response.data.message);

    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
      navigate('/signup')
    }
  };

  return (
    <div className='h-screen'>
      <div>
        <LogoIkanking />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up </h2>
          {message && <p className="text-center text-red-500">{message}</p>}
          <form onSubmit={handleSubmit}> 
            <div className="mb-4">
              <label className="block text-gray-700 text-2xl font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-2xl font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-dark-blue text-white hover:bg-white hover:text-dark-blue border-solid border-2 border-dark-blue font-bold py-4 px-4 rounded-full focus:outline-none focus:shadow-outline w-full
                transition duration-300 ease-in-out transform"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default SignUp