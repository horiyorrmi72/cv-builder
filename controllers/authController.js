const User = require("../models/users");
const messages = require("../utils/messages");
const { hashPassword, checkPassword } = require("../utils/securePassword");
const {
  generateAccessToken,
  refreshToken,
  verifyToken,
} = require("../utils/tokengenerator");

const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.json({
        status: 1001,
        message: messages.missingInputErrorMessage,
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email: email, username: username }],
    });
    if (existingUser) {
      return res.json({ status: 1002, message: messages.existingUserMessage });
    }
    const hashDigit = await hashPassword(password);
    const user = new User({
      email,
      username,
      password: hashDigit,
    });
    await user.save();

    const token = generateAccessToken({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
    console.log(user, token);
    return res.json({
      status: 201,
      message: messages.successSignUpMessage,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        status: 1001,
        message: messages.missingInputErrorMessage,
      });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json({ status: 201, message: messages.notRegistered });
    }
    const validatePassword = await checkPassword(password, user.password);
    if (!validatePassword) {
      return res.json({ status: 401, message: messages.passwordErrorMessage });
    }
    const token = generateAccessToken({ userId: user._id });
    return res.json({
      status: 200,
      message: messages.successLoginMessage,
      user: { userId: user._id, email: user.email, username: user.username },
      token: "JWT " + token,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: 500, message: messages.internalErrorMessage });
    }
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const refreshedToken = req.headers.authorization.split(" ")[1];
    console.log(req.headers)
    if (!refreshedToken) {
      return res.status(403).json({ message: "Refresh token not provided" });
    }

    const decodedToken = verifyToken(refreshToken);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(403).json({ status: 403, message: "User not found" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  refreshUserToken,
};
