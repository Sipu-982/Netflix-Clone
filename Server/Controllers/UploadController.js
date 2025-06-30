const UploadModel = require('../Models/UploadModel');
const streamifier = require('streamifier');
const cloudinary = require('../Configs/Cloudinary');

const uploadMovie = async (req, res) => {
  try {
    const { title, year, duration, category, description, videoUrl } = req.body;

    if (!req.files || !req.files.poster || !req.files.banner || (!req.files.video)) {
      return res.status(400).json({ message: "Poster,banner and video file are required!" });
    }

    if (!title || !year || !duration || !category || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const posterResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: process.env.CLOUDINARY_POSTER_FOLDER },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.files.poster[0].buffer).pipe(stream);
    });

const bannerResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: process.env.CLOUDINARY_BANNER_FOLDER },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.files.banner[0].buffer).pipe(stream);
    });


    if (req.files?.video) {
      const videoResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: process.env.CLOUDINARY_VIDEO_FOLDER,
            resource_type: 'video',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.files.video[0].buffer).pipe(stream);
      });
    const newUpload = await UploadModel.create({
      title,
      year,
      duration,
      poster: posterResult.secure_url,
      banner: bannerResult.secure_url,
      video: videoResult.secure_url,
      category,
      description,
    });
  
    return res.status(201).json({
      message: 'Movie uploaded successfully!',
      uploadedData: newUpload,
    });
  }
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getMovies= async (req,res)=>{
    try {
        const findMovies= await UploadModel.find()
        if(!findMovies || findMovies.length===0){
           return res.status(404).json({message:"Currently movies aren't available!"})
        }
       return res.status(200).json({message:"Movies are founded successfully!",MoviesData:findMovies})
    } catch (error) {
          console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  
    }
}


const searchVideo = async (req,res)=>{
    try {
       const {title}= req.query;
       if(!title){
        return res.status(400).json({message:"Enter the video title to search"})
       }
       const searchVideo= await UploadModel.find({
        title:{$regex:title,$options:"i"}
       })
       if(!searchVideo){
      return res.status(404).json({message:"Searched video is not available!"})
       }
       res.status(200).json({message:"Searched video find successfully!",SearchedData:searchVideo})
         } catch (error) {
      console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  
    }
}


const getMovieById = async (req,res)=>{
    try {
        const {id}= req.params;
        const getMovie= await UploadModel.findById(id)
        if(!getMovie){
           return res.status(404).json({message:"Movie doesn't exist!"})
        }
       return res.status(200).json({message:"Movie fetched successfully!",fetchedMovie:getMovie})
    } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
    }
}


const modifyMovie= async (req,res)=>{
    try {
        const movieId = req.params.id;
        const updatedData= {
        title: req.body.title,
      year: req.body.year,
      duration: req.body.duration,
      category: req.body.category,
      description: req.body.description
    }
    if (req.files?.poster?.[0]) {
      updatedData.poster = req.files.poster[0].filename;
    }
    if (req.files?.banner?.[0]) {
      updatedData.banner = req.files.banner[0].filename;
    }
    if (req.files?.video?.[0]) {
      updatedData.video = req.files.video[0].filename;
    }
        const updateMovie= await UploadModel.findByIdAndUpdate(movieId,updatedData,{new:true})
        if(!updateMovie){
        return res.status(404).json({message:"Movie doesn't exist!"})
        }
       return res.status(200).json({message:"Video updated successfully",updatedVideo:updateMovie})
    } catch (error) {
     console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
   
    }
}


const deleteVideo= async (req,res)=>{
    try {
        const {id}= req.params;
        const removeVideo= await UploadModel.findByIdAndDelete(id);
        if(!removeVideo){
           return res.status(404).json({message:"Video isn't available!"})
        }
      res.status(200).json({message:"Video removed successfully!",removedData:removeVideo})
    } catch (error) {
        console.error("Upload error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
 
    }
}
module.exports = { uploadMovie,getMovies,searchVideo,getMovieById,modifyMovie,deleteVideo };
