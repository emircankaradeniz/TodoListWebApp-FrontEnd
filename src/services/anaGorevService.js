import axios from "axios";

const API_URL = "http://localhost:8080/api/ana-gorevler";

class AnaGorevService {
  getAll() {
    return axios.get(API_URL);
  }

  create(data) {
    return axios.post(API_URL, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  complete(id) {
    return axios.put(`${API_URL}/tamamla/${id}`);
  }
}

export default new AnaGorevService();
