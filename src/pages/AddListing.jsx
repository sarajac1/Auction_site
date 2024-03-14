import React, { useState } from "react";
import { Link } from 'react-router-dom';

function AddListing() {

  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatDateWithTime = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = date.toLocaleString('en-us', { month: 'short' });
    const yyyy = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy} ${hours}:${minutes}:${seconds}`;
  };

  const today = new Date();
  const formattedToday = formatDate(today);

  const calculateEndDate = () => {
    if (listing.startdate) {
      const startDate = new Date(listing.startdate);
      const endDate = new Date(startDate.getTime());
      endDate.setDate(startDate.getDate() + 7);
      return formatDateWithTime(endDate);
    }
    return '';
  };

  const [listing, setListing] = useState({
    title: '',
    description: '',
    image: '',
    startdate: formattedToday,
    startbid: '',
  });

  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
    setIsSubmittedSuccessfully(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sellerId = localStorage.getItem("token_id");
    const enddate = calculateEndDate();

    const newListing = {
      sellerid: sellerId,
      title: listing.title,
      description: listing.description,
      image: listing.image,
      startdate: listing.startdate,
      enddate: enddate,
      startbid: Number(listing.startbid)
    };

    try {
      const response = await fetch('http://localhost:3000/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newListing)
      });

      if (!response.ok) {
        throw new Error('Failed to add listing');
      }

      setListing({
        title: '',
        description: '',
        image: '',
        startdate: '',
        startbid: ''
      });
      setIsSubmittedSuccessfully(true); 
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Failed to add listing. Please try again.');
      setIsSubmittedSuccessfully(false);
    }
  };

  return (
    <div className="addListing-container">
      <div className="item-wrapper">
        <div className="addListing-wrapper">
          <h1>Create Listing</h1>
          {isSubmittedSuccessfully && <p className="successful-listing-message">Your listing has been added successfully!</p>} 
          <form onSubmit={handleSubmit} id="listingForm">
            <div className="add-listing">
              <div className="adllisting-col1">
                <p>Title</p>
                <input type="text" name="title" value={listing.title} onChange={handleChange} required />
                <p>Asking price</p>
                <input type="number" name="startbid" value={listing.startbid} onChange={handleChange} required />
                <div className="end-date-container">
                  <p>Listing will end:</p>
                  <div className="end-date-box">{calculateEndDate()}</div>
                </div>
                <p className="end-date-listing-info">All listings are active 7 days from creation date. If your item goes unsold, you can relist it.</p>
                <p>Image URL: </p>
                <input type="text" name="image" value={listing.image} onChange={handleChange} required />

              </div>
              <div className="description-adlisting-col2">
                <div className="description-field" >
                  <p>Description (500 characters): </p>
                  <input type="text" name="description" className="description-input" value={listing.description} onChange={handleChange} required />
                </div>
              </div>
            </div>
          </form>
          <div className="addListing-button-container">
            <button className="rounded-button" type="submit" form="listingForm">Create Listing</button>
            <Link to="/listings" className="rounded-button">Back to Your listings</Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AddListing;
