import React, { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import StarRating from "../components/StarRating";
import { showToast } from "../store/toast-slice";
import { useDispatch } from "react-redux";

const FeedbackModal = ({ isModalOpen, setIsModalOpen, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [showFiveStarAnim, setShowFiveStarAnim] = useState(false);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setReview("");
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      dispatch(
        showToast({
          message: "Please select a rating",
          type: "error",
        }),
      );
      return;
    }
    await addRating();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  // Determine if user already rated (local guard); server may also reject duplicates
  useEffect(() => {
    if (!productId) return;
    const key = `rated_${productId}`;
    const already = localStorage.getItem(key);
    setHasRated(Boolean(already));
  }, [productId]);

  // Map rating to status text
  const ratingStatusText = useMemo(() => {
    if (rating <= 0) return "";
    if (rating <= 2) return "Bad";
    if (rating === 3) return "Good";
    if (rating === 4) return "Very Good";
    return "Excellent"; // 5
  }, [rating]);

  // Handle five star small celebration animation
  useEffect(() => {
    if (rating === 5) {
      setShowFiveStarAnim(true);
      const t = setTimeout(() => setShowFiveStarAnim(false), 1200);
      return () => clearTimeout(t);
    }
  }, [rating]);

  const addRating = async () => {
    if (rating === 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        accommodationId: parseInt(productId),
        rating: rating,
        review: review || null,
      };

      const response = await axios.post(
        `${BASE_URL}/api/ratings/add`,
        payload,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data, "RESPONSE");
      if (response?.data?.ratingId) {
        setIsModalOpen(false);
        setRating(0);
        setReview("");
        dispatch(
          showToast({
            message: "Rating added successfully",
            type: "success",
          }),
        );
      } else {
        dispatch(
          showToast({
            message: "Failed to add rating",
            type: "error",
          }),
        );
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className=" gap-[18px]">
        <div className="flex flex-col justify-center items-center  bg-white p-6 rounded-[24px] shadow-lg relative">
          <div className="flex flex-col justify-center items-center mb-8  gap-[24px]">
            <h1 className="font-poppins font-bold text-[24px] leading-[36px] text-[#434343]">
              How was the Service
            </h1>
            <p className="font-poppins font-normal text-center text-[14px] w-[324px] leading-[21px] text-[#949494]">
              Your opinion is very helpful for us. Help us be better by giving
              us an honest score below
            </p>
            <div className="flex justify-center items-center w-full">
              <StarRating
                rating={rating}
                onChange={(val) => {
                  if (hasRated) return;
                  setRating(val);
                }}
                size="w-10 h-10"
                allowZero={false}
                readOnly={hasRated}
              />
            </div>
            {ratingStatusText && !hasRated && (
              <p className="font-poppins text-sm font-semibold text-[#434343]">{ratingStatusText}</p>
            )}
            {hasRated && (
              <p className="font-poppins text-sm text-[#434343]">You have already submitted a rating.</p>
            )}
       
            <div className="w-[311px] rounded-[12px] flex flex-col justify-start items-start space-y-[8px]">
              <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#434343]">
                Please share your experience
              </p>
              <textarea
                placeholder="Enter your opinion"
                className="w-[311px] h-[94px] px-4 py-2 bg-[#FFFFFF] border-[1px] border-[#624C7926] rounded-[12px] outline-none resize-none font-poppins text-sm"
                value={review}
                onChange={(e) => setReview(e.target.value.slice(0, 300))}
                maxLength={300}
              />
              <div className="w-full text-right text-xs text-gray-400 font-poppins">{review.length}/300</div>
            </div>
          </div>

          {/* <button
          onClick={handleCloseModal}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button> */}
          <div className="flex justify-center items-center w-[311px] h-[48px] gap-[8px]">
            <button
              onClick={handleCloseModal}
              disabled={isSubmitting}
              className="flex justify-center items-center w-[151.5px] h-[48px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-[14px] leading-[21px] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Maybe Later
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || hasRated}
              className="flex justify-center items-center w-[151.5px] h-[48px] gap-[10px] rounded-[28px] py-[17px] px-[4px] bg-secondaryBrand font-poppins font-semibold text-white text-[14px] leading-[21px] hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : hasRated ? "Already Rated" : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
