import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";

const Page = () => {
  const { postId } = useParams(); 
  const blogs = useSelector((state) => state.blog.posts);
  const [post, setPost] = useState(null); 

  useEffect(() => {
    const fetchedPost = blogs.find((blog) => blog.id === postId);
    setPost(fetchedPost);
  }, [blogs, postId]);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Rendering the post content
  return (
    <>
    <Header />
        <div className="p-4">
     <div> <img src={post.coverPhoto} className="w-3/12" alt="Cover" /></div>
     <h1 className="text-bold text-3xl" >{post.title}</h1>
      <p className="py-2">{post.description}</p>
    </div>
    </>
  );
};

export default Page;
