import { useEffect, useState } from "react";
import axios from "axios";

const MoviesList = ({token}) => {

    let [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const moviesListElem = movies.map((movie) => {

    // })

    useEffect(() => { 
        const fetchMovies = async (token) => {
            try {
                //const Logintoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhjb3J0ZTNAcHJvdG9uLm1lIiwidXNlcklkIjoxLCJpYXQiOjE3NDQyMzE2NDMsImV4cCI6MTc0NDIzNTI0M30.Fkn4FeU6soSW0Q8XT-RCZb2WxNIcSJqZRU4gitedDbU";
                const response = await axios.get(
                    `http://localhost:8080/movie/movies`,
                    {
                        params: {
                            currentPage: 1,
                            moviesPerPage: 2
                        },
                        withCredentials: false,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    },
                );
              if (response.status !== 200) {
                console.log(response)
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              console.log(response)
              const data = await response.data.movies;
              console.log(data);
              setMovies(data);
            } catch (err) {
              setError(err.message || 'Something went wrong');
            } finally {
              setLoading(false);
            }
          };

          fetchMovies(token);
    }, [token]);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h2>Movies List</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              {movie.title} ({movie.revenue})
            </li>
          ))}
        </ul>
      </div>
    );

    
}

export default MoviesList;
