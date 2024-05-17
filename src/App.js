import React, { useState, useEffect } from 'react';
import './App.css';
import ImageItem from './components/ImageItem';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState('');
  const [randomImages, setRandomImages] = useState([]);

  const keywords = ['Mountain', 'Flowers', 'Beaches', 'Cities'];

  useEffect(() => {
    const fetchRandomImages = async () => {
      setLoading(true);
      const response = await fetch(`https://api.unsplash.com/photos/random?count=10&client_id=yIEaq2Ih_28uft_1J84syxLgfRBZNvl9iAIy8yVYs2s`);
      const data = await response.json();
      setRandomImages(data);
      setLoading(false);
    };

    fetchRandomImages();
  }, []);

  const fetchImages = async (searchQuery) => {
    setLoading(true);
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=yIEaq2Ih_28uft_1J84syxLgfRBZNvl9iAIy8yVYs2s`);
    const data = await response.json();
    setImages(data.results);
    setLoading(false);
    setLastSearch(searchQuery);
    setQuery('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchImages(query);
    }
  };

  const handleKeywordClick = (keyword) => {
    fetchImages(keyword);
  };

  return (
    <div className="App">
      <header>
        <img src="https://i.postimg.cc/NFjn5258/photographer.png" alt="logo" className='logo'/>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for images..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='search-cont'
          />
          <button type="submit" className='search-btn'>Search</button>
        </form>
        <div className="keywords">
          {keywords.map(keyword => (
            <button key={keyword} className='search-btn' onClick={() => handleKeywordClick(keyword)}>{keyword}</button>
          ))}
        </div>
        
      </header>
      <div className='result-images' >
      {lastSearch ? (
        <div className="last-search">{lastSearch}</div>
      ) : (
        <div className="last-search">Random</div>
      )}
      <div className="image-container">
      
        {loading ? (
          <div class="loader"></div>
        ) : (
          images.length > 0 ? (
            images.map(image => (
              <ImageItem key={image.id} image={image} />
            ))
          ) : (
            randomImages.map(image => (
              <ImageItem key={image.id} image={image} />
            ))
          )
        )}
      </div>
      </div>
    </div>
  );
};

export default App;
