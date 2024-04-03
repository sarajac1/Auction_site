import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Gallery = () => {
  const [originalGalleryItems, setOriginalGalleryItems] = useState([]);
  const [GalleryItems, setGalleryItems] = useState([]);
  const [BidPrice, setBidPrice] = useState([]);

  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        setOriginalGalleryItems(data);
        setGalleryItems(data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        const now = new Date();

        const filteredListings = data.listings.filter(listing => new Date(listing.enddate) > now);

        setOriginalGalleryItems(filteredListings);
        setGalleryItems(filteredListings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setOriginalGalleryItems([]);
        setGalleryItems([]);
      }
    };

    fetchData();
  }, []);

  const SearchGallery = (event) => {
    const searchWord = event.target.value;
    const regex = new RegExp(`\\b${searchWord}\\b|${searchWord}`, "i");
    const filteredItems = originalGalleryItems.filter((item) =>
      regex.test(item.title)
    );
    setGalleryItems(searchWord ? filteredItems : originalGalleryItems);
  };

  useEffect(() => {
    const filteredItems = originalGalleryItems.filter((item) =>
      item.title.includes(searchWord)
    );
    setGalleryItems(searchWord ? filteredItems : originalGalleryItems);
  }, [searchWord, originalGalleryItems]);

  const FilterGallery = (event) => {
    const filter = event.target.value;

    let sortedItems = [...originalGalleryItems];

    if (filter === "LowestPrice") {
      sortedItems.sort((a, b) => {
        const priceA = GetCurrentPrice(a.id, a.startbid);
        const priceB = GetCurrentPrice(b.id, b.startbid);
        return priceA - priceB;
      });
    } else if (filter === "HighestPrice") {
      sortedItems.sort((a, b) => {
        const priceA = GetCurrentPrice(a.id, a.startbid);
        const priceB = GetCurrentPrice(b.id, b.startbid);
        return priceB - priceA;
      });
    } else if (filter === "EndsSoon") {
      sortedItems.sort((a, b) => {
        const endDateA = new Date(a.enddate);
        const endDateB = new Date(b.enddate);
        return endDateA - endDateB;
      });
    } else if (filter === "Newest") {
      sortedItems.sort((a, b) => {
        const dateA = new Date(a.startdate);
        const dateB = new Date(b.startdate);
        return dateB - dateA;
      });
    }

    setGalleryItems(sortedItems);
  };

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
      return <div className="auction-ended">Auction ended</div>;
    }

    if (days <= 1) {
      return (
        <div className="redText">
          Ends in: {days} days, {hours} hours
        </div>
      );
    }
    return (
      <div className="gallery-enddate">
        Ends in: {days} days, {hours} hours
      </div>
    );
  }

  const deleteListing = async (id) => {
    try {
      // Sending DELETE request to the specific listing's endpoint
      await fetch(`/listings/${id}`, { method: 'DELETE' });
      // Filter out the deleted listing from GalleryItems state
      const updatedGalleryItems = GalleryItems.filter(item => item.id !== id);
      setGalleryItems(updatedGalleryItems);
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };


  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="searchbar-and-filter">
        <input
          type="search"
          placeholder="Search"
          className="searchBar"
          name="searchBar"
          onChange={SearchGallery}
        />
        <select name="filter" className="filterBar" onChange={FilterGallery}>
          <option value="Newest">Newest</option>
          <option value="EndsSoon">Ends Soon</option>
          <option value="LowestPrice">Lowest Price</option>
          <option value="HighestPrice">Highest Price</option>
        </select>
      </div>
      <div className="gallery-wrapper">
        {GalleryItems.map((GalleryItem) => (
          <Link
            to={`/item/${GalleryItem.id}`}
            key={GalleryItem.id}
            className="card"
          >
            <div>
              <img
                src={GalleryItem.image}
                alt={GalleryItem.title}
                className="gallery-image"
              />
              <div className="text-container">
                <div className="gallery-title">{GalleryItem.title}</div>
                <div className="gallery-enddate">
                  {CalcEndDate(GalleryItem.enddate)}
                </div>
                <div className="gallery-price">
                  {GetCurrentPrice(GalleryItem.id, GalleryItem.startbid)} Souls
                </div>
              </div>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
};

export default Gallery;
