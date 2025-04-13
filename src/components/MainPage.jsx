import React, {useEffect} from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import MoviesList from './movieList'

import '../css/MainPage.css'
// import '../css/style.css'
// import '../css/style.scss'
// import '../css/responsive.css'
// import '../css/bootstrap.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav, Card, Button } from 'react-bootstrap';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);

  // States to manage the movies data, filters, and loading state

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Or show a message, trigger logout, etc.
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // const movieList = [
  //   { title: 'Movie 1', description: 'Description of Movie 1' },
  //   { title: 'Movie 2', description: 'Description of Movie 2' },
  //   { title: 'Movie 3', description: 'Description of Movie 3' },
  // ];

  // return (
  //   <>
  //     <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
  //       <Container>
  //         <Navbar.Brand href="#home">MovieApp</Navbar.Brand>
  //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //         <Navbar.Collapse id="basic-navbar-nav">
  //           <Nav className="me-auto">
  //             <Nav.Link href="#home">Home</Nav.Link>
  //             <Nav.Link href="#about">About</Nav.Link>
  //             <Nav.Link href="#contact">Contact</Nav.Link>
  //             {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>

  //     <Container style={{ marginTop: '2rem' }}>
  //       <h1>Movie List</h1>
  //       <div>
  //         {movieList.map((movie, index) => (
  //           <div key={index}>
  //             <h3>{movie.title}</h3>
  //             <p>{movie.description}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </Container>
  //   </>
  // );

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">MovieApp</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
          {isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}

        </Nav>
      </Navbar>

      {/* <div>{token}</div> */}
      <MoviesList token={token}/>
      
    </div>
  );


};

export default MainPage;
