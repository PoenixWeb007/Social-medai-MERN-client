import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Widgets/Post";
import { Box } from "@mui/material";
import { FetchUserPosts, useFetchUserPosts } from "../../hooks/usePosts";

function ProfilePage() {
  const { _id, firstName, lastName } = useSelector(
    (state) => state.global.user
  );
  const fullName = `${firstName} ${lastName}`;
  const posts = useSelector((state) => state.global.posts);

  useFetchUserPosts(_id);

  return (
    <Box sx={{ width: "40%" }}>
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            fullName={`${post.firstName} ${post.lastName}`}
            createdAt={post.createdAt}
            description={post.description}
            postId={post._id}
            likes={post.likes}
            comments={post.comments}
          />
        );
      })}
    </Box>
  );
}

export default ProfilePage;
