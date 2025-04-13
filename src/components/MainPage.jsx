import React, {useEffect} from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

import MoviesList from './movieList'

import '../css/MainPage.css'

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

      <MoviesList token={token}/>
      
    </div>
  );


};

export default MainPage;
