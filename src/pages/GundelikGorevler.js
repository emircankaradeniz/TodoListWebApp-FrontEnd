import React, { useState, useEffect } from "react";
import GorevDataService from "../services/gorevService";
import {
  Row,
  Col,
  Card,
  Typography,
} from "antd";

function GundelikGorevler() {
  const { Title } = Typography;
  const [gorevler, setGorevler] = useState([]);
  const [formData, setFormData] = useState({
    gorevAdi: "",
    aciklama: "",
    tarih: "",
    saat: "",
  });

  // Görevleri çekmek için useEffect
  useEffect(() => {
    fetchGorevler();
  }, []);

  const fetchGorevler = () => {
    GorevDataService.getAll()
      .then((response) => {
        setGorevler(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // Form inputlarını takip etme
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Görev ekleme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    GorevDataService.create(formData)
      .then((response) => {
        console.log("Görev eklendi:", response.data);
        setGorevler((prevGorevler) => [...prevGorevler, response.data]);
        setFormData({
          gorevAdi: "",
          aciklama: "",
          tarih: "",
          saat: "",
        });
      })
      .catch((error) => {
        console.error("Görev eklenirken hata oluştu:", error);
      });
  };

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Gündelik Görevler"
          >
            <div className="ant-list-box table-responsive">
              {/* Görev ekleme formu */}
              <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <input
                      type="text"
                      name="gorevAdi"
                      placeholder="Görev Adı"
                      value={formData.gorevAdi}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px" }}
                    />
                  </Col>
                  <Col span={6}>
                    <input
                      type="text"
                      name="aciklama"
                      placeholder="Açıklama"
                      value={formData.aciklama}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "8px" }}
                    />
                  </Col>
                  <Col span={6}>
                    <input
                      type="date"
                      name="tarih"
                      value={formData.tarih}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px" }}
                    />
                  </Col>
                  <Col span={4}>
                    <input
                      type="time"
                      name="saat"
                      value={formData.saat}
                      onChange={handleChange}
                      required
                      style={{ width: "100%", padding: "8px" }}
                    />
                  </Col>
                  <Col span={2}>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#1890ff",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Ekle
                    </button>
                  </Col>
                </Row>
              </form>

              {/* Görevler tablosu */}
              <table className="width-100">
                <thead>
                  <tr>
                    <th>GÖREV ADI</th>
                    <th>AÇIKLAMA</th>
                    <th>TARİH</th>
                    <th>SAAT</th>
                  </tr>
                </thead>
                <tbody>
                  {gorevler.map((gorev) => (
                    <tr key={gorev.id}>
                      <td>{gorev.gorevAdi}</td>
                      <td>{gorev.aciklama}</td>
                      <td>{gorev.tarih}</td>
                      <td>{gorev.saat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default GundelikGorevler;
