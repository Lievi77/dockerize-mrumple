//Star Rating System Component

import React, { useState } from "react";
import "./star_rating.css";

const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-div">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating || props.value) ? "on" : "off"}
            disabled={props.disable}
            onClick={() => {
              props.onClick(index); //in this function we pass the selected rating to
              //parent component
              setRating(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;

