import Dish from "./Dish";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { asyncGetDishes } from "../../Redux/Actions/dishActions";

export default function Dishes() {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dishReducer);
  console.log({ dishes });

  useEffect(() => {
    dispatch(asyncGetDishes());
  }, []);

  return (
    <Grid className="dishes" p={2} width="100vw" container xs={12}>
      <Grid
        borderRadius={1.5}
        boxShadow={1}
        height="7vh"
        pt={1}
        sx={{ textAlign: "center" }}
        lg={12}
        item
      >
        <Typography variant="h4"> Vote for your Favourite Dishes</Typography>
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
        {dishes.length > 0 &&
          dishes.map((dish) => {
            return <Dish {...dish} />;
          })}
      </Grid>
    </Grid>
  );
}
