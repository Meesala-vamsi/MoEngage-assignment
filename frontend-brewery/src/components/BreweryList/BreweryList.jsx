import React, { useContext, useState } from 'react';
import { ReactContext } from '../../ReactContext/ReactContext';

const BreweryList = () => {
  const { data, fetchData } = useContext(ReactContext);
  const [searchType, setSearchType] = useState('city');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    fetchData(searchTerm, searchType);
  };

  return (
    <div>
      <h2>Search Breweries</h2>
      <div>
        <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h3>Results:</h3>
        <ul>
          {data.map((brewery) => (
            <li key={brewery.id}>{brewery.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreweryList;
