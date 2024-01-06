import axios from 'axios';

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/users"

class AuthenticationService {
    // getEntries() {
    //     return axios.get(ENTRY_API_BASE_URL);
    // }

     createUser(user) {
        return axios.post(AUTH_API_BASE_URL, user);
     }

     logInUser(user) {
        
     }
}

export default new AuthenticationService()