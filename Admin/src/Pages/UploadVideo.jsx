import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const UploadVideo = () => {
  const [video, setVideo] = useState({
    title: '',
    year: '',
    duration: '',
    poster: null,
    banner:null,
    video: null,
    category: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setVideo((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setVideo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authenticateUser');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('title', video.title);
      formData.append('year', video.year);
      formData.append('duration', video.duration);
      formData.append('category', video.category);
      formData.append('description', video.description);
      formData.append('poster', video.poster);
      formData.append('banner', video.banner);

      if (video.video) {
        formData.append('video', video.video);
      } 

      const response = await axios.post(
        'http://localhost:4000/api/upload/upload-movie',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert(response.data.message);
      console.log(response.data.uploadedData);

      setTimeout(() => {
        navigate('/view-videos');
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.message || 'Upload failed!');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl border border-gray-300 p-6 w-full max-w-4xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Upload Video
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 space-y-4">
            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={video.title}
                onChange={handleChange}
                placeholder="Enter movie title"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Released Year</label>
              <input
                type="text"
                name="year"
                value={video.year}
                onChange={handleChange}
                placeholder="Enter released year"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={video.duration}
                onChange={handleChange}
                placeholder="Enter movie duration"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Category</label>
              <select
                value={video.category}
                onChange={handleChange}
                name='category'
                className="w-full border px-4 py-2 rounded-lg"
              >
                <option value="">--Select Category--</option>
                <option value="Movies">Movies</option>
                <option value="Series">Series</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-4">
            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={video.description}
                onChange={handleChange}
                placeholder="Enter movie description"
                className="w-full px-4 py-2 rounded-lg border"
                rows={5}
              />
            </div>

            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Thumbnail Image</label>
              <input
                type="file"
                name="poster"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Banner Image</label>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className='input-field'>
              <label className="block text-gray-600 mb-1">Video File</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
