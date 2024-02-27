import axios from "axios";
import dotenv from "dotenv";

const createUser = (fullName, username, passKey) => {
const  url = "http://localhost:3000/api"
  const pass = "student";
  const user = {
    fullName,
    username,
    passKey: pass,
  };
  console.log(user);
  axios
    .post(`${url}/user`, user)
    .then((response) => {
      console.log("User created successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};

export default createUser;
