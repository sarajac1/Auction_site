import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BiddingForm from "../components/BiddingForm";


function ItemPage() {
  const { id: itemId } = useParams(); // hook to extract parameters from the URL; renaming the id to itemId
  const [selectedListing, setSelectedListing] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  // Fetching the listing details only when itemId changes
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/listings/${itemId}`);
        const listing = await response.json();
        setSelectedListing(listing);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [itemId]);


  useEffect(() => {
    const fetchHighestBid = async () => {
      try {
        const response = await fetch(`/item/${itemId}/highestBid`);
        const data = await response.json();
        setHighestBid(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setHighestBid(null);
      }
    };

    fetchHighestBid();
  }, [itemId]);

  
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
                   <div className="darkText">Auction ends on: {selectedListing.enddate}</div>
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
                  {highestBid ? `${highestBid} Souls` : "No bids yet"}
                </div>
                {/* Bid field */}
                <BiddingForm selectedListing={selectedListing} onBidSuccess={() => fetchHighestBid()} />
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