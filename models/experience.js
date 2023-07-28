const mongoose = require("mongoose");
const User = require("./users");

const { Schema } = mongoose;

const experienceSchema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDuration: [
    {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
  ],
});
