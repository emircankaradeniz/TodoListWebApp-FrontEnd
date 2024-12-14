import axios from "axios";

const API_URL = "http://localhost:8080/api/scrape";

const searchAmazon = (query) => {
  const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
  return axios
    .get(`${API_URL}/amazon`, {
      params: { query }, // Query parametresini ekle
      headers: {
        Authorization: `Bearer ${token}`, // Token'ı Authorization header'ına ekle
      },
    })
    .then((response) => {
      console.log("Gelen Yanıt:", response.data.slice(0, 5)); // Gelen yanıtı kontrol et
      return response; // İlk 5 sonucu döndür
    })
    .catch((error) => {
      console.error("Hata:", error);
      throw error; // Hatayı yukarıya fırlat
    });
};

const ScrapeDataService = {
  searchAmazon,
};

export default ScrapeDataService;
