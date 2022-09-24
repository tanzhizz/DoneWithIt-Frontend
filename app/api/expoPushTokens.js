import client from "./client";

const register = (pushToken) =>
  client.post("/expoPushTpkens", { token: pushToken });

export default {
  register,
};
