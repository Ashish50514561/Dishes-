import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Dish from "./Dish";

export default function Dishes() {
  return (
    <Grid p={2} width="100vw" container xs={12}>
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
        }}
      >
        <Dish />
        <Dish />
        <Dish />
        <Dish />
      </Grid>
    </Grid>
  );
}
