import { useEffect,useState } from "react"
import { Route,Routes } from "react-router-dom"
import Home from "./Components/HomePage";
import './app.scss';
import PlayerDetails  from "./Components/PlayerDetails/PlayerDetails";
const App =()=>{

  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path={`/PlayerDetail/:id`} element={<PlayerDetails/>}/>
    </Routes>
  )
}
export default App