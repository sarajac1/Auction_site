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
        // need an enpoint to get users with a specific token_id?? 
        const response = await fetch(`/api/users/${token_id}`);
        const data = await response.json();
        const userID = Number(localStorage.getItem("token_id"));
        const currentUser = data.users.find((user) => user.id == userID);
        if (currentUser) {
          setUser(currentUser);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Retrieve the new balance from localStorage, if it exists
    const storedBalance = localStorage.getItem('newBalance');

    if (storedBalance !== null) {
      setNewBalance(Number(storedBalance));
    }
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    const bidAmount = Number(bid);
    try {
      const response = await fetch(`/api/bids/place?itemid=${selectedListing.id}&bidderid=${user.id}&bidamount=${bidAmount}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemid: selectedListing.id,
          bidderid: user.id,
          bidamount: bidAmount,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage(result.message);
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
