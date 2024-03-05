import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";

function ItemPage() {
  /* We should be able to use Context here */
  const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setUserData(data.users);
        const userID = localStorage.getItem("token_id");
        setLoggedInUser(data.users.find((user) => user.id == userID));
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData([]);
      }
    };

    fetchData();
  }, []);

  const inputAddRef = useRef(null);

  function AddToBalance() {
    if (inputAddRef.current.value == "") {
      alert("Please enter a number");
    }
  }

  function WithDrawBalance() {
    if (inputAddRef.current.value == "") {
      alert("Please enter a number");
    }
    if (inputAddRef.current.value > loggedInUser.balance) {
      alert("Number too large!");
    }
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <div>
        {loggedInUser ? (
          <div>Current Balance: {loggedInUser.balance}</div>
        ) : (
          <></>
        )}
      </div>
      <h2>Add to Balance</h2>
      <input
        ref={inputAddRef}
        type="number"
        id="bid-input"
        name="message"
      />{" "}
      <br />
      <button className="rounded-button-small" onClick={AddToBalance}>
        Add To Balance
      </button>
      <button className="rounded-button-small" onClick={WithDrawBalance}>
        Withdraw from Balance
      </button>
    </div>
  );
}

export default ItemPage;
