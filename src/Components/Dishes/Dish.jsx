import React from "react";
import { Grid, Stack } from "@mui/material";

export default function Dish() {
  return (
    <Grid p={2} item lg={4}>
      <Stack
        sx={{ borderRadius: 1.5, boxShadow: 1 }}
        bgcolor="red"
        height="35vh"
        width="30vw"
      ></Stack>
    </Grid>
  );
}
