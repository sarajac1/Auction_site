import React, { useState, useEffect, useContext } from 'react';
// Import a context if using Context API to manage user state, or pass userId as a prop to this component

// Mock context for demonstration purposes. Replace with your actual UserContext or pass userId as a prop
// const UserContext = React.createContext();

function RemoveListing({ userId }) {
  const [listings, setListings] = useState([]);

  // If using context to manage user state, replace userId with useContext(UserContext).userId;
  // const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Replace `userId` with the appropriate variable that holds the user's ID
        const response = await fetch(`http://localhost:3000/listings?sellerId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [userId]); // Depend on userId to refetch when it changes

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/listings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }
      // Remove the deleted listing from the state to update UI
      setListings(listings.filter(listing => listing.id !== id));
      alert('Listing deleted successfully!');
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing. Please try again.');
    }
  };

  return (
    <div>
      <h2>Your Listings</h2>
      <ul>
        {listings.map(listing => (
          <li key={listing.id}>
            {listing.title} - {listing.description}
            <button onClick={() => handleDelete(listing.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RemoveListing;
