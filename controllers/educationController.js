const education = require("../models/education");
const messages = require("../utils/messages");

const addEdu = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { schoolName, discipline, certification, duration } = req.body;
    if (!schoolName || !discipline || !certification || !duration) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage || "All fields required.",
      });
    }
    const eduData = new education({
      user_id: user_id,
      schoolName,
      discipline,
      duration,
    }).save();
    return res.json({
      status: 200,
      message: "successfully added education info",
      data: eduData,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const updateEdu = async (req, res) => {
  try {
    const { id } = req.params;
    const { schoolName, discipline, certification, duration } = req.body;
    const eduToUpdate = education.findOneAndUpdate(
      { _id: id },
      { schoolName: schoolName, discipline: discipline, duration: duration },
      { new: true }
    );
    if (!schoolName || !discipline || !certification || !duration) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage,
      });
    }
    return res.json({
      status: 200,
      message: "Successfully Updated Yout Eduction History",
      data: eduToUpdate,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const deleteEdu = async (req, res) => {
  try {
    const { id } = req.params;
    const eduDelete = education.deleteOne({ _id: id });
    if (eduDelete.deletedCount === 0) {
      return res.json({ status: 400, message: "Data Not Found." });
    }
    if (eduDelete.deletedCount === 1) {
      return res.json({
        status: 200,
        message: `Education History with id: ${id} Deleted Successfully!`,
        deletedData: eduDelete,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addEdu,
  updateEdu,
  deleteEdu,
};
