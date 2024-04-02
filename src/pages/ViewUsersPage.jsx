import React, { useState, useEffect } from "react"; 
import { Link } from 'react-router-dom'

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchWord, setSearchWord] = useState("");



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

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchWord) ||
    user.email.toLowerCase().includes(searchWord) ||
    user.address.toLowerCase().includes(searchWord) 
  );




  return (
    <div className="container">
      
      <div className="searchbar-users">
        <input
          type="search"
          className="searchBarUsers"
          name="searchBarUsers"
          placeholder="Search users..."
          onChange={handleSearchChange}
         
        />
        </div>
      
      <h1 className="heading-users">Users</h1>
      <table className="user-table">
        <thead className="user-heading">
          <tr className="user-rows">
            <th>ID</th>
            <th>Username</th>
            <th>Joined date:</th>
            <th>Adress</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Admin</th>
            <th>Edit</th>
            
          </tr>
        </thead>
        <tbody className="user-body">
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.joineddate}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.balance}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td><Link to={`/edit/${user.id}`} className="edit-user-link">[EDIT]</Link></td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default ViewUsersPage; 

