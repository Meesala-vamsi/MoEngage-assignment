import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', description: '' });

  useEffect(() => {
    const fetchBrewery = async () => {
      const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
      setBrewery(response.data);
    };

    const fetchReviews = async () => {
      const response = await axios.get(`https://moengage-assignment-2.onrender.com/reviews/${id}`);
      setReviews(response.data);
    };

    fetchBrewery();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://moengage-assignment-2.onrender.com/reviews', {
        breweryId: id,
        ...newReview
      });
      setReviews([...reviews, response.data]);
      setNewReview({ rating: '', description: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!brewery) return <div>Loading...</div>;

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>{brewery.address_1}</p>
      <p>{brewery.phone}</p>
      <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p>Rating: {review.rating}</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit}>
        <h4>Add a Review</h4>
        <label>
          Rating:
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={newReview.description}
            onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default BreweryDetail;
