import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BiddingForm from "../components/BiddingForm";

function ItemPage() {
  const { id: itemId } = useParams(); // hook to extract parameters from the URL; renaming the id to itemId
  const [selectedListing, setSelectedListing] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    fetchItem()
  }, []);
  
  // Inside ItemPage component

  async function fetchItem() {
    // Logic to re-fetch or re-calculate bids
    try {
      const response = await fetch("/api/items/"+itemId);
      const item = await response.json();
      console.dir(item)
      setSelectedListing(item);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // Pass this function as a prop to BiddingForm

  function EndsSoon(days, hours) {
    if (days <= 0 && hours <= 0) {
      return (
        <div className="auction-ended redText" style={{ fontSize: "20px" }}>
          Auction ended
        </div>
      );
    }

    if (days <= 1) {
      return (
        <div className="redText">
          Ends in: {days} days, {hours} hours
        </div>
      );
    }
    return (
      <div className="darkText">
        Ends in: {days} days, {hours} hours
      </div>
    );
  }

  return (
    <div className="container">
      {/* If a listing is selected, display its details */}
      {selectedListing && (
        <div className="item-wrapper">
          <div className="col1">
            <img src={selectedListing.image} alt={selectedListing.title} />
          </div>
          <div className="col2">
            <div className="date_div">
              <div className="darkText">{selectedListing.startdate}</div>
              <div>
                {EndsSoon(
                  selectedListing.remainingDays,
                  selectedListing.remainingHours
                )}
              </div>
            </div>

            <h1>{selectedListing.title}</h1>
            <div className="item-blurb">
              {selectedListing.description}
              <br />
              <br />
              Starting Bid: {selectedListing.startBid} Souls
            </div>
            <div className="darkText">Highest bid is: </div>
            <div className="priceText">{selectedListing.currentBid} Souls</div>
            {/* Bid field */}
            <BiddingForm
              selectedListing={selectedListing}
              onBidSuccess={fetchItem}
            />
            <button
              className="discreet-button"
              onClick={() => setSelectedListing(null)}
            >
              <Link to="/" className="discreet-button">
                Back to Listings
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemPage;
