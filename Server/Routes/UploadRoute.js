const express= require('express')
const router= express()
const upload = require('../Configs/Multer')
const { uploadMovie, getMovies, searchVideo, getMovieById, modifyMovie, deleteVideo } = require('../Controllers/UploadController')
const authenticateUser = require('../Middleware/AuthMiddleware')
router.post('/upload-movie',upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'video', maxCount: 1 }]),authenticateUser,uploadMovie)
router.get('/get-movies',getMovies)
router.get('/searchVideo',authenticateUser,searchVideo)
router.get('/getVideo/:id',authenticateUser,getMovieById)
router.put('/modify-movie/:id',upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),authenticateUser,modifyMovie)
router.delete('/delete-movie/:id',authenticateUser,deleteVideo)
module.exports=router