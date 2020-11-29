import axios from 'axios';
import { API_URL } from '../constants';
import authHeader from './auth-header';

class UserService {
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();