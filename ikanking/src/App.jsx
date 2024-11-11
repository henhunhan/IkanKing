import './App.css'
import './components/LandingPage.css'
import ContentLanding from './components/LandingPage'
import LoginPage from './components/LoginPage'
import PageIkanKonsumsi from './components/IkanKonsumsi'
import PageIkanHias from './components/IkanHias'
import DetailIkanKonsumsi from './components/IkanKonsumsiDetail'
import DetailIkanHias from './components/IkanHiasDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import { AuthProvider } from './components/auth'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ContentLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ikankonsumsi" element={<PageIkanKonsumsi />} />
          <Route path="/ikankonsumsi/product/:id" element={<DetailIkanKonsumsi />} />
          <Route path="/ikanhias/product/:id" element={<DetailIkanHias/>} />
          <Route path="/ikanhias" element={<PageIkanHias />} />
        </Routes>
      </Router>
    </AuthProvider>



  )
}

export default App
