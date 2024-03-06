import React, { useState, useEffect } from "react";
import UserListings from "../components/UserListings";

function ListingsPage() {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userID = localStorage.getItem("token_id");
    setCurrentUserId(userID);
  }, []);

  return (
    <>
      {currentUserId ? <UserListings sellerid={currentUserId} /> : <div>Loading...</div>}
    </>
  );
}

export default ListingsPage;
