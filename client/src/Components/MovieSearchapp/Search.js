import axios from "axios";
import React, { useEffect, useState } from "react";
import "./movie.css";


const MovieSearch = () => {
  const [search, setSearch] = useState("pushpa");
  const [movie, setMovie] = useState([]);

  // const API_KEY = "b92cd346";
  const API_KEY = "b5382e81";



  const searchMovie = async () => {

    if (!search) return;
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      if (response.data.Error) {
        console.error("API Error:", response.data.Error);
        setMovie([]); // Clear movies if an error occurs
        return;
      }

      //   poster data filter
      const filterdata = (response.data.Search || []).filter(
        (movie) => movie.Poster !== "N/A"
      );
      console.log(filterdata, "filterdata");

      setMovie(filterdata);
    } catch (error) {
      console.error("Error fatching data", error);
      setMovie([])
    }
  };
  console.log(movie, "searchMovie");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovie(search);
    }
  };
  useEffect(() => {
    document.title = "Project - Movie app";
  }, []);


   useEffect(() => {
        const timer = setTimeout(() => {
          searchMovie(search);
        }, 300); // 300ms delay
        return () => clearTimeout(timer); // Clear timer on input change
              
      }, []); // Trigger on search input change
    
  

  return (
    <>
    
   
      <h2 style={{ color: "white", paddingTop: "10px", fontSize: "x-large" }}>
        Movie Search
      </h2>
      <div className="searchinput">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          
        />
        <button style={{ backgroundColor: "white" }} onClick={searchMovie}>
          search
        </button>
      </div>
      {/* movie card */}
      <div className="movie-card">
        {movie.map((movie, index) => (
          <div key={movie.imdbID} className="cardmovie ">
            <img
              src={movie.Poster}
              className="card-img-top "
              alt="poster"
              style={{ height: "300px" }}
            />
            <div className="card-body ">
              <h5 className="card-title">{movie.Title}</h5>
              <a href="/" className="btn btn-primary">
                More Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieSearch;
