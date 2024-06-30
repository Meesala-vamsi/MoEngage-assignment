import React from 'react'
import { ContextProvider } from './ReactContext/ReactContext'
import Home from './components/Home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import BreweryDetails from './components/BreweryDetails/BreweryDetails'
import "./App.css"

const App = () => {
  return (
    <div className='App'>
      <ContextProvider>
        <ToastContainer />
        <Routes>
          <Route element={<ProtectedRoute isAuthRoute={true} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute isAuthRoute={false} />}>
            <Route path="/" element={<Home />} />
            <Route path='/brewery-details/:id' element={<BreweryDetails />} />
          </Route>
        </Routes>
      </ContextProvider>
    </div>
  )
}

export default App