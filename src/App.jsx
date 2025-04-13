import './App.css'

import MoviesList from './components/movieList';
import Login from './components/Login';
import MainPage from './components/MainPage'; 

import axios from "axios";
import { useState } from 'react';
// import { jwtDecode } from "jwt-decode";

import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import LoginRedirect from "./components/LoginRedirect";
import { API_URL } from './config';

import './css/Page.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let [token, setToken] = useState(null);
  let [registration, setRegistration] = useState(false);
  let [showpopup, setShowPopup] = useState(false);

  const onLogin = async(username, password) => {
    console.log(username);
    console.log(password);

    try {
        const response = await axios.post(
            `${API_URL}/auth/login`,
            {
                username: username,
                password,
            },
            {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                },
            },
        );

        if(response.data.token){
          dispatch(login(response.data.token));

          // // Save the token to localStorage to persist it across page reloads
          // localStorage.setItem('token', response.data.token);

          // Navigate to Main Page after login
          navigate('/main');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error("Axios error:", error.response?.data); // Custom message from backend
            console.log("Status:", error.response?.status);
            // alert(error.response?.data?.message || "Login failed");
            console.log(error);
            console.log(error.response?.data);
            // console.log(error.response.message);
        } else {
            console.error("Unexpected error:", error);
        }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  }

  const onRegistration = async(username, password, email, firstname, lastname) => {

    try {
        const response = await axios.post(
            `${API_URL}/auth/signup`,
            {
                username,
                password,
                email,
                firstname,
                lastname
            },
            {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                },
            },
        );
        
        if(response.data.userId){
          setRegistration(false)
          setShowPopup(true)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Status:", error.response?.status);
            console.log(error);
            console.log(error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
    }
  };

    return (
      <div className="mainContainer">
        <Routes>
          <Route 
            path="/login" 
            element={
              <LoginRedirect>
                <Login 
                  onClickLogin={onLogin} 
                  onClickRegister={onRegistration} 
                  registration={registration}
                  showpopup={showpopup}
                  setRegistration={setRegistration}
                  closePopup={closePopup}
                />
              </LoginRedirect>
            } 
          />
          <Route path="/main" element={<MainPage />} />
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />}
          /> {/* Default route */}

          {/* Catch-all route for invalid paths */}
          <Route 
            path="*" 
            element={<Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    );

}

export default App
