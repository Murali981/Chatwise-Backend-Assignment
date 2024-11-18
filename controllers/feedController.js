const User = require("../models/userModel");
const Post = require("../models/postModel");
const FriendRequest = require("../models/friendRequestModel");
const Comment = require("../models/commentModel");

exports.getFriendsPosts = async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from query parameter
    console.log(userId);

    // Get user's friends list
    const friendships = await FriendRequest.find({
      $and: [
        {
          $or: [{ sender: userId }, { receiver: userId }],
        },
        { status: "accepted" },
      ],
    });

    console.log(friendships);

    // Get friends' IDs
    const friendIds = friendships.map((friendship) =>
      friendship.sender.toString() === userId
        ? friendship.receiver
        : friendship.sender
    );

    console.log(friendIds);

    // Get posts from friends
    const friendsPosts = await Post.find({
      user: { $in: friendIds },
    })
      .populate("user", "username name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: {
        posts: friendsPosts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getFriendCommentedPosts = async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from query parameter
    console.log(userId);

    // 1. Get user's friends list
    const friendships = await FriendRequest.find({
      $and: [
        {
          $or: [{ sender: userId }, { receiver: userId }],
        },
        { status: "accepted" },
      ],
    });

    console.log(friendships);

    const friendIds = friendships.map((friendship) =>
      friendship.sender.toString() === userId.toString()
        ? friendship.sender
        : friendship.receiver
    );

    console.log(friendIds);

    // Find comments made by friends
    const friendComments = await Comment.find({
      user: { $in: friendIds },
    });

    console.log(friendComments);

    // Get unique post IDs from these comments
    const postIds = [...new Set(friendComments.map((comment) => comment.post))];

    console.log(postIds);

    // Get posts that aren't from friends but have friends' comments
    const nonFriendPosts = await Post.find({
      $and: [
        { _id: { $in: postIds } }, // Posts with friends' comments
        { user: { $nin: friendIds } }, // Posts not from friends
      ],
    })
      .populate("user", "username name") // Added name field to population
      .sort({ createdAt: -1 });

    console.log(nonFriendPosts);

    res.status(200).json({
      status: "success",
      data: {
        posts: nonFriendPosts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
