export const asyncAddRating = (dish) => {
  return {
    type: "POST_RATING",
    payload: dish,
  };
};

export const asyncRemoveRating = (id) => {
  return {
    type: "REMOVE_RATING",
    payload: id,
  };
};

export const asyncGetRatedDishes = () => {
  return {
    type: "RATED_DISHES",
  };
};
