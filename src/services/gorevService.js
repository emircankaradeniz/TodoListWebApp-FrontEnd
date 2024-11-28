import axios from "axios";

const API_URL = "http://localhost:8080/api/gorevler";

const getAll = () => {
  return axios.get(API_URL);
};

const create = (data) => {
  return axios.post(API_URL, data);
};

const deleteGorev = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const complete = (id) => {
  return axios.put(`${API_URL}/${id}/tamamla`); // PUT isteği
};

const updateDescription = (id, description) => {
  return axios.put(`${API_URL}/${id}/aciklama`, description, {
    headers: { "Content-Type": "text/plain" },
  });
};
const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data); // Backend'deki PUT endpoint'ine istek gönder
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
