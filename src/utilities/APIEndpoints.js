export const APIEndPoints = ({ userId = "", postId = "" } = {}) => {
  return {
    auth: {
      login: "http://localhost:4000/auth/login",
      register: "http://localhost:4000/auth/register",
    },
    posts: {
      getUserPosts: `http://localhost:4000/posts/${userId}`,
      likeDislike: `http://localhost:4000/posts/${postId}`,
      addComment: `http://localhost:4000/posts/${postId}/comments`,
    },
    users: {
      getUser: `http://localhost:4000/users/${userId}`,
      getUsers: `http://localhost:4000/users/`,
    },
  };
};
