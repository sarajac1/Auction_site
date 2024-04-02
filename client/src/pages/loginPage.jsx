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
    newUserConfirmPassword: "",
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
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (existingUser) {
      localStorage.setItem("token", credentials.username);
      localStorage.setItem("token_id", existingUser.id);
      localStorage.setItem("isAdmin", existingUser.isAdmin.toString());
      setIsLoggedIn(true);
      window.location.reload();
      window.location.href = '/';
    } else {
      setAlertModal({ isOpen: true, message: 'Incorrect username or password. Please try again.' });
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

    if (newUser.newUserPassword !== newUser.newUserConfirmPassword) {
      setAlertModal({ isOpen: true, message: 'Passwords do not match.' });
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
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        localStorage.setItem("token", newUser.newUsername); 
        localStorage.setItem("token_id", data.id);
        localStorage.setItem("isAdmin", data.isAdmin.toString());
        setIsLoggedIn(true); 

        console.log('Registered successfully!');
        navigate('/'); 
        window.location.reload();
      } else {
        setAlertModal({ isOpen: true, message: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAlertModal({ isOpen: true, message: 'An error occurred. Please try again.' });
    }
  }

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);


  const handleForgotPasswordClick = (event) => {
    event.stopPropagation(); 
    setAlertModal({ isOpen: true, message: 'Forgot Your Password?\n\nPlease contact support to reset your password.\nSupport@shaddowbid.com' });
  };


  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    setRegistrationForm(true);
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // Обработчик нажатия клавиши для формы регистрации
  const handleRegistrationKeyDown = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleRegistrationFormSubmit(event); // Передаем событие, чтобы предотвратить отправку формы
    }
  };


  const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault(); // Всегда предотвращаем стандартное поведение

      // Проверяем, открыта ли форма регистрации
      if (showRegistrationForm) {
        handleRegistrationFormSubmit(event); // Для Enter в форме регистрации
      } else {
        handleSubmit(event); // Для Enter на странице входа
      }
    }
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
                  onKeyDown={handleKeyDown}
                />
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <AlertModal
                  isOpen={alertModal.isOpen}
                  message={alertModal.message}
                  onClose={() => setAlertModal({ isOpen: false, message: '' })}
                />

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
                  <h2 className="register_user_text">Register User</h2>

                  <form className="register_user_text" onSubmit={handleRegistrationFormSubmit}>
                    Username:  
                    <input
                      style={{ marginLeft: "20px" }}
                      type="text"
                      name="newUsername"
                      placeholder="Enter Username"
                      value={newUser.newUsername}
                      onChange={handleNewUserChange}
                      onKeyDown={handleRegistrationKeyDown}
                    />
                    <br />
                    Password:
                    <input
                      style={{ marginLeft: "20px" }}
                      type={passwordShown ? "text" : "password"}
                      name="newUserPassword"
                      placeholder="Enter Password"
                      value={newUser.newUserPassword}
                      onChange={handleNewUserChange}
                      onKeyDown={handleRegistrationKeyDown}
                    />
                    <button className="forgot_pass_button hide_show_pass_button" type="button" onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                      {passwordShown ? "Hide" : "Show"} Password
                    </button>
                    <br />
                    Re-Confirm Password:
                    <input
                      style={{ marginLeft: "20px" }}
                      type={showConfirmPassword ? "text" : "password"}
                      name="newUserConfirmPassword" 
                      placeholder="Re-Confirm Password"
                      value={newUser.newUserConfirmPassword}
                      onChange={handleNewUserChange}
                      onKeyDown={handleRegistrationKeyDown}
                    />
                    <button className="forgot_pass_button hide_show_pass_button hide_show_reconfirm_pass_button" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? "Hide" : "Show"} Password
                    </button>
                    <br />
                    Email:
                    <input
                      style={{ marginLeft: "20px" }}
                      type="email"
                      name="newUserEmail"
                      placeholder="Email"
                      value={newUser.newUserEmail}
                      onChange={handleNewUserChange}
                      onKeyDown={handleRegistrationKeyDown}
                    />
                    <br />
                    Address:
                    <input
                      style={{ marginLeft: "20px" }}
                      type="text"
                      name="newUserAddress"
                      placeholder="Address"
                      value={newUser.newUserAddress}
                      onChange={handleNewUserChange}
                      onKeyDown={handleRegistrationKeyDown}
                    />
                    <br />
                    <button className="rounded-button-small" type="submit">
                      Register
                    </button>
                  </form>
                </div>
              </div>
              <AlertModal
                isOpen={alertModal.isOpen}
                message={alertModal.message}
                onClose={() => setAlertModal({ isOpen: false, message: '' })}
              />
            </ReactModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
