import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const StarRating = ({
  rating = 0,
  onChange,
  readOnly = false,
  maxRating = 5,
  size = "w-8 h-8",
  allowZero = false,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  // Update current rating when prop changes
  React.useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleClick = (value) => {
    if (readOnly) return;

    // If allowZero is true and clicking the same star, reset to 0
    const newRating = allowZero && currentRating === value ? 0 : value;

    setCurrentRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const handleMouseEnter = (value) => {
    if (readOnly) return;
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || currentRating;

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;

        return (
          <StarIcon
            key={index}
            className={`${size} transition-all duration-150 ${
              readOnly ? "" : "cursor-pointer"
            } ${isFilled ? "text-yellow-400" : "text-gray-300"} ${
              !readOnly && hoveredRating >= starValue ? "scale-110" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
