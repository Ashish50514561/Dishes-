import Dish from "./Dish";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import { asyncGetDishes } from "../../Redux/Actions/dishActions";

export default function Dishes() {
  const navigate = useNavigate();
  const [restrictSelection, setRestrictSelection] = useState(false);
  const userSelections = JSON.parse(localStorage.getItem("userSelections"));

  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishReducer);

  const handleSelections = (value) => {
    setRestrictSelection(value);
  };

  const headingStyles = { xs: "20px", sm: "30px", md: "40px" };

  useEffect(() => {
    dispatch(asyncGetDishes());
  }, []);

  return (
    <Grid container className="dishes" xs={12}>
      <Grid aria-label="page_heading" item lg={12}>
        <Stack boxShadow={1} className="main_heading">
          <Typography fontSize={headingStyles}>
            Vote for your Favourite Dishes
          </Typography>
        </Stack>
      </Grid>
      <Grid className="dish_area" lg={12} item container>
        {dishes.map((dish) => {
          return (
            <Dish
              key={dish.id}
              {...dish}
              handleSelections={handleSelections}
              restrictSelection={restrictSelection}
            />
          );
        })}

        <Box id="result_btn">
          <Button
            onClick={() => navigate("/results")}
            disabled={
              userSelections && userSelections.length >= 3 ? false : true
            }
            variant="contained"
          >
            See Results
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
