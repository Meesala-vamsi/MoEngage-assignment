import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ReactContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [getData, setData] = useState([]);
  const [token, setToken] = useState("");

  const url = "https://moengage-assignment-2.onrender.com";

  useEffect(() => {
    const getDetails = async () => {
      const response = await axios.get('https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=3');
      setData(response.data);
    };

    getDetails();
  }, []);

  return (
    <ReactContext.Provider value={{ url, token, setToken, getData, setData }}>
      {children}
    </ReactContext.Provider>
  );
};
