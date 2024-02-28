import React, { useState } from 'react';

const AddListing = () => {
  const [listing, setListing] = useState({
    Title: '',
    Description: '',
    Image: '',
    StartDate: '',
    StartBid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="Title" value={listing.Title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="Description" value={listing.Description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="Image" value={listing.Image} onChange={handleChange} placeholder="Image URL" required />
      <input type="text" name="StartDate" value={listing.StartDate} onChange={handleChange} placeholder="Start Date (DD-MM-YYYY)" required />
      <p>END DATE SHOULD BE AUTOMATICALLY CALCULATED. ADD A FIELD FOR THAT!</p>
      <input type="number" name="StartBid" value={listing.StartBid} onChange={handleChange} placeholder="Asking price" required />
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default AddListing;
