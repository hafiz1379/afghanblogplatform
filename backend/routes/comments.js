const express = require("express");
const router = express.Router();
const {
  getPostComments,
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const { protect } = require("../middleware/auth");

router.route("/post/:postId").get(getPostComments).post(protect, addComment);

router.route("/:id").put(protect, updateComment).delete(protect, deleteComment);

module.exports = router;
