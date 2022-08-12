const userInitialState = [];

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return action.payload;
    }
    case "FAIL": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
