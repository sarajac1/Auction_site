import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [GalleryItems, setGalleryItems] = useState([]);
  const [BidPrice, setBidPrice] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null); //state
  const [bidAmount, setBidAmount] = useState('');//state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Listings.json");
        const data = await response.json();
        setGalleryItems(data.Listings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setGalleryItems([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Bids.json");
        const price = await response.json();
        setBidPrice(price.Bids);
        console.log(price.Bids);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBidPrice([]);
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


  function GetCurrentPrice(itemId, startBid) {
    const bid = BidPrice.find((bid) => bid.ItemId === itemId);

    if (bid) {
      return <>{bid.BidAmount} Souls</>;
    } else {
      return <>{startBid} Souls</>;
    }
  }

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
    console.log(days + " days," + hours + " hours");
    return (
      <div>
        Ends in: {days} days, {hours} hours
      </div>
    );
  }

  return (
    <div className="gallery-wrapper">
      {GalleryItems.map((GalleryItem) => (
        <div className="card" key={GalleryItem.Id} onClick={() => handleListingClick(GalleryItem)}>
          <img
            src={GalleryItem.Image}
            alt={GalleryItem.Title}
            className="gallery-image"
          />
          <div className="text-container">
            <div className="gallery-title">{GalleryItem.Title}</div>
            <div className="gallery-enddate">
              {CalcEndDate(GalleryItem.EndDate)}
            </div>
            <div className="gallery-price">
              {GetCurrentPrice(GalleryItem.Id, GalleryItem.StartBid)}
            </div>
          </div>
        </div>
      ))}
      {selectedListing && (
        <div className="selected-listing">
          <div className="listing-info">
            <img
              src={selectedListing.Image}
              alt="Image is not working"
              className="gallery-image"
            />
            <div className="listing-text">
              <p>Posted {selectedListing.StartDate}</p>
              <h1>{selectedListing.Title}</h1>
              <p>{selectedListing.Description}</p>

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
          </div>
        </div>

      )}



    </div>
  );
};

export default Gallery;
