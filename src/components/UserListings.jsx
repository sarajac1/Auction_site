import React, { useState, useEffect } from 'react';

const UserListings = ({ sellerid }) => {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [bids, setBids] = useState([]);
  const [users, setUsers] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin") === 'true';



  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsResponse = await fetch("/db.json");
        const listingsData = await listingsResponse.json();        
        const { listings, bids, users } = listingsData;
        const filteredListings = listings.filter(listing => listing.sellerid.toString() === sellerid);
        const allListings = listings

        // Filter listings based on sellerid

        // Update state with filtered listings
        setListings(filteredListings);
        setBids(bids);
        setAllListings(allListings);
        setUsers(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchListings();
  }, [sellerid]);

  const getHighestBid = (itemid) => {
    const filteredBids = bids.filter(bid => bid.itemid.toString() === itemid.toString() && bid.isactive === true);
    if (filteredBids.length > 0) {
      const highestBid = filteredBids.reduce((max, bid) => parseFloat(bid.bidamount) > parseFloat(max.bidamount) ? bid : max, filteredBids[0]);
      return `${highestBid.bidamount} S`;
    }
    return 'No bids';
  };

  const getUserName = (sellerid) => {
    const filteredUsers = users.filter(user => user.id.toString() === sellerid.toString())
    console.log(filteredUsers)
    if (filteredUsers.length > 0) {
      
      return `${filteredUsers[0].username}`;
    }
    return 'No User Found!';
  };


  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);

    let delta = Math.abs(end - now) / 1000;

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
      {isAdmin ? (
      <div className='listings_page_content'>
          <h2 className="listings_heading">All Current Listings</h2>
          <table className='listing_table'>
            <thead className='table_head'>
              <tr>
                <th className="listings_info listings_table_headers item_column">Item name<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers start_column">Posted by<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers highest_column">Current Highest Bid<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers end_column">End Date<div className='line_which_will_work top_line'></div></th>
              </tr>
            </thead>
            <tbody>
              {allListings.map(listing => (
                <tr key={listing.id}>
                  <td className="listings_info listings_table_details">
                    <div>{listing.title}</div>
                    <div className='line_which_will_work bottom_line'></div>
                  </td>
                  <td className="listings_info listings_table_details">
                    <div>{getUserName(listing.sellerid)}</div>
                    <div className='line_which_will_work bottom_line'></div>
                  </td>
                  <td className="listings_info listings_table_details">{getHighestBid(listing.id)}<div className='line_which_will_work bottom_line'></div></td>

                  <td className="listings_info listings_table_details">
                    <div>{listing.enddate}</div>
                    <div className='line_which_will_work bottom_line'></div>
                  </td>
                </tr>
              ))}
            </tbody>  
          </table>
          <button className='button_create_listing'><a className='a_create_listing' href="/ArchivedListing">Archived Listings</a></button>
        </div>

      ) : (

      
        <div className='listings_page_content'>
          <h2 className="listings_heading">Your Listings</h2>
          <table className='listing_table'>
            <thead className='table_head'>
              <tr>
                <th className="listings_info listings_table_headers item_column">Item name<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers start_column">Start Bid<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers highest_column">Highest Bid<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers end_column">End Date<div className='line_which_will_work top_line'></div></th>
                <th className="listings_info listings_table_headers edit_column">Edit<div className='line_which_will_work top_line'></div></th>
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing.id}>
                  <td className="listings_info listings_table_details">
                    <div>{listing.title}</div>
                    <div className='line_which_will_work bottom_line'></div>
                  </td>
                  <td className="listings_info listings_table_details">{listing.startbid} S <div className='line_which_will_work bottom_line'></div></td>
                  <td className="listings_info listings_table_details">{getHighestBid(listing.id)}<div className='line_which_will_work bottom_line'></div></td>
                  <td className="listings_info listings_table_details">{calculateTimeLeft(listing.enddate)} <div className='line_which_will_work bottom_line'></div></td>
                  <td className="listings_info listings_table_details"> <div className="actions">
                    <button className="edit_button">Edit</button>
                    <button className="edit_button">Delete</button>
                    <div className='line_which_will_work'></div>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='button_create_listing'><a className='a_create_listing' href="/AddListing">Create listing</a></button>
        </div>)}
    </div>
);
}

export default UserListings;
