import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactContext } from '../../ReactContext/ReactContext';

const BreweryList = () => {
  const { getData } = useContext(ReactContext);

  return (
    <div>
      <h2>Brewery List</h2>
      <ul>
        {getData.map((brewery) => (
          <li key={brewery.id}>
            <h3>{brewery.name}</h3>
            <p>{brewery.address_1}</p>
            <p>{brewery.phone}</p>
            <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            <p>Rating: {brewery.rating || 'No ratings yet'}</p>
            <Link to={`/brewery/${brewery.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreweryList;
