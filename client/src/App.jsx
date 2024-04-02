import React, { useState } from "react";
import MyRouter from "./components/MyRouter.jsx";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <MyRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default App;
