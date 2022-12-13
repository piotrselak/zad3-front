import React from 'react'
import StarRatings from 'react-star-ratings'
import "./image.css"

export default function Image({ obj, changeRating }) {
    return <div>
        <img
            src={obj.image}
        />
        <StarRatings
            rating={obj.rating}
            starDimension="40px"
            starSpacing="15px"
            starRatedColor="blue"
            changeRating={changeRating}
        />
        <p>Rating: {obj.rating}</p>
        <p>Author: {obj.author}</p>
        <p>{obj.date}</p>
        <a href=''>More...</a>
        <p>Other: {obj.other}</p>
    </div>
}