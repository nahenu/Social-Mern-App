import jwt from "jsonwebtoken";

export const createToken = (id, email, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, "nbhjnbjhbiuyhbnyg8oih", {
    expiresIn,
  });
  return token;
};
