import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import RestaurantDetail from "./RestaurantDetail";
import ReviewForm from "./review/ReviewForm";

import { loadRestaurant } from "./actions";

import { get } from "./utils";

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get("restaurant"));

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      <ReviewForm
        reviewField={{ name, value }}
        onChange={handleReviewChange}
        onClick={handleReviewSubmit}
      />
    </>
  );
}
