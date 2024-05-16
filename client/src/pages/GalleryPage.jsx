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
        const response = await fetch("/api/GetAllItems");
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
        const response = await fetch(
          `/api/GetSearchedItems?search=${searchWord}`
        );
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
  }, [searchWord]);

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

  //Filter
  const FilterGallery = (event) => {
    const filter = event.target.value;
    //    let sortedItems = [...originalGalleryItems];

    fetch(`/api/GetFilteredItems?sorting=${filter}`)
      .then((response) => response.json())
      .then((data) => {
        setGalleryItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    //    setGalleryItems(sortedItems);
  };

  function EndsSoon(daysString, hoursString) {
    if (daysString <= 1) {
      return (
        <div className="redText">
          Ends in: <div className="gallery-enddate-day">{daysString} </div>
          days,
          {hoursString} hours
        </div>
      );
    }
    return (
      <div className="gallery-enddate">
        Ends in: <div className="gallery-enddate-day">{daysString} </div>
        days,
        {hoursString} hours
      </div>
    );
  }
  return (
    <div
      id="GalleryPage"
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
