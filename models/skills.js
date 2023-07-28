const mongoose = require("mongoose");
const User = require("./users");
const { Schema } = mongoose;

const SkillSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  skill: [
    {
      skills_title: {
        type: String,
        required: true,
      },
      proficiency: {
        type: Number,
      },
    },
  ],
});

const Skills = mongoose.model("Skills", SkillSchema);
module.exports = Skills;
