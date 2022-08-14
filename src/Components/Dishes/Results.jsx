import Dish from "./Dish";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import { asyncGetRatedDishes } from "../../Redux/Actions/resultsActions";

export default function Results() {
  const [rankedDishes, setRankedDishes] = useState("");
  const [restrictSelection, setRestrictSelection] = useState(false);

  const dispatch = useDispatch();
  const ratedDishes = useSelector((state) => state.ratedDishesReducer);

  const headingStyles = { xs: "20px", sm: "30px", md: "40px" };

  const handleSelections = (value) => {
    setRestrictSelection(value);
  };

  const sortDisheswithRanks = () => {
    const sortedDishes =
      ratedDishes.length > 0 &&
      ratedDishes
        .map((dish) => {
          const points =
            dish.ratings.length > 0
              ? dish.ratings
                  .map((user) => user.rating)
                  .reduce((acc, ele) => acc + ele)
              : 0;
          return { ...dish, points: points };
        })
        .sort((a, b) => b.points - a.points);
    setRankedDishes(sortedDishes);
  };

  useEffect(() => {
    dispatch(asyncGetRatedDishes());
  }, []);

  useEffect(() => {
    sortDisheswithRanks();
  }, [ratedDishes]);

  return (
    <Grid className="dishes" container xs={12}>
      <Grid aria-label="page_heading" item lg={12}>
        <Stack boxShadow={1} className="main_heading">
          <Typography fontSize={headingStyles}>
            Results for the voting
          </Typography>
        </Stack>
      </Grid>

      <Grid lg={12} item container className="dish_area">
        {rankedDishes &&
          rankedDishes.map((dish) => {
            return (
              <Dish
                key={dish.id}
                {...dish}
                result={true}
                handleSelections={handleSelections}
                restrictSelection={restrictSelection}
              />
            );
          })}
      </Grid>
    </Grid>
  );
}
