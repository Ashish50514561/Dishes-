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

  useEffect(() => {
    dispatch(asyncGetDishes());
  }, []);

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
            Vote for your Favourite Dishes
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
        <Box sx={{ position: "absolute", bottom: 20, right: 50 }}>
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
