// Add.js
import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../utils/blogSlice';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Add = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    if (state) {
      setTitle(state.title);
      setDescription(state.description);
      setCoverPhoto(state.coverPhoto);
    }
  }, [state]);

  const handleCoverPhotoChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPhoto(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: state ? state.id : new Date().toISOString(),
      title,
      description,
      coverPhoto,
      username: user.displayName,
    };

    if (state && state.id) {
      dispatch(updatePost(post));
    } else {
      dispatch(addPost(post));
    }

    setTitle('');
    setDescription('');
    setCoverPhoto(null);
    window.history.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Add a Blog</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cover Photo</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleCoverPhotoChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Blog Title"
            variant="outlined"
            required
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Blog Description"
            required
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="contained" color="primary">
            {state && state.id ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Add;
