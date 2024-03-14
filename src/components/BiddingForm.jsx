import React, { useState, useEffect } from 'react';

function BiddingForm({ selectedListing, onBidSuccess }) {
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

    const storedBalance = localStorage.getItem('newBalance');

    if (storedBalance !== null) {
      setNewBalance(Number(storedBalance));
    }
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();

    const submissionTime = new Date();
    const bidAmount = Number(bid);
  
    if (!user || bidAmount > user.balance) {
      setMessage('Insufficient balance for this bid.');
      return;
    }

    try {
      const existingBidsResponse = await fetch(`http://localhost:3000/bids?itemid=${selectedListing.id}`);
      const existingBids = await existingBidsResponse.json();
      const highestExistingBidAmount = existingBids.reduce((max, bid) => bid.bidamount > max.bidamount ? bid : max, { bidamount: 0, id: 0 });
      const newBidId = highestExistingBidAmount.id + 1;
     
      if (bidAmount <= highestExistingBidAmount.bidamount) {
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
        setMessage('Bid is placed!');
        const newBalance = user.balance - bidAmount;
        setNewBalance(newBalance);

        localStorage.setItem('newBalance', newBalance.toString());

        try {
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
            console.log("User's balance updated successfully");
          } else {
            console.error('Failed to update user\'s balance');
          }
        } catch (error) {
          console.error('Error updating user\'s balance:', error);
        }
        
        onBidSuccess();

      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to place bid. Error: ' + error.message);
    }
  }
  if (!isLoggedIn) {
    return (<div><p className="not-logged-in-user-message-for-bidding">Please log in to make a bid</p></div>);
  }

  return (
    <div>
      {message && <p>{message}</p>}
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
