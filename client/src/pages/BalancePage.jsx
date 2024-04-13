import React, { useState, useEffect } from "react";

const BalancePage = () => {
  //const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const fetchData = async () => {
    try {
      //const response = await fetch("api/users");
      //const data = await response.json();
      //setUserData(data);
      //const userID = localStorage.getItem("token_id");
      setLoggedInUser(localStorage.getItem("token"));
      setUserBalance(localStorage.getItem("balance"))
      
    } catch (error) {
      console.error("Error fetching data:", error);
      //setUserData([]);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loggedInUser ? <div>Balance: {userBalance}</div> : <></>}
    </div>
  );
};

export default BalancePage;
