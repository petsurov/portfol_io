import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema({
  title: String,
  introduction: String,
  skillset: [String],
  project1: String,
  project2: String,
  project3: String,
  about: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var portfolio = mongoose.model("portfolio", portfolioSchema);

export default portfolio;
