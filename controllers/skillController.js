const Skills = require("../models/skills");
const messages = require("../utils/messages");

const addSkill = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { skills_title, proficiency } = req.body;
    if (!skills_title) {
      return res.json({
        status: 400,
        message: "Your Skill Title field is required.",
      });
    }
    let userSkills = await Skills.findOne({ user_id, });
    let existingSkills = await Skills.findOne({'skill.skills_title':skills_title});
    if(existingSkills){
      return res.json({
        status: 400,
        message: "This skill already exists",
      });
    }
    if (!userSkills ) {
      userSkills = new Skills({ user_id, skill: [] });
    }
    userSkills.skill.push({ skills_title, proficiency });
    await userSkills.save();
    return res.json({
      status: 200,
      message: "Successfully added to your skills collection",
      data: userSkills.skill,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};


const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skills_title, proficiency } = req.body;

    if (!skills_title) {
      return res.json({
        status: 400,
        message: messages.missingInputErrorMessage,
      });
    }

    const skillToUpdate = await Skills.findOneAndUpdate(
      { _id: id },
      { skills_title, proficiency },
      { new: true }
    );
    console.log(`Skill found: ${skillToUpdate}`);

    if (!skillToUpdate) {
      return res.json({
        status: 404,
        message: "Skill not found",
      });
    }

    return res.json({
      status: 200,
      message: "Successfully Updated Your Portfolio",
      data: skillToUpdate,
    });
  } catch (error) {
    return res.json({ status: 500, message: error.message });
  }
};


const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skillToDelete = await Skill.deleteOne({ _id: id });

    if (skillToDelete.deletedCount === 0) {
      return res.json({ status: 404, message: "Data Not Found." });
    }
    if (skillToDelete.deletedCount === 1) {
      return res.json({
        status: 200,
        message: `Skill with id: ${id} Deleted Successfully!`,
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
