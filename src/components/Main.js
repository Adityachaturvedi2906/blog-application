import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePost, updatePost } from "../utils/blogSlice";
import { UserContext } from "../contexts/UserContext";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
const Main = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.posts);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCoverPhoto, setEditCoverPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const postsPerPage = 4; 

  const { user } = useContext(UserContext); 

  useEffect(() => {
    if (blogs.length <= postsPerPage) {
      setCurrentPage(1);
    }
  }, [blogs]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const handleDelete = (postId) => {
    dispatch(removePost(postId));
  };

  const truncateDescription = (description) => {
    const maxLength = 36;
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setEditTitle(blog.title);
    setEditDescription(blog.description);
    setEditCoverPhoto(blog.coverPhoto);
  };

  const handleCoverPhotoChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setEditCoverPhoto(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = (postId) => {
    dispatch(
      updatePost({
        id: postId,
        title: editTitle,
        description: editDescription,
        coverPhoto: editCoverPhoto,
        username: blogs.find((blog) => blog.id === postId).username, 
      })
    );
    setEditingId(null); 
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-[#ddd0c81f] h-[89vh]">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-1 text-[#323232] uppercase" style={{ fontFamily: "sans-serif" }}>
          Blog Posts
        </h1>
        <hr className="border-t mx-auto border-gray-300 w-56" />
      </div>
      <div className="grid gap-6 mx-4 md:grid-cols-2 lg:grid-cols-4 mt-16">
        {currentPosts.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
            <Link to={`/page/${blog.id}`} className="" key={blog.id}>
              {editCoverPhoto && editingId === blog.id ? (
                <img src={editCoverPhoto} alt="Cover" className="w-full h-48 object-cover rounded-t-lg" />
              ) : (
                blog.coverPhoto && (
                  <img src={blog.coverPhoto} alt="Cover" className="w-full h-48 object-cover rounded-t-lg" />
                )
              )}
            </Link>
            <div className="p-4">
              {editingId === blog.id ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <Link to={`/page/${blog.id}`} className="" key={blog.id}>
                    <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                    <p className="overflow-hidden">{truncateDescription(blog.description)}</p>
                  </Link>
                </>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(blog.id)}
                  className={`text-black text-2xl rounded-lg mr-2 ${
                    user?.displayName === blog.username ? "text-black" : "text-[#00000070] cursor-not-allowed"
                  }`}
                  disabled={user?.displayName !== blog.username}
                >
                  <MdDelete />
                </button>
                {editingId === blog.id ? (
                  <button
                    onClick={() => handleUpdate(blog.id)}
                    className={`text-2xl mx-2 rounded-md ${
                      user?.displayName === blog.username ? "text-green-500" : "text-green-300 cursor-not-allowed"
                    }`}
                    disabled={user?.displayName !== blog.username}
                  >
                    <FaRegCheckCircle />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(blog)}
                    className={`text-2xl mx-2 rounded-md ${
                      user?.displayName === blog.username ? "text-blue-500" : "text-blue-300 cursor-not-allowed"
                    }`}
                    disabled={user?.displayName !== blog.username}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {blogs.length > postsPerPage && (
  <div className="flex justify-center mt-20">
    {/* Left navigation button */}
    <button
      onClick={() => paginate(currentPage - 1)}
      className={`mx-2 px-1 rounded-full ${
        currentPage === 1 ? "bg-gray-200 text-[#323232] cursor-not-allowed" : "bg-[#DDD0C8] text-white"
      }`}
      disabled={currentPage === 1}
    >
      <FaCaretLeft />
    </button>
    {/* Pagination buttons */}
    {[...Array(Math.ceil(blogs.length / postsPerPage)).keys()].map((number) => (
      <button
        key={number}
        onClick={() => paginate(number + 1)}
        className={`mx-2 py-1 px-3 rounded-full ${
          number + 1 === currentPage ? "bg-[#DDD0C8] text-[white]" : "bg-gray-200 text-[#323232]"
        }`}
      >
        {number + 1}
      </button>
    ))}
    {/* Right navigation button */}
    <button
      onClick={() => paginate(currentPage + 1)}
      className={`mx-2 px-1 rounded-full ${
        currentPage === Math.ceil(blogs.length / postsPerPage) ? "bg-gray-200 text-[#323232] cursor-not-allowed" : "bg-[#DDD0C8] text-white"
      }`}
      disabled={currentPage === Math.ceil(blogs.length / postsPerPage)}
    >
    <FaCaretRight />
    </button>
  </div>
)}

    </div>
  );
};

export default Main;
