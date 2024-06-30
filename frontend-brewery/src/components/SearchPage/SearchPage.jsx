import React, { useContext } from 'react';
import { ReactContext } from '../../ReactContext/ReactContext';
import "./SearchPage.css"
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const SearchPage = () => {
  const { searchType, setSearchType, searchName, setSearchName, data } = useContext(ReactContext);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <>
      <Header />
      <div className='searchpage-container'>
        <div className='input-container'>
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="by_city">City</option>
            <option value="by_name">Name</option>
            <option value="by_type">Type</option>
          </select>
          <input
            type="text"
            value={searchName}
            onChange={handleSearchNameChange}
            placeholder="Search..."
          />
        </div>
        <div>
          {data.length > 0 ? (
            <ul className='brewery-list-container'>
              {data.map((brewery) => (
                <li className='brewery-list-items' key={brewery.id}>
                  <Link to={`/brewery-details/${brewery.id}`} className='nav-link'>
                    <p><span>Name:</span> {brewery.name}</p>
                    <p><span>Address:</span> {brewery.address_1}</p>
                    <p><span>Phone:</span> {brewery.phone}</p>
                    <p><span>State:</span> {brewery.state}</p>
                    <p><span>City:</span> {brewery.city}</p>
                  </Link>
                  {brewery.website_url && (
                    <a href={brewery.website_url} className='nav-link' target="_blank" rel="noopener noreferrer">
                      <span className='web'>Website:</span> {brewery.website_url}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
