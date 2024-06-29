import React, { useEffect, useState } from 'react'
import axios from "axios"

export const ReactContext = React.createContext()


export const ContextProvider = ({ children }) => {

  const [getData, setData] = useState([])
  const url = "http://localhost:3001"
  useEffect(() => {
    const getDetails = async () => {
      const url = "https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=3"
      const response = await axios.get(url)
      console.log(response.data)
    }

    getDetails()
  })
  return (
    <ReactContext.Provider value={{ url }}>
      {children}
    </ReactContext.Provider>
  )
}
