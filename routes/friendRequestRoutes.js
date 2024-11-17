const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestController");

router.post("/", friendRequestController.createFriendRequest);

router.patch("/:id", friendRequestController.updateFriendRequestStatus);

module.exports = router;
