import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const WatchedVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { video } = location.state || {};

  if (!video) {
    return <div className="text-white p-4">No video data found.</div>;
  }

  return (
    <div className="w-full py-[100px] min-h-[85vh] bg-black flex flex-col items-center justify-start p-6">
      
      <video controls autoPlay className="w-full max-w-4xl rounded-lg">
        <source src={video.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <p className="text-white mt-4 max-w-4xl">{video.description}</p>
     <div className="flex justify-start"><Link to='/' className='text-white py-2 px-4 bg-red-600 '>Back</Link></div>
    </div>
  );
};

export default WatchedVideo;
