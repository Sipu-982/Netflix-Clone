import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilePen } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';

const ViewVideos = () => {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authenticateUser');
        if (!token) {
          alert('No token found. Please log in again.');
          return;
        }

        const response = await axios.get("http://localhost:4000/api/upload/get-movies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVideoData(response.data.MoviesData);
      } catch (error) {
        console.error(error.response?.data?.message || 'Upload failed!');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

 const removeVideo = async (id)=>{
  const confirmDelete= window.confirm("Are you want to remove video?")
  if(!confirmDelete) return
  try {
    const token = localStorage.getItem('authenticateUser');
        if (!token) {
          alert('No token found. Please log in again.');
          return;
        }
      const response = await axios.delete(`http://localhost:4000/api/upload/delete-movie/${id}`,{
          headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert(response.data.message)
      setVideoData((videoInfo)=>videoInfo.filter((infos)=>infos._id !==id))
  } catch (error) {
       alert(error.response?.data?.message || error.message || 'Something went wrong');
  }
  
 }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Uploaded Videos</h1>
     {/* <hr className='text-gray-300 mt-5'/> */}
      <div className="overflow-auto  max-w-[1000px] max-h-[500px] w-full custom-scrollbar">
        <table className=" bg-white shadow-md">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 top-0 z-50 sticky text-white">
            <tr>
              <th className="py-3 px-4 text-center">#</th>
              <th className="py-3 px-4 text-center">Title</th>
              <th className="py-3 px-4 text-center">Duration</th>
              <th className="py-3 px-4 text-center">Year</th>
              <th className="py-3 px-4 text-center">Category</th>
              <th className="py-3 px-4 text-center">Poster</th>
              <th className="py-3 px-4 text-center">Banner</th>
              <th className="py-3 px-4 text-center">Video</th>
              <th className="py-3 px-4 text-center">Description</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className='border-b border-gray-300 bg-gradient-to-r from-[#ffd8e0] to-[#22ef48]'>
            {videoData.length > 0 ? (
              videoData.map((video, index) => (
                <tr key={video._id} className=" border-b border-white transition-all">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold text-gray-700">{video.title}</td>
                  <td className="py-3 px-4">{video.duration}</td>
                  <td className="py-3 px-4">{video.year}</td>
                  <td className="py-3 px-4">{video.category}</td>
                  <td className="py-3 px-4">
                    <img src={video.poster} alt="poster" className="w-20 h-20 object-contain" />
                  </td>
                  <td className="py-3 px-4">
                    <img src={video.banner} alt="" className="w-20 h-20 object-contain" />
                  </td>
                  <td className="py-3 px-4">
                    <video src={video.video} controls className="w-45 h-20 " />
                  </td>
                  <td className="py-3 px-4 max-w-[200px]">
                    <p className="truncate" title={video.description}>{video.description}</p>
                  </td>
                  <td className="flex items-center justify-center py-3 px-4 space-x-2">
                    <Link to={`/edit-video/${video._id}`} className="cursor-pointer text-blue-700"><FaFilePen size={20} /></Link>
                    <button><RiDeleteBin6Line size={20} onClick={()=>removeVideo(video._id)}   className='text-red-500 cursor-pointer'/></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-8 text-lg font-medium">
                  No videos uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewVideos;
