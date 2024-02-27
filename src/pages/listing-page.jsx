import React, { useState, useEffect } from 'react';

const ListingPage = () => {
  const [listings, setItems] = useState([]);

  useEffect(() => {
    fetch('./public/Listings.json')
      .then((response) => response.json())
      .then((data) => setItems(data.items))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Listing</h1>
      <ul>
        {listings.map((listing) => (

          <li key={listing.id}>
            {listing.title}: {listing.description}
            <div>
              <img src={listing.image} alt={listing.title} />
              {listing.startDate}{listing.endDate}{listing.startBid}
            </div>
            Start: {new Date(listing.startDate).toLocaleDateString()} |
            End: {new Date(listing.endDate).toLocaleDateString()} |
            Starting Bid: ${listing.startBid}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPage;

