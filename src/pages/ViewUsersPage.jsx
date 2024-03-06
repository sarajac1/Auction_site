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
    <div>
      <h1 className="heading-users">Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Joined Date</th>
            <th>Adress</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default ViewUsersPage; 

