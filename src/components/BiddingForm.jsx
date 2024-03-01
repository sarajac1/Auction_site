import React, { useState } from 'react';
import BalancePage from "../pages/BalancePage.jsx";

function BiddingForm({ selectedListing }) {
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({ id: "2", balance: 1000 });

    async function handleSubmit(event) {
      event.preventDefault();
      const submissionTime = new Date();
      const bidAmount = Number(bid);


      if (bidAmount > user.balance) {
        setMessage('You dont have enough Souls');
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
      <p><BalancePage /> Souls</p> {/**THIS SHOULD BE REPLACED WHEN THE BALANCE ON THE TOP OF THE PAGE IS DISPLAYED! */}
    </div>
  );
}

export default BiddingForm;
