import './App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>


  )
}

export default App
