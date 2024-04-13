import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";

function ProfilePage() {
  //const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const search_data = {
          "username": localStorage.getItem("token"),
        }
        const response = await fetch("/api/finduserbyusername", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_data),
        });

        const data = await response.json();        
        //setUserData(data);
        setLoggedInUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        //setUserData([]);
      } 
    };

  fetchData();
  }, []);

  const inputAddRef = useRef(null);

  async function addToBalance() {
    const amount = parseInt(inputAddRef.current.value, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid number greater than 0");
      return;
    }
    const search_data = {
      "username": localStorage.getItem("token"),
      "prevbalance": loggedInUser.balance,
      "updatebalance": amount,
        }
        const res = await fetch("/api/addbalance", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_data),
        });
    
    if (res.ok && res.status == 201) {
      localStorage.setItem("balance", loggedInUser.balance + amount);
      setLoggedInUser((prevUser) => ({
      ...prevUser,
        balance: prevUser.balance + amount,              
      }));
      
    } else {
      alert("Add Balance update failed!")
    }    
  }

  async function withdrawFromBalance() {
    const amount = parseInt(inputAddRef.current.value, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid number greater than 0");
      return;
    } else if (amount > loggedInUser.balance) {
      alert("Number too large!");
      return;
    }
    const search_data = {
      "username": localStorage.getItem("token"),
      "prevbalance": loggedInUser.balance,
      "updatebalance": amount,
        }
        const res = await fetch("/api/withdrawbalance", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_data),
        });
    if (res.ok && res.status == 201) {
      localStorage.setItem("balance", loggedInUser.balance - amount);
      setLoggedInUser((prevUser) => ({
      ...prevUser,
      balance: prevUser.balance - amount,
      }));      
    } else {
      alert("Withdraw update failed!")
    }       
  }

  return (
    <div className="container profile_container">
      {loggedInUser ? (
        <>
          <div className="profile_text profile_joined_date profile_display">Joined Date: <div className="profile_info_different_collor">{loggedInUser.joineddate}</div></div>
          <h1 className="profile_text profile_heading">Profile</h1>
          <div className='line_which_will_work top_line profile_line'></div>
          <div className="profile_text profile_username profile_user_info profile_display">Username: <div className="profile_info_different_collor">{loggedInUser.username}</div></div>
          <div className="profile_text profile_password profile_user_info profile_display">Password: <div className="profile_info_different_collor">{loggedInUser.password}</div></div>
          <div className="profile_text profile_email profile_user_info profile_display">Email: <div className="profile_info_different_collor">{loggedInUser.email}</div></div>
          <div className="profile_text profile_address profile_user_info profile_display">Address: <div className="profile_info_different_collor">{loggedInUser.address}</div></div>
          <div className="profile_text profile_current_ballance profile_user_info profile_display">Current Balance: <div className="profile_info_different_collor">{loggedInUser.balance}</div></div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <h2 className="profile_text">Update Balance</h2>
      <input ref={inputAddRef} type="number" id="bid-input" name="message" /> <br />
      <button className="rounded-button-small add_to_ballance" onClick={addToBalance}>Add To Balance</button>
      <button className="rounded-button-small" onClick={withdrawFromBalance}>Withdraw from Balance</button>
      {/*<button className="rounded-button-small">Edit profile info</button>*/}

    </div>
  );
}

export default ProfilePage;
