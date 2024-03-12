import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function AddListing() {
  // Function to format today's date as DD-MM-YYYY
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };


  const navigate = useNavigate();
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const today = new Date(); // Get today's date
  const formattedToday = formatDate(today); // Format today's date

  const calculateEndDate = () => {
    if (listing.startdate) {
      const startDate = new Date(listing.startdate);
      const endDate = new Date(startDate.getTime());
      endDate.setDate(startDate.getDate() + 7); // Add 7 days
      return formatDate(endDate);
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

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //fetch the sellerid from local storage
    const sellerId = localStorage.getItem("token_id");

    // Create a new listing object with the same keys as your JSON data
    const newListing = {
      title: listing.title,
      sellerid: sellerId,
      description: listing.description,
      image: listing.image,
      startdate: formattedToday,
      startbid: Number(listing.startbid)
    };

    try {
      // Send a POST request to your JSON-server. make sure to have the server running
      const response = await fetch('http://localhost:3000/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newListing)
      });
      console.log("1");


      if (!response.ok) {
        throw new Error('Failed to add listing');
      }

      // Reset the form after successful submission
      setListing({
        title: '',
        description: '',
        image: '',
        startdate: '',
        startbid: ''
      });
      setShowConfirmationMessage(true);
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Failed to add listing. Please try again.');
    }
  };
  const handleMessage = (action) => {
    if (action === 'new') {
      // Reset the form if the user wants to create a new listing
      setListing({
        title: '',
        description: '',
        image: '',
        startdate: formattedToday,
        startbid: ''
      });
    } else {
      // Navigate to the listings page if the user wants to see their listing
      // This assumes you're using React Router for navigation
      navigate('/listings');
    }
    setShowConfirmationMessage(false); // Hide the modal
  };
  return (
    <div className="addListing-container">
      <div className="item-wrapper">
        <div className="addListing-wrapper">
        <h1>Create Listing</h1>
        <form onSubmit={handleSubmit}>
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
              <button className="rounded-button" type="submit">Create Listing</button>
            </div>
            <div className="description-adlisting-col2">
              <div className="description-field" >
                <p>Description (500 characters): </p>
                <input type="text" name="description" className="description-input" value={listing.description} onChange={handleChange} required />
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
      {showConfirmationMessage && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Listing added successfully!</p>
            <button onClick={() => handleMessage('new')}>Add Another Listing</button>
            <Link to="/listings">
              <button>Go to Listings Page</button>
            </Link>
          </div>
        </div>
      )}
    </div>

  );
};

export default AddListing;
