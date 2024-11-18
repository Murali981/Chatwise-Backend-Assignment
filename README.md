# Social Media Platform Backend API

## Overview
This is a MongoDB-based social media platform API that enables user registration, friend management, post creation, and commenting functionality. The API provides endpoints for managing user feed based on friend relationships and comment interactions.

## Collections Overview

## User Model
```json
{
    "_id": "ObjectId",
    "username": "String",
    "email": "String",
    "password": "String",  
    "name": "String",
    "createdAt": "Date"
}
```

## FriendRequest Model
```json
{
    "_id": "ObjectId",
    "sender": "ObjectId",    // reference to Users collection
    "receiver": "ObjectId",  // reference to Users collection
    "status": "String",      // "pending", "accepted", "rejected"
    "createdAt": "Date"
}
```

## Post Model
```json
{
    "_id": "ObjectId",
    "user": "ObjectId",     // reference to Users collection
    "content": "String",
    "createdAt": "Date"
}
```

## Comment Model
```json
{
    "_id": "ObjectId",
    "post": "ObjectId",     // reference to Posts collection
    "user": "ObjectId",     // reference to Users collection
    "content": "String",
    "createdAt": "Date"
}
```

## API Documentation

### Get Friends' Posts
- Endpoint: `/api/feed/friends-posts`
- Method: GET
- Query Parameters
  ```json
  
   {
  "userId": "user-id-to-fetch-feed-for"
  }
  
  ```
- Response:
  ```json
  {
  "status": "success",
  "data": {
      "posts": [
          {
              "_id": "post_id",
              "content": "Post content",
              "user": {
                  "_id": "user_id",
                  "username": "username",
                  "name": "User Name"
              },
              "createdAt": "timestamp"
          }
      ]
  }
}
```

### Get Friend Commented Posts
- Endpoint: `/api/feed/friend-commented-posts`
- Method: GET
- Query Parameters
```json
{
  "userId": "user-id-to-fetch-feed-for"
}
```
- Response:
  ```json
  {
  "status": "success",
  "data": {
      "posts": [
          {
              "_id": "post_id",
              "content": "Post content",
              "user": {
                  "_id": "user_id",
                  "username": "username",
                  "name": "User Name"
              },
              "createdAt": "timestamp"
          }
      ]
  }
}
```
## Feed Visibility Rules

1) A user can see posts that:
- Were created by their friends
- Were created by non-friends but have comments from their friends

2) Operation Flow:
- Friends' Posts:
   - Find accepted friend requests
   - Extract friend IDs
   - Fetch friends' posts
   - Sort by creation date
- Friend-Commented Posts:
   - Find accepted friend requests
   - Get friend IDs
   - Find friends' comments
   - Get associated posts
   - Filter non-friend posts
   - Sort by creation date

# Additional Information
This API is designed to be simple and efficient, focusing on core social media functionality
    



  

