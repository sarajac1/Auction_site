import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [GalleryItems, setGalleryItems] = useState([]); // Rename state to GalleryItems

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Listings.json"); // Relative path from the public folder
        const data = await response.json();
        setGalleryItems(data.Listings); // Update state with fetched data
        console.log(data.Listings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setGalleryItems([]); // Set an empty array in case of an error
      }
    };

    fetchData();
  }, []);

  function dateDiffInDaysAndHours(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const _MS_PER_HOUR = 1000 * 60 * 60;

    // Get the time difference in milliseconds
    const timeDiff = b - a;

    // Calculate days and remaining milliseconds
    const days = Math.floor(timeDiff / _MS_PER_DAY);
    const remainingMilliseconds = timeDiff % _MS_PER_DAY;

    // Calculate hours
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
