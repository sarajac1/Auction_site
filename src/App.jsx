import { useState } from 'react'
import MyRouter from "./components/MyRouter.jsx"
import './App.css'
import HomePage from "./pages/HomePage";


function App() {
  return (
    <>
      <MyRouter/>
      <HomePage />
    </>
  );
}

export default App;
