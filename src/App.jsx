import { useState } from "react";
import MyRouter from "./components/MyRouter.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <MyRouter isLoggedIn={isLoggedIn} setIsLoggedIN={setIsLoggedIn} />
    </>
  );
}

export default App;
