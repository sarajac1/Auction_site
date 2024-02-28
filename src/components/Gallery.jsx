import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [originalGalleryItems, setOriginalGalleryItems] = useState([]);
  const [GalleryItems, setGalleryItems] = useState([]);
  const [BidPrice, setBidPrice] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Listings.json");
        const data = await response.json();
        setOriginalGalleryItems(data.Listings);
        setGalleryItems(data.Listings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOriginalGalleryItems([]);
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
      } catch (error) {
        console.error("Error fetching data:", error);
        setBidPrice([]);
      }
    };

    fetchData();
  }, []);

  const SearchGallery = (event) => {
    const searchWord = event.target.value;
    const regex = new RegExp(`\\b${searchWord}\\b|${searchWord}`, "i");
    const filteredItems = originalGalleryItems.filter((item) =>
      regex.test(item.Title)
    );
    setGalleryItems(searchWord ? filteredItems : originalGalleryItems);
  };

  useEffect(() => {
    const filteredItems = originalGalleryItems.filter((item) =>
      item.Title.includes(searchWord)
    );
    setGalleryItems(searchWord ? filteredItems : originalGalleryItems);
  }, [searchWord, originalGalleryItems]);

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
    return (
      <div>
        Ends in: {days} days, {hours} hours
      </div>
    );
  }

  return (
    <div className="container">
      <input
        type="text"
        className="searchBar"
        name="searchBar"
        onChange={SearchGallery}
      />
      <div className="gallery-wrapper">
        {GalleryItems.map((GalleryItem) => (
          <div className="card" key={GalleryItem.Id}>
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
      </div>
    </div>
  );
};

export default Gallery;
