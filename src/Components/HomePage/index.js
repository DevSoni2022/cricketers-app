import { useEffect, useState } from "react";
import getPlayers from "../../get-players";
import "./home.scss";
const Home = () => {
  const [data, setData] = useState(null);


  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const getData = () => {
    getPlayers().then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    getData();

  }, []);


  const getPlayerTypeImage = (role) => {
    role = role && role.toLowerCase();
    if ("allrounder" == role) {
      return "https://www.iplt20.com/assets/images/teams-all-rounder-icon.svg";
    } else if ("batsman" == role) {
      return "https://www.iplt20.com/assets/images/teams-batsman-icon.svg";
    } else if ("bowler" == role) {
      return "https://www.iplt20.com/assets/images/teams-bowler-icon.svg";
    } else if ("wicketkeeper" == role) {
      return "https://www.iplt20.com/assets/images/teams-wicket-keeper-icon.svg";
    } else {
      return;
    }
  };
  return (
    <div className="players-home-page">
      <div className="players-list">
        {data &&
          data.map((ele, index) => {
            let Dob = new Date(ele.dob);
            var options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            let AgeInYears = getAge(Dob);
            let img = getPlayerTypeImage(ele && ele.type);
            return (
              <div className="player-card" key={index}>
                <div className="player-name">{ele.name}</div>
                <div className="player-role">
                  Type:{ele.type} {<img src={img} alt="player" />}
                </div>
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
