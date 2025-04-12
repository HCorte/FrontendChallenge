import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';

import '../css/MainPage.css'
// import '../css/style.css'
// import '../css/style.scss'
// import '../css/responsive.css'
// import '../css/bootstrap.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav, Card, Button } from 'react-bootstrap';

const MainPage = ({ token }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/login');
  // };

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

  const movies = [
    { id: 1, title: "The Shawshank Redemption", year: 1994, description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
    { id: 2, title: "The Dark Knight", year: 2008, description: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham." },
    { id: 3, title: "Inception", year: 2010, description: "A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO." }
  ];

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">MovieApp</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar>

      <Container className="mt-4">
        <Row>
          {movies.map(movie => (
            <Col sm={12} md={4} lg={3} key={movie.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/150`} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{movie.year}</Card.Subtitle>
                  <Card.Text>{movie.description}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );


};

export default MainPage;
