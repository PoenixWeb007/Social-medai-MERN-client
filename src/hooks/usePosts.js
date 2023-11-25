import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { APIEndPoints } from "../utilities/APIEndpoints";
import { setPosts } from "../state/reducerSlices/userSlice";

export function useFetchUserPosts(userId) {
  const getUserPostsPath = APIEndPoints({ userId: userId }).posts.getUserPosts;
  const token = useSelector((state) => state.global.token);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(getUserPostsPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((r) => r.json())
      .then((posts) => {
        console.log("user posts : ", posts);
        dispatch(setPosts(posts));
      })
      .catch((error) => {
        console.log("fetch posts failed :", error);
      });
  }, [dispatch, getUserPostsPath, token]);
}

export function useFetchLike(postId, userId) {
  const likePath = APIEndPoints({ postId: postId }).posts.likeDislike;
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${state.token}`,
    },
    body: `{"userId":"${userId}"}`,
  };

  const fetchLike = () => {
    fetch(likePath, options)
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        const newPosts = state.posts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: response.likes };
          }
          return post;
        });
        dispatch(setPosts(newPosts));
      })
      .catch((err) => console.error(err));
  };
  return fetchLike;
}
export function useAddComment(postId, userId, newComment) {
  //const [comments, setComments] = useState(initComments);
  const addCommentPath = APIEndPoints({ postId: postId }).posts.addComment;

  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${state.token}`,
    },
    body: `{"userId":"${userId}","comment":"${newComment}"}`,
  };

  const addComment = () => {
    fetch(addCommentPath, options)
      .then((response) => response.json())
      .then((response) => {
        const newPosts = state.posts.map((post) => {
          if (post._id === postId) {
            return { ...post, comments: response };
          }
          return post;
        });
        dispatch(setPosts(newPosts));
      })
      .catch((err) => console.error(err));
  };
  return addComment;
}

export function useWhoLikes(likes) {
  const [users, setUsers] = useState([]);
  const state = useSelector((state) => state.global);
  const getUsersPath = APIEndPoints().users.getUsers;
  const likesUsers = Object.keys(likes);

  const getWhoLikes = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${state.token}`,
        },
        body: JSON.stringify(likesUsers),
      };

      const response = await fetch(getUsersPath, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWhoLikes();
  }, [likes]);

  return users;
}
