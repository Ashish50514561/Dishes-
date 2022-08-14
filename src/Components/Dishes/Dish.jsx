import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  asyncAddRating,
  asyncRemoveRating,
} from "../../Redux/Actions/resultsActions";

export default function Dish(props) {
  const {
    id,
    dishName,
    ratings,
    description,
    image,
    handleSelections,
    restrictSelection,
    result,
    points,
    index,
  } = props;
  const [rate, setRate] = useState(false);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer);
  const RatedDishes = useSelector((state) => state.ratedDishesReducer);
  const userSelections = JSON.parse(localStorage.getItem("userSelections"));

  const handleRemoveRating = () => {
    handleSelections(false);
    dispatch(asyncRemoveRating(id));
  };

  const restrict_3_Selections = () => {
    const userSelections = JSON.parse(localStorage.getItem("userSelections"));
    if (userSelections) {
      const updatedUserSelections = [...userSelections, id];
      !userSelections.includes(id) &&
        localStorage.setItem(
          "userSelections",
          JSON.stringify(updatedUserSelections)
        );
    } else {
      localStorage.setItem("userSelections", JSON.stringify([id]));
    }
  };

  const handleRating = () => {
    const dish = {
      id: id,
      dishName: dishName,
      description: description,
      image: image,
      rating: rating,
    };
    dispatch(asyncAddRating(dish));
    restrict_3_Selections();
  };

  useEffect(() => {
    userSelections && userSelections.length >= 3 && handleSelections(true);
  }, [RatedDishes]);

  return (
    <Grid p={2} item xs={12} sm={6} md={4} lg={3}>
      <Stack id="card" boxShadow={1}>
        <Card sx={{ height: "60vh" }}>
          <CardMedia
            sx={{ height: 185 }}
            component="img"
            image={image}
            alt=" image.."
          />

          <CardContent>
            <Stack className="stack">
              <Typography width="100%" fontSize="17px" color="primary.main">
                {result && <span id="rank">Rank- {index}</span>} {dishName} {""}
                | {result && `Points- ${points}`}
              </Typography>
              <Typography>{description.substring(0, 100)}...</Typography>
            </Stack>
          </CardContent>

          <CardActions>
            {!restrictSelection ? (
              userSelections && userSelections.includes(id) ? (
                <Box className="btn_container">
                  <button className="remove_btn" onClick={handleRemoveRating}>
                    Your Selection | Change?
                  </button>
                </Box>
              ) : (
                <Box className="btn_container">
                  {!rate ? (
                    <button className="btn" onClick={() => setRate(true)}>
                      Select this dish for Rating
                    </button>
                  ) : (
                    <Stack className="stack" direction="row" pb={1}>
                      <button
                        className=" btn_small"
                        onClick={() => setRate(false)}
                      >
                        Cancel
                      </button>

                      <button onClick={handleRating} className=" btn_small">
                        Done
                      </button>

                      <Rating
                        size="large"
                        max={3}
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </Stack>
                  )}
                </Box>
              )
            ) : userSelections && userSelections.includes(id) ? (
              <Box className="btn_container">
                <button className="remove_btn" onClick={handleRemoveRating}>
                  Your Selection | Change?
                </button>
              </Box>
            ) : (
              <Box className="btn_container">
                <button className="btn" variant="contained">
                  You Can only rate 3 items
                </button>
              </Box>
            )}
          </CardActions>
        </Card>
      </Stack>
    </Grid>
  );
}
