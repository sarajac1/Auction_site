import React, { useState, useEffect } from "react";

function BalancePage(){
  //const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  async function fetchData  () {
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

      console.log(data)
      setUserBalance(data);
      const userID = localStorage.getItem("token_id");
      setLoggedInUser(localStorage.getItem("token"));
      setUserBalance(data.balance)
      
    } catch (error) {
      console.error("Error fetching data:", error);
      //setUserData([]);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loggedInUser ? <div>Balance: {userBalance}</div> : <></>}
    </div>
  );
};

export default BalancePage;
