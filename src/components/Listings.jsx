import React, { useState, useEffect } from 'react';

const Listings = () => {
  const [listingItems, setListingItems] = useState([]); 
  const [selectedListing, setSelectedListing] = useState(null);

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

  // Function to handle clicking on a listing
  const handleListingClick = (listing) => {
    setSelectedListing(listing); // Set the selected listing
  };
  
  return (
    <div>
      {/* If a listing is selected, display its details */}
      {selectedListing ? (
        <div>
          <h1>{selectedListing.Title}</h1>
          <p>{selectedListing.Description}</p>
          <img
            src={selectedListing.Image}
            alt={selectedListing.Title}
          />
          <p>End Date: {selectedListing.EndDate}</p>
          <p>Starting Bid: {selectedListing.StartBid} Souls</p>
          <button onClick={() => setSelectedListing(null)}>Back to Listings</button>
        </div>
      ) : (
        // If no listing is selected, display the list of listings
        listingItems.map((listing) => (
          <div key={listing.Id} onClick={() => handleListingClick(listing)}>
            <h1>{listing.Title}</h1>
            <p>{listing.Description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;
