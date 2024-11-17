const FriendRequest = require("../models/friendRequestModel");

exports.createFriendRequest = async (req, res) => {
  try {
    const newFriendRequest = await FriendRequest.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        friendRequest: newFriendRequest,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update friend request status
exports.updateFriendRequestStatus = async (req, res) => {
  try {
    const updatedFriendRequest = await FriendRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        friendRequest: updatedFriendRequest,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
