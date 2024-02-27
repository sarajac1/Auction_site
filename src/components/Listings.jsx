import React, { useState, useEffect } from 'react';

const Listings = () => {
  const [ListingItems, setListingItems] = useState([]); // Rename state to GalleryItems

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Listings.json"); // Relative path from the public folder
        const data = await response.json();
        setListingItems(data.Listings); // Update state with fetched data
        console.log(data.Listings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListingItems([]); // Set an empty array in case of an error
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      {ListingItems.map((ListingItems) => (
        <div key={ListingItems.Id}>
          <h1>{ListingItems.Title}</h1>
          <p>{ListingItems.Description}</p>
        </div>
      ))}
    </div>
    );
};

export default Listings;
