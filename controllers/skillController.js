const skill = require("../models/skills");
const messages = require("../utils/messages");

const addSkill = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { skill_title, proficiency} =
      req.body;
    if (!skill_title || !proficiency) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage || "All fields required.",
      });
    }
    const skillData = new skill({
      user_id: user_id,
      skill_title,
      proficiency,
    }).save();
    return res.json({
      status: 200,
      message: "successfully added to your skills collection",
      data: skillData,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill_title, proficiency } = req.body;
    const skillToUpdate = skill.findOneAndUpdate(
      { _id: id },
      {
        skill_title: skill_title,
        proficiency: proficiency
      },
      { new: true }
    );
    if (!skill_title || !proficiency) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage,
      });
    }
    return res.json({
      status: 200,
      message: "Successfully Updated Yout Portfolio",
      data: skillToUpdate,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skillToDelete = skill.deleteOne({ _id: id });
    if (skillToDelete.deletedCount === 0) {
      return res.json({ status: 400, message: "Data Not Found." });
    }
    if (skillToDelete.deletedCount === 1) {
      return res.json({
        status: 200,
        message: `skill with id: ${id} Deleted Successfully!`,
        deletedData: skillToDelete,
      });
    }
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  addSkill,
  updateSkill,
  deleteSkill,
};
