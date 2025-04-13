import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PopupMovie from './PopupMovie';

const MoviesList = ({token}) => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // to stop fetching when done
    const scrollContainerRef = useRef(null);
  
    // const [yearFilter, setYearFilter] = useState(''); // Store selected year filter
    // const [revenueFilter, setRevenueFilter] = useState(''); // Store selected revenue filter
    // const [filteredMovies, setFilteredMovies] = useState([]);

    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

  
    useEffect(() => {
      let ignore = false;

      const fetchMovies = async () => {
        if (!token || loading || !hasMore) return;
  
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/movie/movies`,
            {
              params: {
                currentPage,
                moviesPerPage: 30,
              },
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
  
          const newMovies = response.data.movies;
  
          if (!ignore) {
            if (newMovies.length === 0) {
              setHasMore(false);
            } else {
              setMovies((prev) => [...prev, ...newMovies]);
            }
          }
        } catch (err) {
          if (!ignore) setError(err.message || 'Something went wrong');
        } finally {
          if (!ignore) setLoading(false);
        }
      };
  
      fetchMovies();

      return () => {
        ignore = true;
      };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, currentPage, hasMore]);

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
  
      const handleScroll = () => {
        if (
          !loading &&
          hasMore &&
          container.scrollTop + container.clientHeight >= container.scrollHeight - 100
        ) {
          setCurrentPage((prev) => prev + 1);
        }
      };
  
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    const showMovieDetails = (movieId) => {
      setSelectedMovieId(movieId);
      setShowPopup(true);
    };
    
    const closePopup = () => {
      setShowPopup(false);
      setSelectedMovieId(null);
    };
    

    if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;
  
    return (
      <Container 
        className="mt-4 scrollY" 
        ref={scrollContainerRef}
        style={{ height: '80vh', overflowY: 'scroll' }}
      >
        <Row>
          {movies.map(movie => (
            <Col sm={12} md={4} lg={3} key={movie.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={movie.thumbnail} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{movie.year}</Card.Subtitle>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button variant="primary" onClick={() => showMovieDetails(movie.id)}>View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {loading && <div className="text-center my-4">Loading more movies...</div>}
        {!hasMore && <div className="text-center my-4 text-muted">No more movies to load.</div>}
        {showPopup && (
          <PopupMovie
            token={token}
            movieId={selectedMovieId}
            show={showPopup}
            onClose={closePopup}
          />
        )}
      </Container>
    );    
}

export default MoviesList;
