import React, { useContext, useEffect, useState } from 'react';
import { ReactContext } from '../../ReactContext/ReactContext';
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import "./BreweryDetails.css";
import BreweryReviews from '../BreweryReviews/BreweryReviews';
import { toast } from 'react-toastify';

const BreweryDetails = () => {
  const [breweryItem, setBreweryItem] = useState({});
  const [starHover, setStarHover] = useState(null);
  const { url, token } = useContext(ReactContext);
  const [formData, setFormData] = useState({
    rating: 1,
    description: ""
  });
  const { id } = useParams();

  useEffect(() => {
    const getBreweryDetails = async () => {
      const url = `https://api.openbrewerydb.org/v1/breweries/${id}`;
      await axios.get(url)
        .then((response) => {
          setBreweryItem(response.data);
        })
        .catch((error) => {
          console.error("Error fetching brewery details: ", error);
        });
    }

    getBreweryDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmitReviews = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/review`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        toast.success(response.data.message)
        setFormData({
          rating: 1,
          description: ""
        })
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <>
      <Header />

      <div className='brewery-details-container'>

        <div className='brewery-sub-container'>
          <div >
            <h1 className='brewery-main-heading'>Brewery Details</h1>
            <p><span>Name: </span>{breweryItem.name}</p>
            <p><span>Address: </span>{breweryItem.address_1}</p>
            <p><span>City: </span>{breweryItem.city}</p>
            <p><span>Country: </span>{breweryItem.country}</p>
            <p><span>Phone: </span>{breweryItem.phone}</p>
            <p><span>State: </span>{breweryItem.state}</p>
          </div>
          <form className='details-form-container' onSubmit={onSubmitReviews} >
            <div className='rating-details-container'>
              <label>Ratings:</label>
              <div>
                {
                  [...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setFormData({ ...formData, rating: currentRating })}
                        />
                        <FaStar
                          size={20}
                          className='star'
                          color={currentRating <= (starHover || formData.rating) ? "#ffc107" : "lightgray"}
                          onMouseEnter={() => setStarHover(currentRating)}
                          onMouseLeave={() => setStarHover(null)}
                        />
                      </label>
                    );
                  })
                }
              </div>
            </div>
            <div className='brewery-description-container'>
              <label htmlFor="review">Enter Your Review</label>
              <textarea
                id="review"
                name="description"
                cols={40}
                rows={10}
                placeholder='Enter Your Review....'
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className='submit-container'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
        <BreweryReviews />
      </div>
    </>
  );
}

export default BreweryDetails;
