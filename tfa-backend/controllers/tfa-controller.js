const ManagerException = require("../utils/exceptions/manager-exception");
const { logger, error } = require("../utils/logger");
const User = require("../models/user-model");
const tfaManager = require("../manager/tfa-manager");

exports.enableTfa = async (req, res) => {
  try {
    logger.info(
      "Enabling the 2Factor Authentication for user: " + req.loggedInUser.userId
    );
    const data = await tfaManager.generateSecretTokenToUser(
      req.loggedInUser.userId
    );
    logger.info("TFA Secret token generated.");
    return res.send({
      status: 200,
      message: "TFA Secret token was successfully generated.",
      data: data,
    });
  } catch (err) {
    error(req, err);
    if (err instanceof ManagerException) {
      res.status(500);
    } else {
      res.status(400);
    }
    return res.send({
      status: res.status,
      message: "Failed to generate the TFA Token.",
      devMessage: err.message,
    });
  }
};

exports.validateTFA = async (req, res) => {
  try {
    logger.info(
      "Validating the TFA Token using generated OTP " + req.loggedInUser.userId
    );
    await tfaManager.validateTFAToken(req.loggedInUser.userId, req.body.otp);
    return res.send({
      status: 200,
      message: "Token verified and TFA Enabled for the user.",
    });
  } catch (err) {
    error(req, err);
    if (err instanceof ManagerException) {
      res.status(500);
    } else {
      res.status(400);
    }
    return res.send({
      status: res.status,
      message: "Failed to Validate the User Token.",
      devMessage: err.message,
    });
  }
};

exports.disableTFA = async (req, res) => {
  try {
    logger.info(
      "Disabling the TFA for the user " + req.loggedInUser.userId
    );
    await tfaManager.disableTFA(req.loggedInUser, req.body.otp);
    return res.send({
      status: 200,
      message: "2Factor Authentication Disabled Successfully.",
    });
  } catch (err) {
    error(req, err);
    if (err instanceof ManagerException) {
      res.status(500);
    } else {
      res.status(400);
    }
    return res.send({
      status: res.status,
      message: "Failed to Validate the User Token.",
      devMessage: err.message,
    });
  }
};

exports.checkIfTFAEnabled = async (req, res) => {
  try {
    console.log(req.body.email)
    const user=await User.findOne({where:{email: req.body.email}})
    console.log(user)
    return res.send({
      status: 200,
      message: "Request processed successfully.",
      isTFAEnabled: user.secretToken ? true : false,
    });
  } catch (err) {
    error(req, err);
    if (err instanceof ManagerException) {
      res.status(500);
    } else {
      res.status(400);
    }
    return res.send({
      status: res.status,
      message: "Failed to Validate the User Token.",
      devMessage: err.message,
    });
  }
};
