import React, { useState, useEffect } from 'react';
import BalancePage from "../pages/BalancePage.jsx";

function BiddingForm({ selectedListing }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Users.json");
        const data = await response.json();
        const userID = localStorage.getItem("token_id");
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
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    const submissionTime = new Date();
    const bidAmount = Number(bid);
    // Ensure there is a user and the bid does not exceed the user's balance
    if (!user || bidAmount > user.balance) {
      setMessage('Insufficient balance for this bid.');
      return;
    }
    
    try {
      // Fetch existing bids for the selected item
      const existingBidsResponse = await fetch(`http://localhost:3000/bids?itemid=${selectedListing.id}`);
      const existingBids = await existingBidsResponse.json();

      // Determine the highest existing bid amount for the item
      const highestExistingBidAmount = existingBids.reduce((max, bid) => bid.bidamount > max ? bid.bidamount : max, 0);

      // Compare the submitted bid with the highest existing bid
      if (bidAmount <= highestExistingBidAmount) {
        setMessage(`Your bid must be higher than the current highest bid of ${highestExistingBidAmount}.`);
        return;
      }
      const bidResponse = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemid: selectedListing.id,
          bidderid: user.id,
          bidamount: bidAmount,
          datetime: submissionTime.toISOString(),
          isactive: true,

        }),
      });

      if (bidResponse.ok) {
        //calculating new balance
        const newBalance = user.balance - bidAmount;
        setMessage('Bid is placed!');
        const userUpdateResponse = await fetch(`http://localhost:3000/users/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            balance: newBalance,
          }),
        });
        if (userUpdateResponse.ok) {
          // If the user's balance is successfully updated in the backend
          const updatedUser = await userUpdateResponse.json();
          setUser(updatedUser); // Update local user state with the updated data
          setMessage('Bid is placed and balance updated successfully!');
        } else {
          // Handle unsuccessful balance update
          console.error('Failed to update user balance:', await userUpdateResponse.text());
          setMessage('Bid is placed, but unable to update balance.');
        }
        
      } else {
        console.error('Failed to place bid:', await bidResponse.text());
        setMessage('Failed to place bid.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to place bid. Error: ' + error.message);
    }
  }
 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Bid Amount:
          <input id="bid-input" type="number" value={bid} onChange={e => setBid(e.target.value)} />
        </label>
        <button className="rounded-button" type="submit">Place Bid</button>
      </form>
      {message && <p>{message}</p>}
      <BalancePage /> Souls 
    </div>
  );
}

export default BiddingForm;
