require("dotenv").config();
const { errorResponse, successResponse } = require("../utils/response.utils");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { uniqueNumericId } = require("../utils/uniqueIdGenerator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.authenticateUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await UserModel.findOne({
      email: data.email,
    });
    if (!user) {
      res
        .status(400)
        .send(errorResponse("User is not registered with this email ID!"));
    } else {
      let matched = await bcrypt.compare(data.password, user.password);
      if (matched) {
        const accessToken = jwt.sign(
          {
            user_id: user._id,
          },
          process.env.JWT_AUTH_TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        res.status(200).send(
          successResponse(
            {
              token: accessToken,
              message: "Successfully Verified",
            },
            res.statusCode,
            res.statusMessage
          )
        );
      } else {
        res
          .status(400)
          .send(errorResponse("User ID or Password is incorrect!"));
      }
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send(errorResponse(e.message, res.statusCode, res.statusMessage));
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let data = req.body;
    let user = await UserModel.findOne({
      email: data.email,
    });
    if (!!user) {
      res
        .status(400)
        .send(errorResponse("User is Already Registered with this mail ID."));
    } else {
      bcrypt.hash(data.password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
          res.status(400).send(errorResponse(err));
          return;
        }
        UserModel.create({ ...data, password: hash })
          .then((r) => {
            const accessToken = jwt.sign(
              {
                user_id: r._id,
              },
              process.env.JWT_AUTH_TOKEN_SECRET,
              { expiresIn: "24h" }
            );
            res.status(200).send(
              successResponse({
                token: accessToken,
                message: "Successfully Verified",
              })
            );
          })
          .catch((e) => {
            console.log(e);
            res.status(400).send(errorResponse(e));
          });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(errorResponse(e));
  }
};
