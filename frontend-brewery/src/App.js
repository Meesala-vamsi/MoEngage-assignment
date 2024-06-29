import React from 'react'
import { ContextProvider } from './ReactContext/ReactContext'
import Home from './components/Home/Home'

import Login from './components/Login/Login'
import { Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => {
  return (
    <ContextProvider>
      <Routes>
        <ProtectedRoute path="/" element={<Home />} />
        <ProtectedRoute path="/login" element={<Login />} />
      </Routes>
    </ContextProvider>
  )
}

export default App