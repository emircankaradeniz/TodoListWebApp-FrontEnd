import axios from "axios";

const API_URL = "http://localhost:8080/api/ana-gorevler";

class AnaGorevService {
  getAll() {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(data) {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data) {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id) {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  complete(id) {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    return axios.put(`${API_URL}/tamamla/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new AnaGorevService();
