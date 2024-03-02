import React, { useState, useEffect } from 'react';

const UserListings = ({ sellerid }) => {
  const [listings, setListings] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsResponse = await fetch("/Listings.json");
        const listingsData = await listingsResponse.json();
        // Исправлено: Listings на listings и использование нижнего регистра для свойств
        setListings(listingsData.listings.filter(listing => listing.sellerid.toString() === sellerid));

        const bidsResponse = await fetch("/Bids.json");
        const bidsData = await bidsResponse.json();
        // Исправлено: Bids на bids
        setBids(bidsData.bids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchListings();
  }, [sellerid]);

  const getHighestBid = (itemid) => {
    // Исправление: убедитесь, что isactive проверяется как булево значение, а не строка
    const filteredBids = bids.filter(bid => bid.itemid.toString() === itemid.toString() && bid.isactive);
    if (filteredBids.length > 0) {
      const highestBid = filteredBids.reduce((max, bid) => parseFloat(bid.bidamount) > parseFloat(max.bidamount) ? bid : max, filteredBids[0]);
      return highestBid.bidamount;
    }
    return 'No bids';
  };

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);

    let delta = Math.abs(end - now) / 1000; // Преобразование в секунды

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;

    let timeLeft = '';
    if (days > 0) timeLeft += `${days} D, `;
    if (hours > 0) timeLeft += `${hours} H`;

    return timeLeft.trim();
  };



  return (
    <div className='listings_page'>
      <h2 className="listings_heading">Your Listings</h2>
      <table className='listing_table'>
        <thead className='table_head'>
          <tr>
            <th className="listings_info listings_table_headers">Item name</th>
            <th className="listings_info listings_table_headers">Start Bid</th>
            <th className="listings_info listings_table_headers">Highest Bid</th>
            <th className="listings_info listings_table_headers">End Date</th>
            <th className="listings_info listings_table_headers">Edit</th>

          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing.id}>
              {/* Исправлено: Title на title и другие свойства в нижнем регистре */}
              <td className="listings_info listings_table_details">{listing.title}</td>
              <td className="listings_info listings_table_details">{listing.startbid}</td>
              <td className="listings_info listings_table_details">{getHighestBid(listing.id)}</td>
              <td className="listings_info listings_table_details">{calculateTimeLeft(listing.enddate)}</td>
              <td className="listings_info listings_table_details">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListings;
