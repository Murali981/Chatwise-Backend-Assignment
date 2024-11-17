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
