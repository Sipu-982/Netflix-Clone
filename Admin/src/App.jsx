import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './Layouts/AppLayout';
import AdminLogin from './Pages/AdminLogin';
import UploadVideo from './Pages/UploadVideo';
import ViewVideos from './Pages/ViewVideos';
import ViewMovieById from './Pages/ViewMovieById';
// import ModifyVideo from './Pages/ModifyVideo';
import EditVideo from './Pages/EditVideo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
                <Route path='/' element={<AdminLogin />} />
          <Route path='/upload' element={<UploadVideo />} />
          <Route path='/view-videos' element={<ViewVideos />} />
          <Route path='/view-videoId/:id' element={<ViewMovieById />} />
          <Route path='/edit-video/:id' element={<EditVideo />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
