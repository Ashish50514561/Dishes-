export const asyncCurrentUser = (user) => {
  return {
    type: "USER",
    payload: user,
  };
};
