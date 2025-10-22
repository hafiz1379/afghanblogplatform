const Comment = require("../models/Comment");
const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
exports.getPostComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return next(
        new ErrorResponse(`Post not found with id of ${req.params.postId}`, 404)
      );
    }

    const comments = await Comment.find({ post: req.params.postId }).populate({
      path: "author",
      select: "name",
    });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to a post
// @route   POST /api/comments/post/:postId
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return next(
        new ErrorResponse(`Post not found with id of ${req.params.postId}`, 404)
      );
    }

    // Add user and post to req.body
    req.body.author = req.user.id;
    req.body.post = req.params.postId;

    const comment = await Comment.create(req.body);

    // Add comment to post's comments array
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is comment owner or admin
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this comment`,
          401
        )
      );
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is comment owner or admin
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this comment`,
          401
        )
      );
    }

    // Remove comment from post's comments array
    const post = await Post.findById(comment.post);
    post.comments = post.comments.filter(
      (c) => c.toString() !== comment._id.toString()
    );
    await post.save();

    comment.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
