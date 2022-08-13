import axios from "axios";

export const asyncGetDishes = () => {
  return async (dispatch) => {
    const res = await axios.get(
      "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
    );

    res.hasOwnProperty("data")
      ? dispatch(success(res.data))
      : dispatch(fail({ error: "error" }));
  };
};

const success = (res) => {
  return {
    type: "SUCCESS",
    payload: res,
  };
};

const fail = (res) => {
  return {
    type: "FAIL",
    payload: res,
  };
};
