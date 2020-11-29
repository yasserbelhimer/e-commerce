import axios from "axios";
import { API_URL } from "../constants";
const API_URL_LOGIN = API_URL+"/login";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL_LOGIN, { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("admin", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("admin");
  }
}

export default new AuthService();