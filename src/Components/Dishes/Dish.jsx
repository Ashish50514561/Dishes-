import React from "react";
import {
  Grid,
  Stack,
  Rating,
  Box,
  CardActions,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import {} from "@mui/material";

export default function Dish(props) {
  const { id, dishName, description, image } = props;

  return (
    <Grid p={2} item lg={3}>
      <Stack sx={{ position: "relative", borderRadius: 1.5, boxShadow: 1 }}>
        <Card sx={{ height: "60vh" }}>
          <CardMedia
            sx={{ height: 185 }}
            component="img"
            image={image}
            alt=" image.."
          />

          <CardContent>
            <Stack justifyContent="center" alignItems="center">
              <Typography variant="h6" color="primary.main">
                {dishName}
              </Typography>
              <Typography>{description.substring(0, 100)}...</Typography>
            </Stack>
          </CardContent>

          <CardActions>
            <Box sx={{ position: "absolute", bottom: 4 }}>
              <Button
                sx={{
                  //   color: "black",
                  bgcolor: "#575757",
                  ":hover": {
                    bgcolor: "#aaaaaa",
                    color: "black",
                  },
                }}
                variant="contained"
              >
                {" "}
                Select this dish for Rating
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Stack>
    </Grid>
  );
}
