import axios from "axios";

const API_URL = "http://localhost:8080/api/gorevler";

const getAll = () => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const create = (data) => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteGorev = (id) => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const complete = (id) => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios.put(`${API_URL}/${id}/tamamla`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateDescription = (id, description) => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios.put(`${API_URL}/${id}/aciklama`, description, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
  });
};

const update = (id, data) => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const GorevDataService = {
  getAll,
  create,
  delete: deleteGorev,
  complete,
  updateDescription,
  update,
};

export default GorevDataService;
