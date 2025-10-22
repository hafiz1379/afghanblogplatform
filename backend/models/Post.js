const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  slug: String,
  content: {
    type: String,
    required: [true, "Please add content"],
  },
  excerpt: {
    type: String,
    required: [true, "Please add an excerpt"],
    maxlength: [500, "Excerpt cannot be more than 500 characters"],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: [
      "technology",
      "lifestyle",
      "business",
      "entertainment",
      "news",
      "other",
    ],
  },
  tags: [String],
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create slug from title
PostSchema.pre("save", function (next) {
  const slugify = require("slugify");
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Post", PostSchema);
