import React, { useState, useEffect } from 'react';
import BalancePage from "../pages/BalancePage.jsx";

function BiddingForm({ selectedListing, onBidSuccess }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [newBalance, setNewBalance] = useState(null);

  useEffect(() => { //FETCH DATA FUNCTION SHOULD BE DEFINED OUTSIDE USEEFFECT
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); //USERNAME IS RETRIVED FROM LOCALSTORAGE
      if (token) { // FETCHING ALL USERS IS NOT REQUIRED, BECAUSE USERNAME & USERID EXIST IN LOCALSTORAGE
        /*const response = await fetch(`/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);*/
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const bidAmount = Number(bid); // Ensure bid is a number
    console.log(isLoggedIn)
    console.log(JSON.stringify(selectedListing))
    if (!isLoggedIn) { // USER LOGIN FLAG CAN BE CHECKED WITH ISLOGGEDIN, AS IT IS SET IN USEEFFECT
      setMessage("User not logged in.");
      return;
    } else // ELSE WAS ADDED FOR BETTER TRACKING
    { console.log("IN ELSE")
      try {
        const payload = {
          UserId: localStorage.getItem('token_id'), // USERID IS RETRIVED FROM LOCALSTORAGE WITH 'TOKEN_ID'
          ItemId: selectedListing.id,
          BidAmount: bidAmount
        };
        console.log(JSON.stringify(payload))

        const response = await fetch(`/api/item/${selectedListing.id}/place_bid`, { // '/api' PROXY WAS MISSING
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log(result)
        if (!response.ok) {
          throw new Error(result.message || 'Unknown error');
        }

        setMessage(result.message);
        setNewBalance(result.highestBid); // Assume NewBalance is returned on successful bid
        localStorage.setItem('balance', result.highestBid); // Update balance in local storage
        onBidSuccess();
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }

    }


  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <label className='bid_amount_text'>
            <p>Bid Amount:</p>
            <div className='bids_buttons'>
              <input id="bid-input" type="number" value={bid} onChange={e => setBid(e.target.value)} />
              <button className="rounded-button" type="submit">Place Bid</button>
            </div>
          </label>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
}

export default BiddingForm;
 