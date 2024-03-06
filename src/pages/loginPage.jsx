import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

function LoginPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    async function load() {
      const response = await fetch("/db.json");
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
    newUsername: "",
    newUserPassword: "",
    newUserEmail: "",
    newUserAddress: "",
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
      localStorage.setItem("isAdmin", existingUser.isAdmin.toString());
      setIsLoggedIn(true);
      window.location.reload();
      window.location.href = '/';
    } else {
      if (confirm("User not found, Do you want to register?")) {
        setRegistrationForm(true);
      } else {
        console.error("User not found!");
      }
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_id");
    setIsLoggedIn(false);
    window.location.reload();
    window.location.href = '/';
  };

  const handleCloseRegistrationForm = () => {
    setRegistrationForm(false);
  };

  async function handleRegistrationFormSubmit () {
  const d = new Date();
  let text = d.toISOString().split('T');
    console.log(UsersList)
    
    
    let data = {
      "id": UsersList.length+1,
      "username": newUser.newUserName,
      "password": newUser.newUserPassword,
      "joineddate": text[0],
      "address": newUser.newUserAddress,
      "email": newUser.newUserEmail,
      "balance": 0 
    } 
     await fetch("/api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
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
    <div className="container">
      <div className="login-box">
        <div className="user-info">
          {isLoggedIn ? (
            <div>
              <p>
                {" "}
                Welcome {credentials.username}! &nbsp;
                <button className="rounded-button-small" onClick={handleLogout}>
                  Logout
                </button>{" "}
              </p>
            </div>
          ) : (
            <>
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                />
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <br />
                <button className="rounded-button-small" type="submit">
                  Login
                </button>
              </form>
            </>
          )}

          {showRegistrationForm && (
            <ReactModal
              isOpen={showRegistrationForm}
              contentLabel="Example Modal"
            >
              <div className="RegistrationForm">
                <div className="RegistrationForm-content">
                  <span className="close" onClick={handleCloseRegistrationForm}>
                    &times;
                  </span>
                  <h2>Register User</h2>

                  <form onSubmit={handleRegistrationFormSubmit}>
                    Username:{" "}
                    <input
                      type="text"
                      name="newUserName"
                      placeholder="Enter Username"
                      value={newUser.newUserName}
                      onChange={handleNewUserChange}
                    />{" "}
                    <br />
                    Password:{" "}
                    <input
                      type="password"
                      name="newUserPassword"
                      placeholder="Enter Password"
                      value={newUser.newUserPassword}
                      onChange={handleNewUserChange}
                    />{" "}
                    <br />
                    Re-Confirm Password:{" "}
                    <input
                      type="password"
                      name="newUserPassword"
                      placeholder="Re-Confirm Password"
                      value={newUser.newUserPassword}
                      onChange={handleNewUserChange}
                    />{" "}
                    <br />
                    Email:{" "}
                    <input
                      type="email"
                      name="newUserEmail"
                      placeholder="Email"
                      value={newUser.newUserEmail}
                      onChange={handleNewUserChange}
                    />{" "}
                    <br />
                    Address:{" "}
                    <input
                      type="text"
                      name="newUserAddress"
                      placeholder="Address"
                      value={newUser.newUserAddress}
                      onChange={handleNewUserChange}
                    />
                    <br />
                    <button className="rounded-button-small" type="submit">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </ReactModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
