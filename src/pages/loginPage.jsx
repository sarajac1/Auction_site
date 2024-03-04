import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

function LoginPage() {
  useEffect(() => {
    async function load() {
      const response = await fetch("/Users.json");
      let AllUsers = await response.json();
      const UsersList = AllUsers.users;
      setUsersList(UsersList);
    }
    load();
  }, []);

  const [UsersList, setUsersList] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",    
  });

  const [newUser, setNewUser] = useState({
    newusername: "",
    newuserpassword: "",
    email: "",
    address: "",
  });


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistrationForm, setRegistrationForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const existingUser = UsersList.find(
      (obj) => obj.username === credentials.username
    );

    if (existingUser != null) {
      localStorage.setItem("token", credentials.username);
      localStorage.setItem("token_id", existingUser.id);
      setIsLoggedIn(true);
    } else {
      if (confirm('User not found, Do you want to register?')) {
        setRegistrationForm(true)  
      }
      else {
        console.error('User not found!');
      }      
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token_id");
    setIsLoggedIn(false);
  };

  const handleCloseRegistrationForm = () => {
    setRegistrationForm(false);
  };

  const handleRegistrationFormSubmit = () => {
  const d = new Date();
  let text = d.toISOString().split('T');
    console.log(UsersList)
    let data = {
      "id": UsersList.length+1,
      "username": newUser.newusername,
      "password": newUser.newuserpassword,
      "joineddate": text[0],
      "address": newUser.address,
      "email": newUser.email,
      "balance": 0 
    } 
    UsersList.push(data)
    console.log(UsersList)
    alert('Registered sucessfully!')
    const updatedUsersList = {
      'users': UsersList
    }
    // TODO: need an api to append data to json file or db
    setRegistrationForm(false);
  };


  return (
    <div className='user-info'>
      {isLoggedIn  ? (
        <div>
          <p>
            {" "}
            Welcome {credentials.username}! &nbsp;
            <button onClick={handleLogout}>Logout</button>{" "}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
      )}

      
      {showRegistrationForm && (
        <ReactModal isOpen={showRegistrationForm} contentLabel="Example Modal">
        <div className="RegistrationForm">
          <div className="RegistrationForm-content">
            <span className="close" onClick={handleCloseRegistrationForm}>
              &times;
            </span>
            <h2>Register User</h2>
            
            <form onSubmit={handleRegistrationFormSubmit}>
              Username: <input type="text" name="newusername" placeholder="Username" value={newUser.newusername} onChange={handleNewUserChange} /> <br/>
              Password: <input type="text" name="newuserpassword" placeholder="Password" value={newUser.newuserpassword} onChange={handleNewUserChange} /> <br/>
              Confirm Password: <input type="text" name="confirmpassword" placeholder="confirmPassword" value={newUser.newuserpassword} onChange={handleNewUserChange} /> <br/>
              Email: <input type="email" name="email" placeholder="email" value={newUser.email} onChange={handleNewUserChange} /> <br/>
              Address: <input type="address" name="address" placeholder="Address" value={newUser.address} onChange={handleNewUserChange} /><br/>
              <button type="submit">Register</button>
            </form>
          </div>
          </div>
          </ReactModal>
      )}
    </div>
  );
}            

export default LoginPage;
