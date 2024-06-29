import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ReactContext } from '../../ReactContext/ReactContext';

const Search = () => {
  const { setData } = useContext(ReactContext);
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries`, {
        params: {
          by_city: city,
          by_name: name,
          by_type: type
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching breweries:', error);
    }
  };

  return (
    <div>
      <h2>Search Breweries</h2>
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
