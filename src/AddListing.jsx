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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    // Create a new listing object with the same keys as your JSON data
    const newListing = {
      Title: listing.Title,
      Description: listing.Description,
      Image: listing.Image,
      StartDate: listing.StartDate,
      StartBid: listing.StartBid
    };

    try {
      // Send a POST request to your JSON-server. make sure to have the server running
      const response = await fetch('http://localhost:3000/Listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newListing)
      });

      if (!response.ok) {
        throw new Error('Failed to add listing');
      }

      // Reset the form after successful submission
      setListing({
        Title: '',
        Description: '',
        Image: '',
        StartDate: '',
        StartBid: ''
      });
      alert('Listing added successfully!');
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Failed to add listing. Please try again.');
    }
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
