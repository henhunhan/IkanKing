import './App.css'
import './components/LandingPage.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
// import SignUp from './components/SignUp'
import PageIkanKonsumsi from './components/IkanKonsumsi'
import PageIkanHias from './components/ikanhias'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'


function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/ikankonsumsi" element={<PageIkanKonsumsi />} />
          <Route path="/ikanhias" element={<PageIkanHias />} />
        </Routes>
      </Router>
    </div>


  )
}

export default App
