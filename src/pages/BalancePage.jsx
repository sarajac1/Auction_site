import React, { useState, useEffect } from "react";

const BalancePage = () => {
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

  return (
    <div>
      {loggedInUser ? <div>Balance: {loggedInUser.balance}</div> : <></>}
    </div>
  );
};

export default BalancePage;
