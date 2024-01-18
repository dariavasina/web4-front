import axios from 'axios';

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth"

class AuthenticationService {
     createUser(user) {
        return axios.post(`${AUTH_API_BASE_URL}/signup`, user);
     }

     logInUser(credentials) {
      return axios.post(`${AUTH_API_BASE_URL}/login`, credentials)
            .then(response => {
                localStorage.setItem('token', response.data);
                return response.data;
            })
            .catch(error => {
                if (error.response) {
                    return Promise.reject(error.response.data);
                }
                else if (error.request) {
                    return Promise.reject("No response received from the server");
                }
                else {
                    console.error("An error occurred while setting up the request:", error.message);
                    return Promise.reject("An error occurred while setting up the request");
                }
            });

    }
}

export default new AuthenticationService()