import React, { useState } from "react";

function AddListing() {
  // Function to format today's date as DD-MM-YYYY
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

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
    // Handle form submission

    // Create a new listing object with the same keys as your JSON data
    const newListing = {
      title: listing.title,

      description: listing.description,
      image: listing.image,
      startdate: formattedToday,
      startbid: listing.startbid
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
      alert('Listing added successfully!');
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Failed to add listing. Please try again.');
    }
  };
  // Calculate end date (assuming end date is 7 days after start date)


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={listing.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="description" value={listing.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="image" value={listing.image} onChange={handleChange} placeholder="Image URL" required />
      <p>Start Date: {listing.startdate}</p>
      <p>End Date:{calculateEndDate()}</p>
      <input type="number" name="startbid" value={listing.startbid} onChange={handleChange} placeholder="Asking price" required />
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default AddListing;
