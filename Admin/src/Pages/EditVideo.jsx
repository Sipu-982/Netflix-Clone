import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";

const EditVideo = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [videodata, setVideoData] = useState({
    title: '',
    year: '',
    duration: '',
    poster: null,
    banner: null,
    video: null,
    category: '',
    description: '',
  });

  // Fetch video data on load
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('authenticateUser');
        if (!token) {
          alert('No token found. Please log in again.');
          return;
        }
        const response = await axios.get(`http://localhost:4000/api/upload/getVideo/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.message);
        console.log(response.data.fetchedMovie);
        setVideoData(response.data.fetchedMovie);
      } catch (error) {
        console.log(error.response?.data?.message || error.message || 'Something went wrong');
      }
       finally{
                setLoading(false)
            }
    };
    fetchVideos();
  }, [id]);

  // Handle input and file change
  const handleVideo= (e)=>{
 const { name, value, files } = e.target;
    if (files) {
      setVideoData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setVideoData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
      }

  // Submit modified data
  const modifyVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('authenticateUser');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }

      const formData = new FormData()
      formData.append('title',videodata.title)
      formData.append('year',videodata.year)
      formData.append('duration',videodata.duration)
      formData.append('category',videodata.category)
      formData.append('description',videodata.description)
          if (videodata.poster && typeof videodata.poster !== 'string') {
      formData.append('poster', videodata.poster);
    }

    if (videodata.banner && typeof videodata.banner !== 'string') {
      formData.append('banner', videodata.banner);
    }

    if (videodata.video && typeof videodata.video !== 'string') {
      formData.append('video', videodata.video);
    }


      const response = await axios.put(
        `http://localhost:4000/api/upload/modify-movie/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert(response.data.message);
      console.log(response.data.updatedVideo);
      navigate('/view-videos');
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Loading spinner
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
        onSubmit={modifyVideo}
        className="bg-white shadow-lg rounded-xl border border-gray-300 p-6 w-full max-w-4xl"
      >
        <div className="flex mt-2 justify-start items-center">
        <Link to='/view-videos'><FaAngleLeft size={20} className='bg-blue-600 rounded-full text-white' /></Link>
        </div>
         <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Modify Video
        </h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 space-y-4">
            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='title'>Title</label>
              <input
                type="text"
                id='title'
                name="title"
                value={videodata.title || ''}
                onChange={handleVideo}
                placeholder="Enter movie title"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='year'>Released Year</label>
              <input
                type="text"
                name="year"
                id='year'
                value={videodata.year || ''}
                onChange={handleVideo}
                placeholder="Enter released year"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='duration'>Duration</label>
              <input
                type="text"
                id='duration'
                name="duration"
                value={videodata.duration || ''}
                onChange={handleVideo}
                placeholder="Enter movie duration"
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='category'>Category</label>
              <select
                name="category"
                id='category'
                value={videodata.category || ''}
                onChange={handleVideo}
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
            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='description'>Description</label>
              <textarea
                name="description"
                id='description'
                value={videodata.description || ''}
                onChange={handleVideo}
                placeholder="Enter movie description"
                className="w-full px-4 py-2 rounded-lg border"
                rows={5}
              />
            </div>

            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='poster'>Thumbnail Image</label>
              <input
                type="file"
                id='poster'
                name="poster"
                accept="image/*"
                onChange={handleVideo}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
               <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='banner'>Banner Image</label>
              <input
                type="file"
                id='banner'
                name="banner"
                accept="image/*"
                onChange={handleVideo}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>
            <div className="input-field">
              <label className="block text-gray-600 mb-1" htmlFor='video'>Video File</label>
              <input
                type="file"
                id='video'
                name="video"
                accept="video/*"
                onChange={handleVideo}
                className="w-full px-4 py-2 rounded-lg border"
              />
            </div>

          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {loading ? 'Updating...' : 'Modify Video'}
        </button>
        
      </form>
    </div>
  );
};

export default EditVideo;
