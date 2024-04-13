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
        if (token) {
          const response = await fetch(`/users`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const bidAmount = Number(bid); // Ensure bid is a number
    if (!user) {
      setMessage("User not logged in.");
      return;
    }

    try {
      const payload = {
        UserId: user.id,
        ItemId: selectedListing.id,
        BidAmount: bidAmount
      };

      const response = await fetch(`/item/${selectedListing.id}/place_bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.Message || 'Unknown error');
      }

      setMessage(result.Message);
      setNewBalance(result.NewBalance); // Assume NewBalance is returned on successful bid
      localStorage.setItem('balance', result.NewBalance); // Update balance in local storage
      onBidSuccess();
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
        {message && <p>{message}</p>}
      </div>
  );
}

export default BiddingForm;
