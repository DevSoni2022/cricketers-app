import { useEffect,useState } from "react"
import { Route,Routes } from "react-router-dom"
import Home from "./Components/HomePage";
import './app.scss';

const App =()=>{

  return(
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  )
}
export default App