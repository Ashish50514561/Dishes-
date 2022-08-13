import Dish from "./Dish";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import { asyncGetRatedDishes } from "../../Redux/Actions/resultsActions";

export default function Results() {
  const navigate = useNavigate();
  const [rankedDishes, setRankedDishes] = useState([]);
  const [restrictSelection, setRestrictSelection] = useState(false);
  const userSelections = JSON.parse(localStorage.getItem("userSelections"));

  const dispatch = useDispatch();
  const ratedDishes = useSelector((state) => state.ratedDishesReducer);

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
    // setRankedDishes(ratedDishes);
    sortDisheswithRanks();
  }, [ratedDishes]);

  return (
    <Grid
      position="relative"
      className="dishes"
      p={2}
      width="100vw"
      container
      xs={12}
      justifyContent="center"
    >
      <Grid aria-label="page_heading" item lg={12}>
        <Stack
          sx={{
            p: 1,
            height: "7vh",
            borderRadius: 1.5,
            boxShadow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontSize={{ xs: "20px", sm: "30px", md: "40px" }}>
            See if your choice is everyone's Favourite
          </Typography>
        </Stack>
      </Grid>
      <Grid
        lg={12}
        item
        container
        sx={{
          p: 2,
          mt: 2,
          maxHeight: "85vh",
          minHeight: "85vh",
          overflow: "auto",
        }}
      >
        {rankedDishes.map((dish) => {
          console.log({ dish });
          return (
            <Dish
              {...dish}
              handleSelections={handleSelections}
              restrictSelection={restrictSelection}
              result={true}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
