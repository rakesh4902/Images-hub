import React, { useState } from 'react';
import './index.css';

const ImageItem = ({ image }) => {
    const [hover, setHover] = useState(false);
  
    return (
      <div 
        className="image-item"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={image.urls.small} alt={image.alt_description} />
        {hover && (
          <div className="image-details">
            <p>{image.alt_description || 'No description available'}</p>
            <p>{image.user.name || 'Unknown'}</p>
            <p>{image.likes} likes</p>
            <p>{image.user.location || 'Location not available'}</p>
            <a href={image.links.html} target="_blank" rel="noopener noreferrer">View on Unsplash</a>
          </div>
        )}
      </div>
    );
  };
  

export default ImageItem;
