import { useEffect, useState } from "react";
import getPlayers from "../../get-players";
import "./home.scss";
const Home = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers,setPageNumbers] = useState([])

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

  useEffect(()=>{
    data &&data.length>0 && setTotalPages(Math.ceil(data.length / 3));

    const pageList = [];
    for (let i = 0; i < totalPages; i++) {
        pageList.push(i);
    }
    pageList && pageList.length>0 && setPageNumbers(pageList)

  },[data])
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
let test =Array.from({length: totalPages}, (_, i) => i )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDiaplay = data &&data.length>0 && data.slice(startIndex, endIndex);
 
  console.log(test, "#$!#@$!@",totalPages);
  return (
    
    <>
    {
        data && data.length>0 ?
      <div>
        <div className="players-home-page">
          <div className="players-list">
            {data &&
              itemsToDiaplay.map((ele, index) => {
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
        <div>
          <button onClick={handlePrevClick} disabled={preDisabled}>
            Prev
          </button>
          {test &&
            test.length > 0 &&
            test.map((i, index) => {
              return (
                <button
                  onClick={() => handlePageChange(i + 1)}
                  key={i}
                  disabled={i + 1 === currentPage}
                >
                  {i + 1}
                </button>
              );
            })}

          <button onClick={handleNextClick} disabled={nextDisabled}>
            Next
          </button>
        </div>
      </div>
      :
      <span>Loading</span>
}
    </>
  );
};

export default Home;
