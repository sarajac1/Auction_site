import React, { useState, useEffect } from 'react';
import BalancePage from "../pages/BalancePage.jsx";

function BiddingForm({ selectedListing }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [newBalance, setNewBalance] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
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
    const submissionTime = new Date();
    const bidAmount = Number(bid);
    // Doesn't goes over the users balance
    if (!user || bidAmount > user.balance) {
      setMessage('Insufficient balance for this bid.');
      return;
    }

    try {
      // Fetch existing bids for the selected item
      const existingBidsResponse = await fetch(`http://localhost:3000/bids?itemid=${selectedListing.id}`);
      const existingBids = await existingBidsResponse.json();

      // Determine the highest existing bid amount for the item
      const highestExistingBidAmount = existingBids.reduce((max, bid) => bid.bidamount > max.bidamount ? bid : max, { bidamount: 0, id: 0 });
      const newBidId = highestExistingBidAmount.id + 1;
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
          id: newBidId,
          itemid: selectedListing.id,
          bidderid: user.id,
          bidamount: bidAmount,
          datetime: submissionTime.toISOString(),
          isactive: true,

        }),
      });

      if (bidResponse.ok) {
        console.log("1");
        setMessage('Bid is placed!');
        //calculating new balance
        setNewBalance(user.balance - bidAmount);



      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to place bid. Error: ' + error.message);
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
      <p className='initial_balance'>Your initial balance: {user && user.balance}</p>
      <div>{newBalance !== null && <div><p>Your balance after bid: {newBalance}</p></div>}</div>
    </div>
  );
}

export default BiddingForm;
