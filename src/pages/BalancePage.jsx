import React, { useState, useEffect } from "react";

const BalancePage = () => {
  const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  /* Add logic for logged in user. Right now the code assumes logged in user had id: 1 */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("Users.json");
        const data = await response.json();
        setUserData(data.users);
        setLoggedInUser(data.users.find((user) => user.id === 1));
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loggedInUser ? (
        <div>Balance: {loggedInUser.balance}</div>
      ) : (
        <div>Balance: Error</div>
      )}
    </div>
  );
};

export default BalancePage;
