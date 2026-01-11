import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detail from './pages/Detail';
import SearchPage from './pages/Search';
import MoviePage from './pages/Movie';
import Watch from './pages/Watch';
import Donation from './pages/Donation';


function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content" style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/latest" element={<Home />} /> {/* Reuse Home or specific Latest List */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:slug" element={<Detail />} />
          <Route path="/anime/movie" element={<MoviePage />} />
          <Route path="/donasi" element={<Donation />} />
          <Route path="/watch/:animeSlug/:episodeSlug" element={<Watch />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
