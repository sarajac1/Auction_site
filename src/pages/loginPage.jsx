import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";


function AlertModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="alertModal-overlay">
      <div className="alertModal">
        <p>{message}</p>
        <button className="rounded-button-small" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

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
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: '' });

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

    if (!credentials.username || !credentials.password) {
      setAlertModal({ isOpen: true, message: 'Please fill out all fields. If you are a new user, please register.' });
      return; 
    }

    const existingUser = UsersList.find(
      (obj) => obj.username === credentials.username
    );

    if (existingUser) {
      localStorage.setItem("token", credentials.username);
      localStorage.setItem("token_id", existingUser.id);
      localStorage.setItem("isAdmin", existingUser.isAdmin.toString());
      setIsLoggedIn(true);
      window.location.reload();
      window.location.href = '/';
    } else {
      setAlertModal({ isOpen: true, message: 'User not found. If you are a new user, please register.' });
    }
  };

  /*const reloadPage = () => {
    window.location.reload();
  };*/

  const handleCloseRegistrationForm = () => {
    setRegistrationForm(false);
  };

  const navigate = useNavigate();


  async function handleRegistrationFormSubmit(event) {
    event.preventDefault();

    if (!newUser.newUsername || !newUser.newUserPassword || !newUser.newUserEmail || !newUser.newUserAddress) {
      setAlertModal({ isOpen: true, message: 'All fields must be filled out to register.' });
      return;
    }

    const d = new Date();
    const text = d.toISOString().split('T');

    const data = {
      "id": UsersList.length + 1,
      "username": newUser.newUsername,
      "password": newUser.newUserPassword,
      "joineddate": text[0],
      "address": newUser.newUserAddress,
      "email": newUser.newUserEmail,
      "balance": 0, 
      "isAdmin": false
    } 


    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    UsersList.push(data)
    console.log(UsersList)
    alert('Registered sucessfully!')
    setRegistrationForm(false)

      if (response.ok) {
        navigate('/');
      } else {
        setAlertModal({ isOpen: true, message: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAlertModal({ isOpen: true, message: 'An error occurred. Please try again.' });
    }
  };

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);


  const handleForgotPasswordClick = (event) => {
    event.stopPropagation(); 
    setShowForgotPasswordModal(true);
  };


  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };




  const handleRegisterClick = (event) => {
    event.preventDefault();
    setRegistrationForm(true);
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="user-info">
          <AlertModal
            isOpen={alertModal.isOpen}
            message={alertModal.message}
            onClose={() => setAlertModal({ isOpen: false, message: '' })}
          />
          {!isLoggedIn && (
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
                <ReactModal
                  isOpen={showForgotPasswordModal}
                  onRequestClose={handleCloseForgotPasswordModal} // Это позволяет закрыть модальное окно, нажав на оверлей или нажав клавишу ESC
                  contentLabel="Forgot Password Modal"
                >
                  <div className="modal_forgot_pass">
                    <h2>Forgot Your Password?</h2>
                    <p>Please contact support to reset your password.</p>
                    <p>Support@shaddowbid.com</p>
                    <button onClick={handleCloseForgotPasswordModal} className="rounded-button-small">Close</button>
                  </div>
                </ReactModal>

                <div className="login_and_register_buttons">
                  <div>
                    <button className="forgot_pass_button" type="button" onClick={handleForgotPasswordClick}>Forgot Password</button>
                  </div>
                  <div className="two_buttons_div">
                    <button className="rounded-button-small register_button" onClick={handleRegisterClick}>
                      Register
                    </button>
                    <button className="rounded-button-small" type="submit">
                      Login
                    </button>
                  </div>

                </div>
              </form>
            </>
          )}

          {showRegistrationForm && (
            <ReactModal
              isOpen={showRegistrationForm}
              appElement={document.getElementById('root')}

              contentLabel="Example Modal"
            >
              <div className="RegistrationForm">
                <div className="RegistrationForm-content">
                  <span className="close" onClick={handleCloseRegistrationForm}>
                    &times;
                  </span>
                  <h2>Register User</h2>

                  <form onSubmit={handleRegistrationFormSubmit}>
                    Username:
                    <input
                      type="text"
                      name="newUsername"
                      placeholder="Enter Username"
                      value={newUser.newUsername}
                      onChange={handleNewUserChange}
                    />
                    <br />
                    Password:
                    <input
                      type="password"
                      name="newUserPassword"
                      placeholder="Enter Password"
                      value={newUser.newUserPassword}
                      onChange={handleNewUserChange}
                    />
                    <br />
                    Re-Confirm Password:
                    <input
                      type="password"
                      name="newUserPassword"
                      placeholder="Re-Confirm Password"
                      value={newUser.newUserPassword}
                      onChange={handleNewUserChange}
                    />
                    <br />
                    Email:
                    <input
                      type="email"
                      name="newUserEmail"
                      placeholder="Email"
                      value={newUser.newUserEmail}
                      onChange={handleNewUserChange}
                    />
                    <br />
                    Address:
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
