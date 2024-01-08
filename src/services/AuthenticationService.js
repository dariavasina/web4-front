import axios from 'axios';

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth"

class AuthenticationService {
     createUser(user) {
        return axios.post(`${AUTH_API_BASE_URL}/signup`, user);
     }

     logInUser(credentials) {
      return axios.post(`${AUTH_API_BASE_URL}/login`, credentials)
          .then(response => {
              if (response.status === 200) {
                  localStorage.setItem('token', response.data);
                  return response.data;
              }
              return response.data;
          });
   }
}

export default new AuthenticationService()