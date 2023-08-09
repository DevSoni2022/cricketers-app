import { useEffect, useState } from "react";
import getPlayers from "../../get-players";
import "./home.scss";
const Home = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortData, setSortData] = useState(null);
  const [showSortBy, setshowSortBy] = useState(false);
  const [sortByText, setSortByText] = useState(null);
  const [serachText,setSearchText] = useState(null)
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

  useEffect(() => {
    data && data.length > 0 && setTotalPages(Math.ceil(data.length / 3));

    const pageList = [];
    for (let i = 0; i < totalPages; i++) {
      pageList.push(i);
    }
    pageList && pageList.length > 0 && setPageNumbers(pageList);
  }, [data]);
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
  let listOfPage = Array.from({ length: totalPages }, (_, i) => i);

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
  const itemsToDiaplay =
    data && data.length > 0 && data.slice(startIndex, endIndex);

  const sortObj = [
    {
      id: 1,
      SortBy: "All",
    },
    {
      id: 2,
      SortBy: "Name",
    },
    {
      id: 3,
      SortBy: "Age",
    },
    {
      id: 4,
      SortBy: "Rank",
    },
  ];

  const HandleSortBy = (ele) => {
    setshowSortBy(false);
    setSortByText(ele.name);
    let type = ele.SortBy.toLowerCase();
    if (type == "rank") {
      const result = data.sort(function (a, b) {
        if (a.rank < b.rank) {
          return -1;
        }
        if (a.rank > b.rank) {
          return 1;
        }
        return 0;
      });
      setSortData(result);
      setData(result);
    }
    if (type == "name") {
      const result = data.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setSortData(result);
      setData(result);
    }
    if (type == "age") {
      const result = data.sort(function (a, b) {
        if (a.Age < b.Age) {
          return -1;
        }
        if (a.Age > b.Age) {
          return 1;
        }
        return 0;
      });
      setSortData(result);
      setData(result);
    }
  };
  console.log(data, "{{{{");

  useEffect(() => {
    setData(sortData);
  }, [sortData]);

  const handleOnChange = (ele) => {
    let searchText = ele.target.value;
    setSearchText(searchText)
    const result =searchText && searchText.length>0 && data.filter((ele, indx) => {
      return (
        ele.name && ele.name.toLowerCase().includes(searchText.toLowerCase()) ? ele:''
      );
    });
    setData(result);
  };
  return (
    <>
      {data && data.length > 0 ? (
        <div>
          <h1 className="heading-top">Cricket App</h1>
          <div className="top-contariner">
            <div className="inner-container">
              <div className="search-container">
                <div className="top-main">
                  <input
                    type="text"
                    onChange={(ele) => handleOnChange(ele)}
                    className="search0box"
                    placeholder="Search Player name here....."
                  />
                  <lable
                    className="heading"
                    onClick={() => {
                      setshowSortBy(!sortBy);
                    }}
                  >
                    {sortByText && sortByText.length > 0
                      ? `Sort By ${sortByText}`
                      : "Choose Sort By"}
                  </lable>
                </div>

                {showSortBy && (
                  <ul>
                    {sortObj &&
                      sortObj.map((ele, index) => {
                        return (
                          <li onClick={() => HandleSortBy(ele)}>
                            {ele.SortBy}
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            </div>
          </div>
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
                    <a
                      href={`/PlayerDetail/` + ele.id}
                      className="player-card"
                      key={index}
                    >
                      <div className="player-name">{ele.name}</div>
                      <div className="player-role">
                        Type:{ele.type} {<img src={img} alt="player" />}
                      </div>
                      <div className="player-rank">Points:{ele.points}</div>
                      <div className="player-rank">Rank:{ele.rank}</div>
                      {/* {Dob.toLocaleDateString("en-US", options)}&nbsp;({AgeInYears} Years) */}
                      <div className="player-age">Age : {AgeInYears} Years</div>
                    </a>
                  );
                })}
            </div>
          </div>
          <div className="pagination">
            <button
              className={preDisabled ? "disabled" : ""}
              onClick={handlePrevClick}
              disabled={preDisabled}
            >
              <svg width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path
                  d="M16 0.5L16.4476 0.506151C25.0729 0.743461 32 7.8177 32 16.5C32 25.316 24.832 32.5 16 32.5C7.184 32.5 0 25.316 0 16.5C0 7.668 7.184 0.5 16 0.5Z"
                  fill="white"
                ></path>
                <path
                  d="M16 0.5L16.4476 0.506151C25.0729 0.743461 32 7.8177 32 16.5C32 25.316 24.832 32.5 16 32.5C7.184 32.5 0 25.316 0 16.5C0 7.668 7.184 0.5 16 0.5ZM19.168 10.1C18.688 9.62 17.936 9.62 17.472 10.1L11.888 15.652C11.664 15.876 11.536 16.18 11.536 16.5C11.536 16.82 11.664 17.124 11.888 17.348L17.472 22.9C17.696 23.14 18 23.252 18.304 23.252C18.624 23.252 18.928 23.14 19.168 22.9C19.632 22.42 19.632 21.668 19.152 21.204L14.432 16.5L19.152 11.796C19.632 11.332 19.632 10.564 19.168 10.1Z"
                  fill="#00B5B7"
                ></path>
              </svg>{" "}
            </button>{" "}
            {listOfPage &&
              listOfPage.length > 0 &&
              listOfPage.map((i, index) => {
                return (
                  <div
                    className={i + 1 === currentPage ? "active item" : "item"}
                    onClick={() => handlePageChange(i + 1)}
                    key={i}
                    disabled={i + 1 === currentPage}
                  >
                    {i + 1}
                  </div>
                );
              })}
            <button
              className={nextDisabled ? "disabled" : ""}
              onClick={handleNextClick}
              disabled={nextDisabled}
            >
              <svg width="32" height="33" viewBox="0 0 32 33" fill="none">
                <path
                  d="M16 0.5L15.5524 0.506151C6.92708 0.743461 0 7.8177 0 16.5C0 25.316 7.168 32.5 16 32.5C24.816 32.5 32 25.316 32 16.5C32 7.668 24.816 0.5 16 0.5Z"
                  fill="white"
                ></path>
                <path
                  d="M16 0.5L15.5524 0.506151C6.92708 0.743461 0 7.8177 0 16.5C0 25.316 7.168 32.5 16 32.5C24.816 32.5 32 25.316 32 16.5C32 7.668 24.816 0.5 16 0.5ZM12.832 10.1C13.312 9.62 14.064 9.62 14.528 10.1L20.112 15.652C20.336 15.876 20.464 16.18 20.464 16.5C20.464 16.82 20.336 17.124 20.112 17.348L14.528 22.9C14.304 23.14 14 23.252 13.696 23.252C13.376 23.252 13.072 23.14 12.832 22.9C12.368 22.42 12.368 21.668 12.848 21.204L17.568 16.5L12.848 11.796C12.368 11.332 12.368 10.564 12.832 10.1Z"
                  fill="#00B5B7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <span>{serachText && serachText.length>0 ? 'No Result Found':'Loading'}</span>
      )}
    </>
  );
};

export default Home;
