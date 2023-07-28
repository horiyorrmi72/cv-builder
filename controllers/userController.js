const User = require("../models/users");

const listUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).exec();

    if (!user) {
      return res.json({ status: 401, message: "User Not Found" });
    }
    return res.json({ status: 200, message: "user Found", user: user });
  } catch (error) {
    if (error) return res.status(500).json({ message: "internal error" });
  }
};

const deleteUser = async (req, res) => {
    try {
      const { username } = req.params.username;
      const result = await User.deleteOne({ username: username });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ status: 404, message: "User Not Found" });
      }
  
      return res.json({ status: 200, message: "User Deleted Successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ status: 500, message: "Internal Error" });
    }
  };
  
module.exports = {
  listUsers,
  getUsersById,
  deleteUser,
};
