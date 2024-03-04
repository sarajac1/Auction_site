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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistrationForm, setRegistrationForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevState) => ({
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
      if (confirm("User not found, Do you want to register?")) {
        setRegistrationForm(true);
      } else {
        console.error("User not found!");
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
    /*TO-DO: Add data to Users.json */
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
                      name="UserName"
                      placeholder="Username"
                      value={credentials.username}
                      onChange={handleChange}
                    />{" "}
                    <br />
                    Password:{" "}
                    <input
                      type="password"
                      name="Password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleChange}
                    />{" "}
                    <br />
                    Confirm Password:{" "}
                    <input
                      type="confirmpassword"
                      name="Confirmpassword"
                      placeholder="confirmPassword"
                      value={credentials.password}
                      onChange={handleChange}
                    />{" "}
                    <br />
                    Email:{" "}
                    <input
                      type="email"
                      name="Email"
                      placeholder="email"
                      value={credentials.password}
                      onChange={handleChange}
                    />{" "}
                    <br />
                    Address:{" "}
                    <input
                      type="address"
                      name="Address"
                      placeholder="Address"
                      value={credentials.password}
                      onChange={handleChange}
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
