import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BiddingForm from '../components/BiddingForm';

function ItemPage() {
  const { id: itemId } = useParams(); // hook to extract parameters from the URL; renaming the id to itemId
  const [selectedListing, setSelectedListing] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/Listings.json"); // Relative path from the public folder
        const data = await response.json();
        const listing = data.listings.find(
          (listing) => listing.id.toString() === itemId
        );
        setSelectedListing(listing);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [itemId]);

  const handleBidChange = (event) => {
    setBidAmount(parseInt(event.target.value, 10));
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();
    // Handle bid submission logic here
    console.log(`Placing bid of ${bidAmount} Souls`);
  };

  return (
    <div>
      {/* If a listing is selected, display its details */}
      {selectedListing && (
        <div>
          <h1>{selectedListing.title}</h1>
          <p>{selectedListing.description}</p>
          <img src={selectedListing.image} alt={selectedListing.title} />
          <p>End Date: {selectedListing.enddate}</p>
          <p>Starting Bid: {selectedListing.startbid} Souls</p>
          <p>Highest bid by: BIDDING DB SHOULD BE CONNECTED HERE</p>
          {/* Bid field */}
          <div><BiddingForm /></div>
          <button onClick={() => setSelectedListing(null)}>
            Back to Listings
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemPage;
