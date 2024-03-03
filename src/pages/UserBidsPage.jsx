import React, { useState, useEffect } from "react";
import UserBids from "../components/UserBids";

function BidsPage() {
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Извлечение идентификатора текущего пользователя из localStorage
    const userID = localStorage.getItem("token_id");
    setCurrentUserId(userID);
  }, []);

  return (
    <>
      {currentUserId ? <UserBids bidderid={currentUserId} /> : <div>Loading...</div>}
    </>
  );
}

export default BidsPage;
