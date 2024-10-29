import LogoIkanking from './LogoIkanking'

const LoginPage = () => {
  return (
    <div>

      <div>
        <LogoIkanking />
      </div>

      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-2xl font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div>
        <p className="text-center text-gray-500 text-md mt-6">
            New to Ikanking? <a href="#" className="text-dark-blue hover:underline">Sign up</a>
          </p>
        </div>


      </div>

    </div>
  )
}

export default LoginPage