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
        const response = await fetch("/api/items");
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
        const priceA = a.currentBid;
        const priceB = b.currentBid;
        return priceA - priceB;
      });
    } else if (filter === "HighestPrice") {
      sortedItems.sort((a, b) => {
        const priceA = a.currentBid;
        const priceB = b.currentBid;
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

  function EndsSoon(daysString, hoursString) {
    if (daysString <= 1) {
      return (
        <div className="redText">
          Ends in: {daysString} days, {hoursString} hours
        </div>
      );
    }
    return (
      <div className="gallery-enddate">
        Ends in: {daysString} days, {hoursString} hours
      </div>
    );
  }
  return (
    <div id="GalleryPage"
      className="container"
      style={{ paddingTop: "40px", paddingBottom: "40px" }}
    >
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
                  {EndsSoon(
                    GalleryItem.remainingDays,
                    GalleryItem.remainingHours
                  )}{" "}
                </div>
                <div className="gallery-price">
                  {GalleryItem.currentBid} Souls
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
