import LogoIkanking from './LogoIkanking'
import { useState } from 'react'
import axios from 'axios'

function LoginPage(){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error: Could not sign in');
    }
  };


  return (
    <div>

      <div>
        <LogoIkanking />
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          {message && <p className="mt-4 text-center text-black-500">{message}</p>}
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
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div>
        <p className="text-center text-gray-500 text-md mt-6">
            New to Ikanking? <a href="/signup" className="text-dark-blue hover:underline">Sign up</a>
          </p>
        </div>


      </div>

    </div>
  )
}

export default LoginPage