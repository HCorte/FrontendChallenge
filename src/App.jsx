import './App.css'

import MoviesList from './components/movieList';
import Login from './components/Login';
import MainPage from './components/MainPage'; 

import axios from "axios";
import { useState } from 'react';
// import { jwtDecode } from "jwt-decode";

import { Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { login } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';

import './css/Page.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [token, setToken] = useState(null);
  let [registration, setRegistration] = useState(false);

  const onLogin = async(username, password) => {
    console.log(username);
    console.log(password);

    try {
        const response = await axios.post(
            `http://localhost:8080/auth/login`,
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

        console.log(response.data)
        if(response.data.token){
          console.log(response.data.token);

          setToken(response.data.token);
          // Dispatch login action
          dispatch(login(response.data.token));

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

  const onRegistration = async(username, password, email, firstname, lastname) => {
    console.log(`
      username: ${username}
      password: ${password}
      email: ${email}
      firstname: ${firstname}
      lastname: ${lastname}
`);
    console.log(password);

    try {
        const response = await axios.post(
            `http://localhost:8080/auth/signup`,
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

        console.log(response.data)
        
        if(response.data.userId){
          console.log(response.data.userId)
          console.log(response.data.message)
          setRegistration(false)
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

  // const usernameLogged = () => {
  //     if(token){
  //       try {
  //         const { userId, username, email } = jwtDecode(token); // This is the correct function call

  //         return (<>
  //           <div>
  //             <span>{userId || ''}</span>
  //             <span>{username || ''}</span>
  //             <span>{email || ''}</span>
  //           </div>
  //         </>)
  //       } catch (error) {
  //         console.error("Token verification failed:", error);
  //         return null; // or handle error more gracefully, e.g., show a message
  //       }
  //     } else {
  //       return null
  //     }
  // };

  // const showMovieList = () => {
  //   if(token){
  //     return (<>
  //       <MoviesList token={token}/>
  //     </>)
  //   } else {
  //     return null
  //   }
  // }

    return (
      <div className="mainContainer">
        <Routes>
          <Route 
            path="/login" 
            element={
              <Login 
                onClickLogin={onLogin} 
                onClickRegister={onRegistration} 
                registration={registration}
                setRegistration={setRegistration}
              />
            } 
          />
          <Route path="/main" element={<MainPage token={token}/>} />
          <Route 
            path="/" 
            element={
              <Login 
                onClickLogin={onLogin} 
                onClickRegister={onRegistration} 
                registration={registration}
                setRegistration={setRegistration}
              />
            } 
          /> {/* Default route */}
        </Routes>
      </div>
    );


  // return (
  //   <>
  //     <div className="mainContainer">
  //       {usernameLogged()}
  //       <Login 
  //         onClickLogin={onLogin} 
  //         onClickRegister={onRegistration}
  //         registration={registration}
  //         setRegistration={setRegistration}
  //       />
  //       {showMovieList()}
  //     </div>
  //   </>
  // )
}

export default App
