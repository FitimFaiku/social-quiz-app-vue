import axios from 'axios';

const API_URL = 'http://localhost:4010/v1/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username: username,
        password: password
      })
      .then(response => {
        console.log("Response", response);
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getLoggedInUser(){
    return localStorage.getItem('user');
  }

  register(user) {
    console.log("Register", user);
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
    });
  }
}

export default new AuthService();