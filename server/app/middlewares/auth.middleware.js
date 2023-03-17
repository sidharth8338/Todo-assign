require("dotenv").config();
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response.utils");

exports.isAuthenticated = async (req, res, next) => {
  const accessToken = req.body.token;
  if (!accessToken) {
    res.status(400).send(errorResponse("Please Provide Access token"));
    return;
  }

  jwt.verify(
    accessToken,
    process.env.JWT_AUTH_TOKEN_SECRET,
    async (err, data) => {
      if (data) {
        req.body.id = data.user_id;
        next();
      } else if (err.message === "TokenExpiredError") {
        return res
          .status(403)
          .send(
            errorResponse(
              "Access Token Expired!",
              res.statusCode,
              res.statusMessage
            )
          );
      } else {
        return res
          .status(403)
          .send(
            errorResponse(err, res.statusCode, "User is not Authenticated")
          );
      }
    }
  );
};
