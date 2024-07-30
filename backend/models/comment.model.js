const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
