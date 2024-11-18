# Social Media Platform MongoDB Schema
This document describes the MongoDB schema and API operations for a basic social media platform. The platform supports user registration, friend requests, text posts, and comments.

## Collections Overview
1. Users Collection
Stores basic user information 

{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "password": "String", // hashed
  "name": "String",
  "createdAt": "Date"
}

2. FriendRequests Collection
Manages friend requests between users.
{
  "_id": "ObjectId",
  "sender": "ObjectId",    // reference to Users collection
  "receiver": "ObjectId",  // reference to Users collection
  "status": "String",      // "pending", "accepted", "rejected"
  "createdAt": "Date"
}
3. Posts Collection
Stores text-only posts created by users.
{
  "_id": "ObjectId",
  "user": "ObjectId",     // reference to Users collection
  "content": "String",
  "createdAt": "Date"
}
4. Comments Collection
Stores comments on posts.

{
  "_id": "ObjectId",
  "post": "ObjectId",     // reference to Posts collection
  "user": "ObjectId",     // reference to Users collection
  "content": "String",
  "createdAt": "Date"
}


## Required API Operations for Social Media Feed
1. Friends' Posts Feed API
Purpose: Retrieve all posts created by a user's friends.
- GET /api/feed/friends-posts
Query Parameter: userId
Operation Flow:
Find all accepted friend requests for the given user.
Extract friend IDs from these requests.
Fetch all posts created by these friends.
Sort posts by creation date (newest first).

2. Friend-Commented Posts API
Purpose: Retrieve posts from non-friends where a user's friends have commented.
Endpoint: GET /api/feed/friend-commented-posts
Query Parameter: userId
Operation Flow:
Find all accepted friend requests for the given user.
Extract the list of friend IDs.
Find all comments made by these friends.
Get posts associated with these comments.
Filter the results to show only posts from non-friends.
Sort posts by creation date (newest first).

