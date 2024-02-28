
import MyRouter from "./components/MyRouter.jsx"
import { useState } from "react";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <MyRouter />
      <HomePage />      
    </>
  );
}

export default App;
