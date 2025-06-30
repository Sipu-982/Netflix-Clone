import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../CSS/SearchVideo.css'
import { useNavigate } from 'react-router-dom';

const SearchVideo = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedVideo, setSearchedVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setShowMessage('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authenticateUser");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `http://localhost:4000/api/upload/searchVideo?title=${searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSearchedVideo(response.data.SearchedData || []);
      // setShowMessage(response.data.message || 'Search completed.');
    } catch (error) {
      setShowMessage(error.response?.data?.message || "Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    desktop: { breakpoint: { max: 1600, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-[85vh] px-4 pt-[150px]">
      {/* Search Bar */}
      <div className="flex relative flex-col md:flex-row items-center gap-2 w-full max-w-2xl">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter video title..."
          className="flex-1 searchbar px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-red-500 cursor-pointer text-white w-30 h-12 transition-all duration-500 rounded hover:bg-red-400"
        >
          Search
        </button>
      </div>

      {/* Message */}
      {showMessage && (
        <div className="mt-4 text-blue-600 font-medium">{showMessage}</div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : (
        <>
          {/* No Results */}
          {searchedVideo.length === 0 && searchInput.trim() !== '' && (
            <div className="flex justify-center items-center w-full h-[40vh]">
              <div className="text-red-500 font-bold text-xl">
                No videos found for the given search.
              </div>
            </div>
          )}

          {searchedVideo.length > 0 && (
  <div className="flex flex-col w-full gap-6 mt-6 max-w-5xl px-2">
    {searchedVideo.map((video) => (
      <div
        key={video._id}
        className="flex flex-col lg:flex-row gap-4 bg-white  shadow-md border border-gray-200 p-4"
      >
        <div className="w-full lg:w-[300px] h-[180px] flex-shrink-0">
          {video.banner && (
            <img
              src={video.banner}
              alt="Poster"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{video.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Year: {video.year}</p>
            <p className="text-sm text-gray-500">Category: {video.category}</p>
          </div>
          <p className="text-sm text-gray-700 mt-3">{video.description}</p>
          <button
            onClick={() => navigate('/watch', { state: { video: video } })}
            className='flex text-white h-[40px] mt-4 transition-all duration-500 hover:opacity-60 justify-center rounded bg-[#fc021f] cursor-pointer w-30 text-center items-center gap-x-2 text-lg'
          >
           Watch Now
          </button>
        </div>
      </div>
    ))}
  </div>
)}

        </>
      )}

      {!searchInput.trim() && !loading && searchedVideo.length === 0 && (
        <div className="w-full mt-10">
          <div className="px-2 pt-15 h-[350px]">
            
            <Carousel
              responsive={responsive}
              infinite
              autoPlay={true}
              autoPlaySpeed={2000}
              transitionDuration={700}
              arrows={false}
            >
              {videoData.map((videos) => (
                <div
                  className="relative p-2 lg:w-[300px] sm:w-[350px] md:[300px] mr-2 h-[210px] transition-all duration-500 hover:opacity-75"
                  key={videos._id}
                >
                  <img
                    src={videos.banner}
                    alt={videos.title || 'Video banner'}
                    className="w-full h-full object-contain transition-all"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchVideo;
