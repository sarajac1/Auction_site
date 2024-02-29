import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  /* CALCULATING DATES */

  function dateDiffInDaysAndHours(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const _MS_PER_HOUR = 1000 * 60 * 60;
    const timeDiff = b - a;
    const days = Math.floor(timeDiff / _MS_PER_DAY);
    const remainingMilliseconds = timeDiff % _MS_PER_DAY;
    const hours = Math.floor(remainingMilliseconds / _MS_PER_HOUR);
    return { days, hours };
  }

  function CalcEndDate(endDateString) {
    const currentDate = new Date();
    const endDate = new Date(endDateString);
    const { days, hours } = dateDiffInDaysAndHours(currentDate, endDate);

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
            <div className="darkText">{selectedListing.startdate}</div>
            <h1>{selectedListing.title}</h1>
            <div className="item-blurb">
              {selectedListing.description}
              <br />
              <br />
              Starting Bid: {selectedListing.startbid} Souls
            </div>

            <div className="darkText">
              Highest bid by: BIDDING DB SHOULD BE CONNECTED HERE
            </div>
            <div className="priceText">PRICE HERE</div>
            <div>{CalcEndDate(selectedListing.enddate)}</div>
            {/* Bid field */}
            <form onSubmit={handleBidSubmit}>
              <label>
                <input
                  id="bid-input"
                  type="number"
                  value={bidAmount}
                  onChange={handleBidChange}
                />
              </label>
              <button className="rounded-button" type="submit">
                Place Bid
              </button>
            </form>
            <button
              className="discreet-button"
              onClick={() => setSelectedListing(null)}
            >
              Back to Listings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemPage;
