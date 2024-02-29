import React, { useState, useEffect } from "react";

function LoginPage() {
  useEffect(() => {
    async function load() {
      const response = await fetch("Users.json");
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
      alert("User not found");
      console.error("User not found! Do you want to register?");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token_id");
    setIsLoggedIn(false);
  };

  return (
    <div className="user-info">
      {isLoggedIn ? (
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
    </div>
  );
}

export default LoginPage;
