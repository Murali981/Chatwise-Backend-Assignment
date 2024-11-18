Social Media Platform MongoDB Schema
This document outlines the MongoDB schema design for a basic social media platform that supports user registration, friend requests, and text posts with comments.
Collections Overview
1. Users Collection
Stores basic user information and authentication details:

{
  _id: ObjectId,
  username: String,
  email: String,
  password: String,  // hashed
  name: String,
  createdAt: Date
}

2. FriendRequests Collection
Manages friend requests between users:

{
  _id: ObjectId,
  sender: ObjectId,    // reference to Users collection
  receiver: ObjectId,  // reference to Users collection
  status: String,      // "pending", "accepted", "rejected"
  createdAt: Date
}

3. Posts Collection
Stores text-only posts created by users:

{
  _id: ObjectId,
  user: ObjectId,     // reference to Users collection
  content: String,
  createdAt: Date
}

4. Comments Collection
Stores comments on posts:

{
  _id: ObjectId,
  post: ObjectId,     // reference to Posts collection
  user: ObjectId,     // reference to Users collection
  content: String,
  createdAt: Date
}


Required API Operations for Social Media Feed
1. Friends' Posts Feed API

Purpose: Get all posts created by user's friends
Endpoint: GET /api/feed/friends-posts
Query Parameter: userId
Operation Flow:

Find all accepted friend requests for the given user
Extract friend IDs from these requests
Fetch all posts created by these friends
Sort posts by creation date (newest first)



2. Friend-Commented Posts API

Purpose: Get posts from non-friends where user's friends have commented
Endpoint: GET /api/feed/friend-commented-posts
Query Parameter: userId
Operation Flow:

Find all accepted friend requests for the given user
Get list of friend IDs
Find all comments made by these friends
Get posts associated with these comments
Filter to show only posts from non-friends
Sort posts by creation date (newest first)
