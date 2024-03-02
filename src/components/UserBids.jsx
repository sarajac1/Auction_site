import React, { useState, useEffect } from 'react';

const UserBids = ({ userId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch("Bids.json");
        const data = await response.json();
        const userBids = data.Bids.filter(bid => bid.BidderId === userId);
        setBids(userBids);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, [userId]);

  return (
    <div className='bids_page'>
      <h2 className="bids_heading">Your Bids</h2>
      <table className='bids_table'>
        <thead className='table_head'>
          <tr>
            <th className="bids_info bids_table_headers">Item ID</th>
            <th className="bids_info bids_table_headers">Bid Amount</th>
            <th className="bids_info bids_table_headers">Bid Date</th>
            <th className="bids_info bids_table_headers">Active</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.Id}>
              <td className="bids_info bids_table_details">{bid.ItemId}</td>
              <td className="bids_info bids_table_details">{bid.BidAmount}</td>
              <td className="bids_info bids_table_details">{bid.DateTime}</td>
              <td className="bids_info bids_table_details">{bid.isActive === "TRUE" ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBids;
