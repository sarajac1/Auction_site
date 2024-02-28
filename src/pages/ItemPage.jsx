import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';


const ItemPage = () => {
  const { id: itemId } = useParams();
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Listings.json"); // Relative path from the public folder
        const data = await response.json();
        const listing = data.Listings.find(item => item.Id === itemId);
        setSelectedListing(listing);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [itemId]);

  return (
    <div>

      {/* If a listing is selected, display its details */}
      {selectedListing && (
        <div>
          <h1>{selectedListing.Title}</h1>
          <p>{selectedListing.Description}</p>
          <img
            src={selectedListing.Image}
            alt={selectedListing.Title}
          />
          <p>End Date: {selectedListing.EndDate}</p>
          <p>Starting Bid: {selectedListing.StartBid} Souls</p>
          
        </div>
      )}
    </div>
  );

};

export default ItemPage;
