import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ItemPage() {
  const { id: item } = useParams(); //hook to extract parameters from the URL; renaming the id to item
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/Listings.json"); // Relative path from the public folder
        console.log(response);
        const data = await response.json();
        console.log("2");
        const listing = data.Listings.find(Listing => Listing.Id === item);
        console.log("3");
        setSelectedListing(listing);
        console.log("4");
      } catch (error) {
        console.log("5");
        console.error("Error fetching data:", error);
        console.log("6");
      }
    };

    fetchData();
  }, [item]);
  function handleBidSubmit(){
  
  }
  function handleBidChange() {
    
  }



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
          <p>Highest bid by: BIDDING DB SHOULD BE CONNECTED HERE</p>
          {/* Bid field */}
          <form onSubmit={handleBidSubmit}>
            <label>
              <input type="number" onChange={handleBidChange} />
              Souls
            </label>
            <button type="submit">Place Bid</button>
          </form>
          <button onClick={() => setSelectedListing(null)}>Back to Listings</button>

        </div>
      )}
    </div>
  );

};

export default ItemPage;

