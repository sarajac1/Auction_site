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
        setUser(data.users);
        const userID = localStorage.getItem("token_id");
        setIsLoggedIn(data.users.find((user) => user.id == userID));
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData([]);
      }
    };

    fetchData();
  }, []);


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
      <BalancePage /> Souls 
    </div>
  );
}

export default BiddingForm;
