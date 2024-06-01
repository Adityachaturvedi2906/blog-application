import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const generateUniqueId = () => {
  return uuidv4();
};

const initialState = {
  posts: JSON.parse(localStorage.getItem("blogPosts")) || [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = { ...action.payload, id: generateUniqueId() };
      state.posts = [...state.posts, post];
      localStorage.setItem("blogPosts", JSON.stringify(state.posts));
    },
    updatePost: (state, action) => {
      const { id, title, description, coverPhoto, username } = action.payload;
      const existingPostIndex = state.posts.findIndex((post) => post.id === id);
      if (existingPostIndex !== -1) {
        state.posts[existingPostIndex] = { id, title, description, coverPhoto, username };
        localStorage.setItem("blogPosts", JSON.stringify(state.posts));
      }
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      localStorage.setItem("blogPosts", JSON.stringify(state.posts));
    },
    clearPosts: (state) => {
      state.posts = [];
      localStorage.removeItem("blogPosts");
    },
  },
});

export const { addPost, updatePost, removePost, clearPosts } = blogSlice.actions;

export default blogSlice;
