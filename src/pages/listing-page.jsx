import React, { useState, useEffect } from 'react';

const ListingPage = () => {
  const [listings, setItems] = useState([]);

  useEffect(() => {
    fetch('./public/listings')
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Items Listing</h1>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>{listing.title}: {listing.description} {listing.image}{listing.startDate}{listing.endDate}{listing.startBid}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPage;

