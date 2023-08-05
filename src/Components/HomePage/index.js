import { useEffect, useState } from "react";
import players from "./../../players";
import getPlayers from "../../get-players";
import './home.scss'
const Home = () => {
const [data,setData] =useState(null)
//   console.log(getPlayers(),"{{{")
//   let test = getPlayers().then((res)=>{
//     console.log(res,"|||||")
//   })

const getAge = (dateString)=>{
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
}
  const  getData=()=>{
     getPlayers().then((res)=>{
        setData(res)
      })
      
  }
  useEffect(()=>{
    getData()
  },[])
 console.log(data,"|||||")

  return (
    <div className="players-home-page">
      <div className="players-list">
        {data &&
          data.map((ele, index) => {
            let Dob = new Date(ele.dob)
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let AgeInYears = getAge(Dob)
            return (
              <div className="player-card" key={index}>
                <div className="player-name">Name : {ele.name}</div>
                <div className="player-role">Type:{ele.type}</div>
                <div className="player-rank">Points:{ele.points}</div>
                <div className="player-rank">Rank:{ele.rank}</div>
                {/* {Dob.toLocaleDateString("en-US", options)}&nbsp;({AgeInYears} Years) */}
                <div className="player-age">Age : {AgeInYears} Years</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
