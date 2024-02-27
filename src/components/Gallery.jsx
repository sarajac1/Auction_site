import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [GalleryItems, setGalleryItems] = useState([]); // Rename state to GalleryItems

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Listings.json"); // Relative path from the public folder
        const data = await response.json();
        setGalleryItems(data.Listings); // Update state with fetched data
        console.log(data.Listings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setGalleryItems([]); // Set an empty array in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="gallery-wrapper">
      {GalleryItems.map((GalleryItem) => (
        <div className="card">
          <div key={GalleryItem.Id}>
            <img
              src={GalleryItem.Image}
              alt={GalleryItem.Title}
              className="gallery-image"
            />
            <div class="text-container">
              <div className="gallery-title">{GalleryItem.Title}</div>
              <div className="gallery-enddate">{GalleryItem.EndDate}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
