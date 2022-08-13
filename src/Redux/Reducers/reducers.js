const userInitialState = {};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "USER": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

const dishesInitialState = [];

export const dishReducer = (state = dishesInitialState, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return action.payload;
    }
    case "FAIL": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const rateDishesInitialState = [];

export const ratedDishesReducer = (state = rateDishesInitialState, action) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const ratedDishes = JSON.parse(localStorage.getItem("ratedDishes"));

  switch (action.type) {
    case "POST_RATING": {
      const { id, dishName, description, image, rating } = action.payload;

      const dish = {
        id: id,
        ratings: [
          {
            userId: currentUser.id,
            rating: rating * 10,
          },
        ],
        dishName: dishName,
        description: description,
        image: image,
      };

      if (ratedDishes) {
        const dishExists = ratedDishes.find((dish) => dish.id === id);
        console.log({ dishExists });
        if (dishExists) {
          // dish is already present
          const alreadyRated = dishExists.ratings.find(
            (user) => user.userId === currentUser.id
          );
          if (alreadyRated) {
            updateRating(ratedDishes, currentUser, dishExists);
          } else {
            //  rating the dish
            const updatedDishes = ratedDishes.map((dish) => {
              if (dish.id === id) {
                return {
                  ...dish,
                  ratings: [
                    ...dish.ratings,
                    { userId: currentUser.id, rating: rating * 10 },
                  ],
                };
              } else {
                return dish;
              }
            });
            localStorage.setItem("ratedDishes", JSON.stringify(updatedDishes));
          }
        } else {
          // initial rating of dish
          localStorage.setItem(
            "ratedDishes",
            JSON.stringify([...ratedDishes, dish])
          );
        }
      } else {
        //creating ratedDishes array
        localStorage.setItem("ratedDishes", JSON.stringify([dish]));
      }
      function updateRating(ratedDishes, currentUser, dishExists) {
        const updatedDishes = ratedDishes.map((dish) => {
          if (dish.id === dishExists.id) {
            const updatedRatings = dish.ratings.map((user) => {
              if (user.userId === currentUser.id) {
                return { ...user, rating: rating * 10 };
              } else {
                return user;
              }
            });
            return { ...dish, ratings: updatedRatings };
          } else {
            return dish;
          }
        });
        localStorage.setItem("ratedDishes", JSON.stringify(updatedDishes));
      }

      return JSON.parse(localStorage.getItem("ratedDishes"));
    }

    case "REMOVE_RATING": {
      const id = action.payload;

      const updatedDishes = ratedDishes.map((dish) => {
        if (dish.id === id) {
          const updatedRatings = dish.ratings.filter((user) => {
            return user.userId !== currentUser.id;
          });

          return { ...dish, ratings: updatedRatings };
        } else {
          return dish;
        }
      });
      localStorage.setItem("ratedDishes", JSON.stringify(updatedDishes));
      //removing userSelection
      const userSelection = JSON.parse(localStorage.getItem("userSelections"));
      const updateuserSelection = userSelection.filter((ID) => ID != id);
      localStorage.setItem(
        "userSelections",
        JSON.stringify(updateuserSelection)
      );

      return JSON.parse(localStorage.getItem("ratedDishes"));
    }
    case "RATED_DISHES": {
      return JSON.parse(localStorage.getItem("ratedDishes"));
    }

    default: {
      return state;
    }
  }
};
