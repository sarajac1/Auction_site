import React, { useState, useEffect } from 'react';

const UserListings = ({ userId }) => {
  const [listings, setListings] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsResponse = await fetch("/Listings.json");
        const listingsData = await listingsResponse.json();
        setListings(listingsData.Listings.filter(listing => listing.SellerId === userId));

        const bidsResponse = await fetch("/Bids.json");
        const bidsData = await bidsResponse.json();
        setBids(bidsData.Bids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchListings();
  }, [userId]);

  const getHighestBid = (itemId) => {
    const filteredBids = bids.filter(bid => bid.ItemId === itemId && bid.isActive === "TRUE");
    if (filteredBids.length > 0) {
      const highestBid = filteredBids.reduce((max, bid) => bid.BidAmount > max.BidAmount ? bid : max, filteredBids[0]);
      return highestBid.BidAmount;
    }
    return 'No bids';
  };

  return (
    <div className='listings_page'>
      <h2 className="listings_heading">Your Listings</h2>
      <table className='listing_table'>
        <thead className='table_head'>
          <tr>
            <th className="listings_info listings_table_headers">Title</th>
            <th className="listings_info listings_table_headers">Start Date</th>
            <th className="listings_info listings_table_headers">End Date</th>
            <th className="listings_info listings_table_headers">Start Bid</th>
            <th className="listings_info listings_table_headers">Highest Bid</th>
          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing.Id}>
              <td className="listings_info listings_table_details">{listing.Title}</td>
              <td className="listings_info listings_table_details">{listing.StartDate}</td>
              <td className="listings_info listings_table_details">{listing.EndDate}</td>
              <td className="listings_info listings_table_details">{listing.StartBid}</td>
              <td className="listings_info listings_table_details">{getHighestBid(listing.Id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default UserListings;
