import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { LiaTimesSolid } from "react-icons/lia";

const CarouselVideos = () => {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    setIsPlaying(false); // reset video when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    setIsPlaying(false); // stop video when modal closes
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/upload/get-movies`);
        setVideoData((response.data.MoviesData || []).slice(0, 7));
      } catch (error) {
        console.error(error.response?.data?.message || 'Upload failed!');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1600 }, items: 5 },
    desktop: { breakpoint: { max: 1600, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 4 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 3 },
  };

  const CustomButtonGroup = ({ next, previous }) => (
    <div className="absolute top-1/2 -left-7 -right-6 flex justify-between px-4 transform -translate-y-1/2">
      <button onClick={previous} className="bg-[rgba(37,36,36,0.9)] p-3 w-8 h-27 text-white rounded-[30px]">
        <FaChevronLeft size={20} />
      </button>
      <button onClick={next} className="bg-[rgba(37,36,36,0.9)] p-2 w-8 h-27 text-white rounded-[30px]">
        <FaChevronRight size={20} />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-solid"></div>
      </div>
    );
  }

  if (!videoData || videoData.length === 0) {
    return <div className="text-red-400">No Videos are available...</div>;
  }

  return (
    <div className="lg:px-25 px-4 pt-15 min-h-[65vh]">
      <h1 className="text-2xl font-bold text-left mb-2 text-white">Trending Now</h1>
      <Carousel
        responsive={responsive}
        infinite
        autoPlaySpeed={3000}
        transitionDuration={600}
        arrows={false}
        customButtonGroup={<CustomButtonGroup />}
      >
        {videoData.map((videos, index) => (
          <div
            className="relative p-2 lg:w-[200px] md:w-[250px] transition-all duration-500 hover:scale-105 rounded-[10px]"
            key={videos._id}
          >
            <button onClick={() => openModal(videos)} className="cursor-pointer">
              <img
                src={videos.poster}
                alt={videos.title || 'Video Poster'}
                className="w-full h-[160px] md:h-[150px] lg:h-[250px] rounded-[10px] object-cover transition-all"
              />
            </button>
            <span
              className="absolute bottom-2 left-2 font-bold text-7xl text-black"
              style={{ textShadow: '2px 2px 4px rgba(0, 255, 0, 0.8)' }}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </Carousel>

      {/* Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-[rgb(0,0,0,0.8)] bg-opacity-60 flex justify-center items-center">
          <div className="rounded-[5px] border-[1px] border-[#666666] bg-[rgb(54,52,52,0.9)] md:w-[400px] lg:w-[750px] min-h-[500px] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-white transition-all duration-500 rounded-full p-1 cursor-pointer hover:bg-[rgba(157,154,154,0.7)]"
            >
              <LiaTimesSolid size={30} />
            </button>
            <img
              src={selectedVideo.banner}
              alt="Banner"
              className="w-full h-[400px] object-cover"
            />
            <div className="px-4 text-justify pt-4 min-h-[220px]">
              <div className="flex gap-x-4">
                <span className='p-1 bg-[#484646] text-gray-200 rounded'>{selectedVideo.title}</span>
                <span className='p-1 bg-[#484646] text-gray-200 rounded'>{selectedVideo.year}</span>
                <span className='p-1 bg-[#484646] text-gray-200 rounded'>{selectedVideo.category}</span>
              </div>
              <div className="pt-4">
                <p className='font-semibold text-md text-white'>{selectedVideo.description}</p>
              </div>
              <div className="pt-2">
                <button
  onClick={() => navigate('/watch', { state: { video: selectedVideo } })}
  className='flex text-white h-[40px] transition-all duration-500 hover:opacity-60 justify-center rounded-[5px] bg-[#fc021f] cursor-pointer w-45 text-center items-center gap-x-2 text-lg'
>
  Get Started <FaChevronRight />
</button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselVideos;
