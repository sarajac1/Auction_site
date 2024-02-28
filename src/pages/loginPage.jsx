import React, { useState, useEffect } from 'react';

function LoginPage() {
    useEffect(() => {
    async function load() {
      const response = await fetch('Users.json')
      let AllUsers = await response.json()
      const UsersList = AllUsers.Users      
      setUsersList(UsersList)
    }
    load()
  }, [])
  
  const [UsersList, setUsersList] = useState([])
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {  
    
    event.preventDefault(); 
    
    const existingUser = UsersList.find(obj => obj.UserName === credentials.username);
    
      
    if (existingUser != null) {
        alert("User exists")               
        localStorage.setItem('token', credentials.username);        
    } else {
      alert("User not found")               
        console.error('User not found! Do you want to register?');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
