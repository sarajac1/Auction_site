function BiddingForm() {
  return <form onSubmit={MakeBid}>
    <label>
      <input />
      Souls
    </label>
    <button type="submit">Place Bid</button>
  </form>
}

async function MakeBid(event) {
  const response = await fetch("Bids.json");
  
}

export default MakeBid