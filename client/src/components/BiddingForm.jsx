import React, { useState, useEffect } from 'react';
import BalancePage from "../pages/BalancePage.jsx";

function BiddingForm({ selectedListing, onBidSuccess }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [newBalance, setNewBalance] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set 'isLoggedIn' to true if token is not null, otherwise false
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  async function handleSubmit(event) {
    event.preventDefault();
    const bidAmount = Number(bid); // Ensure bid is a number
    try {
      // Prepare the request payload
      const payload = {
        UserId: user.id,
        ItemId: selectedListing.id,
        BidAmount: bidAmount
      };

      // Make the fetch request to the correct endpoint
      const response = await fetch('/bids/place_bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.Message || 'Unknown error'); // Make sure to use the correct property for error message
      }
      // Update local storage and state with the new balance
      const updatedBalance = result.newBalance; // Assuming 'newBalance' is returned by your API
      localStorage.setItem('balance', updatedBalance); // Update balance in local storage
      setNewBalance(updatedBalance); // Optionally update balance in state, if you need to use it in this component


      setMessage(result.Message);
      onBidSuccess(); // Trigger any additional actions on successful bid
    } catch (error) {
      setMessage(`Error: ${error.message}`);
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
      </div>
  );
}

export default BiddingForm;