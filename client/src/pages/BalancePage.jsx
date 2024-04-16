import React, { useState, useEffect } from "react";

const BalancePage = () => {
  //const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const fetchData = async () => {
    try {
       setLoggedInUser(localStorage.getItem("token"));
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
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loggedInUser ? <div>Balance: {userBalance}</div> : <></>}
    </div>
  );
};

export default BalancePage;
