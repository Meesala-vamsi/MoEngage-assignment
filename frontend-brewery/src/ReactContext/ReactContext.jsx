import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie"
import axios from 'axios';

export const ReactContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [searchType, setSearchType] = useState("by_city");
  const [searchName, setSearchName] = useState("san_diego");
  const [userData, setUserData] = useState({})
  const [data, setData] = useState([]);
  const [token, setToken] = useState(Cookies.get('jwtToken') || '');

  const url = "https://moengage-assignment-2.onrender.com";

  useEffect(() => {
    const getDetails = async () => {
      if (searchName) {
        try {
          const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?${searchType}=${searchName}`);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };

    getDetails();
  }, [searchType, searchName]);
  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3001/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.data.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getUserData();
  }, [token]);
  return (
    <ReactContext.Provider value={{ url, token, userData, setUserData, setToken, searchType, setSearchType, searchName, setSearchName, data }}>
      {children}
    </ReactContext.Provider>
  );
};
