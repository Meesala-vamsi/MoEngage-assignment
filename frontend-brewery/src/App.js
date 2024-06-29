import React from 'react'
import { ContextProvider } from './ReactContext/ReactContext'
import Home from './components/Home/Home'

import Login from './components/Login/Login'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import BreweryList from './components/BreweryList/BreweryList'
import Search from './components/SearchTypes/SearchType'
import BreweryDetail from './components/BreweryDetails/BreweryDetails'

const App = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/brewery/:id" element={<BreweryDetail />} />
        <Route path="/" element={<Search />} />
        <Route path="/breweries" element={<BreweryList />} />
      </Routes>
    </ContextProvider>
  )
}

export default App