import React, { useState } from 'react';

function BiddingForm({selectedListing}) {
  const [bid, setBid] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const submissionTime = new Date(); 

    try {
      const bidResponse = await fetch('http://localhost:3000/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemid: selectedListing.id,
          bidamount: bid, 
          datetime: submissionTime.toISOString(),
          isactive: true,
          
        }),
      });

      if (bidResponse.ok) {
        const responseData = await bidResponse.json();
        console.log('Success:', responseData);
        setMessage('Bid is placed!');
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
          <input type="number" value={bid} onChange={e => setBid(e.target.value)} />
        </label>
        <button type="submit">Place Bid</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BiddingForm;
