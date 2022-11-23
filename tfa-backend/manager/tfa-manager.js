const speakeasy = require("speakeasy");
const User = require("../models/user-model");
const { error } = require("../utils/logger");
const ManagerException = require("../utils/exceptions/manager-exception");
const QRCode = require("qrcode");

exports.generateSecretTokenToUser = async (userId) => {
  try {
    const fetchedUser = await User.findByPk(userId);
    if (fetchedUser.secretToken) {
      throw new Error(
        "2Factor Authentication already enabled for this account."
      );
    }

    // If Temp token is already exists then enabling it.
    if (fetchedUser.tmpSecretToken) {
      const otpUrl = `otpauth://totp/${process.env.ORG_NAME} (${fetchedUser.email})?secret=${fetchedUser.tmpSecretToken}`;
      const dataUrl = await QRCode.toDataURL(otpUrl);
      return {
        userId: userId,
        token: {
          otpAuthUrl: otpUrl,
          base32: fetchedUser.tmpSecretToken,
          qrCode: dataUrl,
        },
      };
    }
    const tmpSecretToken = speakeasy.generateSecret();
    fetchedUser.tmpSecretToken = tmpSecretToken.base32;
    tmpSecretToken.otpauth_url = `otpauth://totp/${process.env.ORG_NAME} (${fetchedUser.email})?secret=${tmpSecretToken.base32}`;
    const dataUrl = await QRCode.toDataURL(tmpSecretToken.otpauth_url);
    await fetchedUser.save();
    console.log("updating user");
    return {
      userId: userId,
      token: {
        otpAuthUrl: tmpSecretToken.otpauth_url,
        base32: tmpSecretToken.base32,
        qrCode: dataUrl,
      },
    };
  } catch (err) {
    error(err);
    console.error(err);
    throw new ManagerException(err);
  }
};

exports.verifyUserOtp = (token, otp) => {
  try {
    return speakeasy.totp.verify({
      secret: token,
      encoding: "base32",
      token: otp,
    });
  } catch (err) {
    error(req, err);
  }
};

exports.validateTFAToken = async (userId, otp) => {
  try {
    const fetchedUser = await User.findByPk(userId);
    console.log(otp);
    const verified = this.verifyUserOtp(fetchedUser.tmpSecretToken, otp);
    if (verified) {
      fetchedUser.secretToken = fetchedUser.tmpSecretToken;
      fetchedUser.tmpSecretToken = null;
      await fetchedUser.save();
      return fetchedUser;
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (err) {
    error(err);
    console.error(err);
    throw new ManagerException(err);
  }
};

exports.disableTFA = async (user, otp) => {
  try {
    const verified = this.verifyUserOtp(user.secretToken, otp);
    if (verified) {
      user.secretToken = null;
      return await user.save();
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (err) {
    error(err);
    console.error(err);
    throw new ManagerException(err);
  }
};
