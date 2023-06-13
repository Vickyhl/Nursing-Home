// import { verify } from "jsonwebtoken";
// import HttpError from "../models/http-error";

// export default (req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   try {
//     const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
//     if (!token) {
//       throw new Error("Authentication failed!");
//     }
//     const decodedToken = verify(token, "supersecret_dont_share");
//     req.userData = { userId: decodedToken.userId };
//     next();
//   } catch (err) {
//     const error = new HttpError("Authentication failed!", 403);
//     return next(error);
//   }
// };
import jwt from "jsonwebtoken";
import HttpError from "../models/httpError.js";

const CheckAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};

export default CheckAuth;
