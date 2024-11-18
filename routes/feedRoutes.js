const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");

router.get("/friends-posts", feedController.getFriendsPosts);
router.get("/friend-commented-posts", feedController.getFriendCommentedPosts);

module.exports = router;
