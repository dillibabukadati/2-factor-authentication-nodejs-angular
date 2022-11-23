const cryptor = require("../utils/cryptor");
const jwt = require("../utils/jwt");
const User = require("../models/user-model");
const UserRoles = require("../models/user-roles");
const { body, validationResult } = require("express-validator");
const { error, logger } = require("../utils/logger");
const tfaManager = require("../manager/tfa-manager");

exports.login = async (req, res) => {
  logger.info("logging the user");
  const payload = req.body;
  const fetchedUser = await User.findOne({
    where: { email: payload.email },
    include: UserRoles,
  });
  const errorResponse = { status: 400, message: "Invalid email or password" };
  if (!fetchedUser) {
    return res.status(400).send(errorResponse);
  }
  const isValidPassword = await cryptor.isValidPassword(
    payload.password,
    fetchedUser.password
  );
  if (!isValidPassword) {
    return res.status(400).send(errorResponse);
  }

  // User Enabled 2Factor Authentication.
  if (fetchedUser.secretToken) {
    if (!payload.otp) {
      return res.status(400).send({ status: 400, message: "OTP Not provided" });
    }
    if (!tfaManager.verifyUserOtp(fetchedUser.secretToken, payload.otp)) {
      return res.status(400).send({ status: 400, message: "Invalid OTP" });
    }
    // valid otp entered
  }

  const accessToken = jwt.generateJwtToken(fetchedUser);
  fetchedUser.set("lastLogin", new Date());
  fetchedUser.set("accessToken", accessToken);
  await fetchedUser.save();
  const response = {
    status: 200,
    message: "Login  successfully.",
    user: fetchedUser,
  };
  res.send(response);
};

exports.register = async (req, res) => {
  try {
    const payload = req.body;
    const existingUser = await User.findOne({
      where: { email: payload.email },
    });
    if (existingUser) {
      return res
        .statu(400)
        .send({ status: 400, message: "User already exists with the email" });
    }
    const encryptedPassword = await cryptor.encrypt(payload.password);
    const user = {
      name: payload.name,
      email: payload.email,
      password: encryptedPassword,
      user_roles: [
        {
          roleName: "USER",
        },
      ],
    };

    const savedUser = await User.create(user, { include: [UserRoles] });
    const accessToken = jwt.generateJwtToken(savedUser);
    savedUser.set("lastLogin", new Date());
    savedUser.set("accessToken", accessToken);
    await savedUser.save();
    const response = {
      status: 200,
      message: "Registered successfully.",
      user: savedUser,
    };
    res.send(response);
  } catch (err) {
    error(req, err);
    console.error(err);
    return res.status(400).send({
      status: 400,
      message: "Registration Failed",
      devMessage: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.loggedInUser.accessToken = null;
    await req.loggedInUser.save();
    res.send({
      status: 200,
      message: "Logged out successfully.",
    });
  } catch (err) {
    error(req, err);
    console.error(err);
    return res.status(400).send({
      status: 400,
      message: "Registration Failed",
      devMessage: err.message,
    });
  }
};
