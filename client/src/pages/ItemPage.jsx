import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BiddingForm from "../components/BiddingForm";

function ItemPage() {
  const { id: itemId } = useParams(); // hook to extract parameters from the URL; renaming the id to itemId
  const [selectedListing, setSelectedListing] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [BidPrice, setBidPrice] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        console.log(data);
        const listing = data.find(
          (listing) => listing.id.toString() === itemId
        );
        setSelectedListing(listing);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [itemId]);

  useEffect(() => {
    refreshBids();
  }, []);

  // Inside ItemPage component

  async function refreshBids() {
    // Logic to re-fetch or re-calculate bids
    try {
      const response = await fetch("/api/items");
      const price = await response.json();
      setBidPrice(price.bids);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBidPrice([]);
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
              onBidSuccess={refreshBids}
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
