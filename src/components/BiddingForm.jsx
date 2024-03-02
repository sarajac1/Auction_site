import React, { useState, useEffect } from 'react';
import BalancePage from "../pages/BalancePage.jsx";

function BiddingForm({ selectedListing, userId }) {
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        if (!response.ok) {
          throw new Error('Could not fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage('Error fetching user data.');
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const submissionTime = new Date();
    const bidAmount = Number(bid);

    if (!user || bid > user.balance) {
      setMessage('Insufficient balance for this bid.');
      return;
    }




    try {
      const bidResponse = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemid: selectedListing.id,
          //CHANGE THE PATH FOR THE USER ID
          userid: user.id,

          bidamount: bid,
          datetime: submissionTime.toISOString(),
          isactive: true,

        }),
      });

      if (bidResponse.ok) {
        const responseData = await bidResponse.json();
        console.log('Success:', responseData);
        setMessage('Bid is placed!');
        //MAKE SURE TO CONECT THIS TO THE USERS DB
        setUser((prevUser) => ({ ...prevUser, balance: prevUser.balance - bidAmount }));
      } else {
        console.error('Response not OK:', bidResponse.statusText);
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
      <BalancePage /> Souls {/**THIS SHOULD BE REPLACED WHEN THE BALANCE ON THE TOP OF THE PAGE IS DISPLAYED! */}
    </div>
  );
}

export default BiddingForm;
