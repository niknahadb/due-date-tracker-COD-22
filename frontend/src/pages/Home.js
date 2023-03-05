import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { handleNavigate } from '../utils/handleNavigate.js'
import axios from 'axios'

function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="App">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const {name, email, sub} = jwtDecode(credentialResponse.credential);
          axios.post('http://localhost:5001/api/v1/user/login', {
            name,
            email,
            sub
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            console.log("done")
          });
          handleNavigate(navigate, "/Integration", )
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Home;