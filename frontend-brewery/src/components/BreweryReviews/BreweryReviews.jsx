import React, { useContext, useEffect, useState } from 'react'
import "./BreweryReviews.css"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { ReactContext } from '../../ReactContext/ReactContext'
import axios from 'axios'

const BreweryReviews = () => {
  const [reviews, setReviews] = useState([])
  const { url, token } = useContext(ReactContext)


  useEffect(() => {
    const getData = async () => {
      await axios.get(`${url}/review`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setReviews(response.data.data.reviews)
          }
        })
    }

    getData()
  })

  return (
    <div className='reviews-container'>
      <h1>Total Reviews {reviews.length}</h1>
      <ul className='review-list-container'>
        {
          reviews.map((eachReview, index) => (
            <li key={index}>
              <div className='rating-container'>

                <p>{eachReview.userName}</p>
                <div>
                  {
                    [...Array(5)].map((star, idx) => {
                      const currentRating = eachReview.rating;
                      if (idx < Math.floor(currentRating)) {
                        return <FaStar key={idx} size={20} className='star' color="#ffc107" />;
                      } else if (idx === Math.floor(currentRating) && currentRating % 1 !== 0) {
                        return <FaStarHalfAlt key={idx} size={20} className='star' color="#ffc107" />;
                      } else {
                        return <FaStar key={idx} size={20} className='star' color="#e4e5e9" />;
                      }
                    })
                  }
                </div>
              </div>
              <p className='description'>{eachReview.description}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default BreweryReviews