const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  updateMe,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.route("/me").get(protect, getMe).put(protect, updateMe);

module.exports = router;
