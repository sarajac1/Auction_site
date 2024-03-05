import React, { useState} from 'react';


function RemoveListing({ listingId, onRemove }) {
  const [message, setMessage] = useState('');

  async function handleRemove () {
    try {
      const response = await fetch(`http://localhost:3000/listings/${listingId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('Listing removed successfully.');
        onRemove(listingId);
      } else {
        const data = await response.json();
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleRemove}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};


export default RemoveListing;