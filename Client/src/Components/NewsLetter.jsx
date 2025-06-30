import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import '../CSS/Banner.css'

const NewsLetter = () => {
  return (
    <div className="w-full min-h-[40vh] px-6 md:px-24 py-10 flex flex-col justify-center items-center bg-black text-white text-center">
      <p className="text-lg md:text-xl font-medium mb-4 max-w-2xl">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          className="w-full sm:flex-1 p-3 rounded  outline-none"
        />
        <button className="flex items-center justify-center gap-2 bg-[#c6050c] hover:bg-red-700 text-white px-5 py-3 rounded text-lg font-semibold transition duration-300">
          Get Started <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
