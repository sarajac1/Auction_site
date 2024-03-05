import React, { useState, useEffect } from 'react';

const UserBids = ({ bidderid }) => {
  const [activeBids, setActiveBids] = useState([]);
  const [completedBids, setCompletedBids] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bidsResponse = await fetch("/Bids.json");
        const listingsResponse = await fetch("/Listings.json");
        const usersResponse = await fetch("/Users.json");
        const bidsData = await bidsResponse.json();
        const listingsData = await listingsResponse.json();
        const usersData = await usersResponse.json();

        setUsers(usersData.users);

        const highestBidsByItem = bidsData.bids.reduce((acc, bid) => {
          if (!acc[bid.itemid] || bid.bidamount > acc[bid.itemid].bidamount) {
            acc[bid.itemid] = bid;
          }
          return acc;
        }, {});

        const enrichedBids = bidsData.bids.map(bid => {
          const listing = listingsData.listings.find(listing => listing.id === bid.itemid);
          const seller = usersData.users.find(user => user.id === listing.sellerid);
          const isHighestBid = highestBidsByItem[bid.itemid]?.id === bid.id;
          const status = isHighestBid ? 'Win' : 'Lost';
          return {
            ...bid,
            listingTitle: listing.title,
            endDate: listing.enddate,
            highestBid: highestBidsByItem[bid.itemid]?.bidamount,
            status: bid.isactive ? null : status, // Set status only for completed bids
            seller: bid.isactive ? null : seller // Seller info only for completed bids
          };
        });

        setActiveBids(enrichedBids.filter(bid => bid.isactive && bid.bidderid === parseInt(bidderid)));
        setCompletedBids(enrichedBids.filter(bid => !bid.isactive && bid.bidderid === parseInt(bidderid)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [bidderid]);

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);

    let delta = Math.abs(end - now) / 1000;

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;

    return `${days} D, ${hours} H`;
  };

  const handleShowSellerInfo = (seller) => {
    setSelectedSeller(seller);
  };

  return (
    <div className='bids_page'>
      {/* Active Auctions Table */}
      <div className='bids_page_content'>
        <h2 className="bids_heading">Active Auctions</h2>
        <table className='bids_table'>
          <thead className='table_head'>
            <tr>
              <th className="bids_info bids_table_headers item_column">Item Name<div className='line_which_will_work top_line'></div></th>
              <th className="bids_info bids_table_headers">Your Bid<div className='line_which_will_work top_line'></div></th>
              <th className="bids_info bids_table_headers">Highest Bid<div className='line_which_will_work top_line'></div></th>
              <th className="bids_info bids_table_headers">End Time<div className='line_which_will_work top_line'></div></th>
            </tr>
          </thead>
          <tbody>
            {activeBids.map(bid => (
              <tr key={bid.id}>
                <td className="bids_info bids_table_details">{bid.listingTitle}<div className='line_which_will_work bottom_line'></div></td>
                <td className="bids_info bids_table_details">{bid.bidamount} S<div className='line_which_will_work bottom_line'></div></td>
                <td className="bids_info bids_table_details">{bid.highestBid} S<div className='line_which_will_work bottom_line'></div></td>
                <td className="bids_info bids_table_details">{calculateTimeLeft(bid.endDate)}<div className='line_which_will_work bottom_line'></div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Same as provided, no changes needed */}

        {/* Ended Auctions Table */}
        <h2 className="bids_heading">Ended Auctions</h2>
        <table className='bids_table'>
          <thead className='table_head'>
            <tr>
              <th className="bids_info bids_table_headers">Item Name<div className='line_which_will_work top_line'></div></th>
              <th className="bids_info bids_table_headers">Winning Bid<div className='line_which_will_work top_line'></div></th>
              <th className="bids_info bids_table_headers">Status<div className='line_which_will_work top_line'></div></th>
              <th className="bids_info bids_table_headers">Shipment<div className='line_which_will_work top_line'></div></th>
            </tr>
          </thead>
          <tbody>
            {completedBids.map((bid, index) => (
              <tr key={index}>
                <td className="bids_info bids_table_details">{bid.listingTitle}<div className='line_which_will_work bottom_line'></div></td>
                <td className="bids_info bids_table_details">{bid.highestBid} S<div className='line_which_will_work bottom_line'></div></td>
                <td className="bids_info bids_table_details">{bid.status}<div className='line_which_will_work bottom_line'></div></td>
                <td className="bids_info bids_table_details contact_seller_cell">
                  {bid.status === 'Win' && (
                    <button className='bids_button_contact_seller' onClick={() => handleShowSellerInfo(bid.seller)}>Contact Seller</button>
                  )}
                  <div className='line_which_will_work bottom_line line_contact_seller'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedSeller && (
          <div className="modal">
            <p className="bids_info bids_table_details">Username: {selectedSeller.username}</p>
            <p className="bids_info bids_table_details">Email: {selectedSeller.email}</p>
            <button className='bids_button_contact_seller modal_close_button' onClick={() => setSelectedSeller(null)}>Close</button>
          </div>
        )}
      </div>


    </div>
  );
};

export default UserBids;
