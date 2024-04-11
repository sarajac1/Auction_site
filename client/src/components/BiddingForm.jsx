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
    
    if (!isLoggedIn) {
      setMessage('You must be logged in to place a bid.');
      return; 
    }
    const submissionTime = new Date();
    const bidAmount = Number(bid);
    // do i need to fetch it from the db ? (GET)
    if (!user || bidAmount > user.balance) {
      setMessage('Insufficient balance for this bid.');
      return;
    }

    try {
      // GET existing bids for the selected item
      const existingBidsResponse = await fetch(`/api/bids?itemid=${selectedListing.id}`);
      const existingBids = await existingBidsResponse.json();

      // do i need a GET for the highest existing bid amount for the item??
      const highestExistingBidAmount = existingBids.reduce((max, bid) => bid.bidamount > max.bidamount ? bid : max, { bidamount: 0, id: 0 });
      const newBidId = highestExistingBidAmount.id + 1;
      // do i need a get for comparing?
     
      
      //POST the new bid if successful
      const bidResponse = await fetch('/api/bids', {
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
        setMessage('Bid is placed!');
        const newBalance = user.balance - bidAmount;
        setNewBalance(newBalance);

        localStorage.setItem('newBalance', newBalance.toString());

        try {
          //PATCH/ update the users new balance- how do i do that? do i have to write an if statement in the endpoint?
          const userUpdateResponse = await fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              balance: newBalance,
            }),
          });

          if (userUpdateResponse.ok) {
            console.log("Balance updated successfully");
          } else {
            console.error('Failed to update user\'s balance');
          }
        } catch (error) {
          console.error('Error updating user\'s balance:', error);
        }


        onBidSuccess();

      }
      // remove the catches
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to place bid. Error: ' + error.message);
    }
    // else should come here from line 66
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
