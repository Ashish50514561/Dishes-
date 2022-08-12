import axios from "axios";

export const asyncGetUsers = () => {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/admin`);
    console.log("boomm yr", res.data);
    //   res.data.hasOwnProperty("successUser")
    //     ? dispatch(success(res.data))
    //     : dispatch(fail(res.data));
  };
};
