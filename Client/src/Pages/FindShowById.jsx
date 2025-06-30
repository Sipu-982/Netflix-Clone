import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FindShowById = () => {

    const [videoInfo,setVideoInfo] = useState(null)
    const {id}= useParams()

    useEffect(()=>{
     const getVideo =async()=>{
        try {
            const token = localStorage.getItem("authenticateUser");
        if (!token) {
          alert("No token found. Please log in again.");
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/upload/getVideo/${id}`,{
           headers: {
            Authorization: `Bearer ${token}`
          } 
        })
        console.log(response.data.message);
        console.log(response.data.fetchedMovie);
        setVideoInfo(response.data.fetchedMovie)

        } catch (error) {
           console.error(error.response?.data?.message || "Something went wrong!");
        }
     }
     getVideo()
    },[id])

    if(!videoInfo){
        return(
          <div className="text-red-500 text-center mt-10">Product not found</div>  
        );
    }
  return (
    <div className='w-full min-h-[92vh]  flex justify-center items-center'>
     <div className="w-full rounded bg-[rgb(54,52,52)] max-w-[600px] min-h-[450px]">
      <div className="">
        <img src={videoInfo.banner} className='w-full h-[400px] object-cover' alt="" />
      </div>
      <div className="px-4 text-justify pt-4 h-[170px]">
      <div className="flex gap-x-2">
        <span>{videoInfo.title}</span>
        <span>{videoInfo.year}</span>
        <span>{videoInfo.category}</span>
      </div>
      <div className="">
        <p>{videoInfo.description}</p>
      </div>
     </div>
     </div>
    </div>
  )
}

export default FindShowById