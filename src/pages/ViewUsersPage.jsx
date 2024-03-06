import React, { useState, useEffect } from "react"; 

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await fetch("/db.json");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setUsers([]);
    }
    };
    
    fetchData();
  }, []);


  return (
    <h1 className="heading-users">Users</h1>
  )
}


export default ViewUsersPage; 

