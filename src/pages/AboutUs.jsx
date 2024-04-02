import React from 'react';

const AboutUs = () => {
  return (
    <div className='aboutus_page'>
      <div className='aboutus_content'>
        <h1 className='aboutus_heading'>About Us</h1>
        <p className='aboutus_text'>
          Welcome to Shadow Bid – your dependable auction house where the echoes of the past meet the present. We offer a distinctive platform for acquiring and vending the most unusual and enigmatic items, ranging from antique treasures to supernatural memorabilia. Each piece in our catalog carries a unique story and an aura of mystery.
        </p>
        <p className='aboutus_text'>
          Shadow Bid was conceived for those who cherish the thrill of owning items with extraordinary backstories. Here, you can find anything from Victorian artifacts to modern collectible curiosities. Our platform allows sellers to auction their extraordinary finds and buyers to compete for their possession through our secure bidding system.
        </p>
        <p className='aboutus_text'>
          Our experts meticulously verify each item to ensure authenticity and description accuracy. We take pride in fostering a community based on respect and integrity. Join us on a journey through the shadowy recesses of history and acquire items you won't find anywhere else.
        </p>        
      </div>

      <div>
        <img
          src="https://i.imgur.com/D1399Py.png"
          alt="ShadowBid Logo"
          className="aboutus_logo"
        />
      </div>

    </div>
  );
}

export default AboutUs;