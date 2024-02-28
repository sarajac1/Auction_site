import React, { useState } from 'react';

const AddListing = () => {
  // Function to format today's date as DD-MM-YYYY
    const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const today = new Date(); // Get today's date
  const formattedToday = formatDate(today); // Format today's date

  const [listing, setListing] = useState({
    Title: '',
    Description: '',
    Image: '',
    StartDate: formattedToday,
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
      StartDate: formattedToday,
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
  // Calculate end date (assuming end date is 7 days after start date)


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="Title" value={listing.Title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="Description" value={listing.Description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="Image" value={listing.Image} onChange={handleChange} placeholder="Image URL" required />
      <p>Start Date: {listing.StartDate}</p>
      <p>End Date:</p>
      <input type="number" name="StartBid" value={listing.StartBid} onChange={handleChange} placeholder="Asking price" required />
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default AddListing;
