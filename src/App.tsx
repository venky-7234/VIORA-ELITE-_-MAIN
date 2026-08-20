import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Home } from './pages/Home';
import { Movement } from './pages/Retreats/Movement';
import { Wellness } from './pages/Retreats/Wellness';
import { Cottage } from './pages/Retreats/Cottage';
import { GalleryPage } from './pages/Gallery/GalleryPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="retreats/movement" element={<Movement />} />
          <Route path="retreats/wellness" element={<Wellness />} />
          <Route path="retreats/cottage" element={<Cottage />} /> 
          <Route path="gallery" element={<GalleryPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
