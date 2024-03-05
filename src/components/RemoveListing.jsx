import React, { useState} from 'react';


function RemoveListing() {
  const [listingId, setListingId] = useState('');

  const handleChange = (e) => {
    setListingId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listingId) {
      alert('Please enter a listing ID.');
      return;
    }
    try {
      // Send a DELETE request to your JSON-server endpoint for listings, targeting a specific listing by ID
      const response = await fetch(`http://localhost:3000/listings/${listingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }

      alert('Listing removed successfully!');
      setListingId(''); // Reset the listing ID input after successful deletion
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={listingId}
        onChange={handleChange}
        placeholder="Listing ID"
        required
      />
      <button type="submit">Remove Listing</button>
    </form>
  );
};

export default RemoveListing;