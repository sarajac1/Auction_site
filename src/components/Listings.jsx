import React, { useState, useEffect } from 'react';

const Listings = () => {
  const [listingItems, setListingItems] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null); //state
  const [bidAmount, setBidAmount] = useState('');//state

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
    setBidAmount(''); //bidamount resets if new listing is selected
  };

  // Handle changes to the bid input
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  // Handle the submission of a bid
  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log(`You bid for ${selectedListing.Title}: ${bidAmount} Souls`);

    setBidAmount('');
  };

  return (
    <div>
      {/* If a listing is selected, display its details */}
      {selectedListing ? (
        <div>
          <p>Posted {selectedListing.StartDate}</p>
          <h1>{selectedListing.Title}</h1>
          <p>{selectedListing.Description}</p>
          <img
            src={selectedListing.Image}
            alt="Image is not working"
          />
          <p>Starting Bid: {selectedListing.StartBid} Souls</p>
          <p>Highest bid by: BIDDING DB SHOULD BE CONNECTED HERE</p>
          <p>End Date: {selectedListing.EndDate}</p>
          {/* Bid field */}
          <form onSubmit={handleBidSubmit}>
            <label>
              <input type="number" value={bidAmount} onChange={handleBidChange} />
              Souls
            </label>
            <button type="submit">Place Bid</button>
          </form>
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
