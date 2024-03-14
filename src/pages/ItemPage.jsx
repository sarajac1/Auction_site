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
        const response = await fetch("/db.json"); // Relative path from the public folder
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
        const price = await response.json();
        setBidPrice(price.bids);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBidPrice([]);
      }
    };

    fetchData();
  }, []);

  /* Find highest bid */
  function GetCurrentPrice(itemId, startBid) {
    const bidsForItem = BidPrice.filter((bid) => bid.itemid === itemId);

    if (bidsForItem.length > 0) {
      // Get the highest bid amount for the item
      const highestBid = Math.max(...bidsForItem.map((bid) => bid.bidamount));
      return highestBid;
    } else {
      return startBid;
    }
  }

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

    if (currentDate > endDate) {
      return <div className="auction-ended redText" style={{ fontSize: "20px" }}>Auction ended</div>;
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

  // Inside ItemPage component

  function refreshBids() {
    // Logic to re-fetch or re-calculate bids
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
        const price = await response.json();
        setBidPrice(price.bids);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBidPrice([]);
      }
    };

    fetchData();
  }

  // Pass this function as a prop to BiddingForm
  




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
              <div>{CalcEndDate(selectedListing.enddate)}</div>    
            </div>

            <h1>{selectedListing.title}</h1>
            <div className="item-blurb">
              {selectedListing.description}
              <br />
              <br />
              Starting Bid: {selectedListing.startbid} Souls
            </div>
            <div className="darkText">Highest bid is: </div>
            <div className="priceText">
              {GetCurrentPrice(selectedListing.id, selectedListing.startbid)}{" "}
              Souls
            </div>
            {/* Bid field */}
            <BiddingForm selectedListing={selectedListing} onBidSuccess={refreshBids} />
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
