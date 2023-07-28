const experience = require("../models/experience");
const messages = require("../utils/messages");

const addExperience = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { companyName, jobTitle, jobDuration } = req.body;
    if (!companyName || !jobTitle || !jobDuration) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage || "All fields required.",
      });
    }
    const experienceData = new experience({
      user_id: user_id,
      companyName,
      jobTitle,
      jobDuration,
    }).save();
    return res.json({
      status: 200,
      message: "successfully added experience info",
      data: experienceData,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, jobTitle, jobDuration } = req.body;
    const experienceToUpdate = experience.findOneAndUpdate(
      { _id: id },
      {
        companyName: companyName,
        jobTitle: jobTitle,
        jobDuration: jobDuration,
      },
      { new: true }
    );
    if (!companyName || !jobTitle || !jobDuration) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage,
      });
    }
    return res.json({
      status: 200,
      message: "Successfully Updated Yout Experience History",
      data: experienceToUpdate,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const experienceToDelete = experience.deleteOne({ _id: id });
    if (experienceToDelete.deletedCount === 0) {
      return res.json({ status: 400, message: "Data Not Found." });
    }
    if (experienceToDelete.deletedCount === 1) {
      return res.json({
        status: 200,
        message: `Experience History with id: ${id} Deleted Successfully!`,
        deletedData: eduDelete,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addExperience,
  updateExperience,
  deleteExperience,
};
