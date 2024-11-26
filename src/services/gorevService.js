import axios from "axios";

const API_URL = "http://localhost:8080/api/gorevler";

const getAll = () => {
  return axios.get(API_URL);
};

const create = (data) => {
  return axios.post(API_URL, data); // POST isteği
};

const GorevDataService = {
  getAll,
  create, // `create` metodunu burada tanımladığınızdan emin olun
};

export default GorevDataService;
