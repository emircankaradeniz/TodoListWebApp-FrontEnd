import React, { useState, useEffect } from "react";
import GorevDataService from "../services/gorevService";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Table,
} from "antd";

const { Title } = Typography;

function GundelikGorevler() {
  const [gorevler, setGorevler] = useState([]);
  const [formData, setFormData] = useState({
    gorevAdi: "",
    saat: "",
    aciklama: "",
  });
  const [selectedGorev, setSelectedGorev] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleAdd = () => {
    GorevDataService.create(formData)
      .then((response) => {
        setGorevler((prevGorevler) => [...prevGorevler, response.data]);
        setFormData({
          gorevAdi: "",
          saat: "",
          aciklama: "",
        });
      })
      .catch((error) => {
        console.error("Görev eklenirken hata oluştu:", error);
      });
  };

  const handleDelete = (id) => {
    GorevDataService.delete(id)
      .then(() => {
        setGorevler((prevGorevler) => prevGorevler.filter((gorev) => gorev.id !== id));
      })
      .catch((error) => {
        console.error("Görev silinirken hata oluştu:", error);
      });
  };

  const handleComplete = (id) => {
    GorevDataService.complete(id)
      .then(() => {
        setGorevler((prevGorevler) =>
          prevGorevler.map((gorev) =>
            gorev.id === id ? { ...gorev, tamamlandi: true } : gorev
          )
        );
      })
      .catch((error) => {
        console.error("Görev tamamlanırken hata oluştu:", error);
      });
  };

  const handleShowDescription = (gorev) => {
    setSelectedGorev(gorev);
    setIsModalVisible(true);
  };

  const handleUpdateDescription = () => {
    GorevDataService.update(selectedGorev.id, selectedGorev)
      .then(() => {
        setGorevler((prevGorevler) =>
          prevGorevler.map((gorev) =>
            gorev.id === selectedGorev.id ? selectedGorev : gorev
          )
        );
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error("Açıklama güncellenirken hata oluştu:", error);
      });
  };

  const columns = [
    {
      title: "Görev Adı",
      dataIndex: "gorevAdi",
      key: "gorevAdi",
    },
    {
      title: "Saat",
      dataIndex: "saat",
      key: "saat",
    },
    {
      title: "Tamamlandı",
      dataIndex: "tamamlandi",
      key: "tamamlandi",
      render: (tamamlandi) => (tamamlandi ? "✅" : "❌"),
    },
    {
      title: "Açıklama",
      key: "aciklama",
      render: (_, gorev) => (
        <Button onClick={() => handleShowDescription(gorev)}>Göster</Button>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, gorev) => (
        <>
          <Button onClick={() => handleComplete(gorev.id)}>Bitir</Button>
          <Button danger onClick={() => handleDelete(gorev.id)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Gündelik Görevler"
          >
            <Form
              layout="inline"
              onFinish={handleAdd}
              style={{ marginBottom: "20px" }}
            >
              <Form.Item label="Görev Adı">
                <Input
                  value={formData.gorevAdi}
                  onChange={(e) =>
                    setFormData({ ...formData, gorevAdi: e.target.value })
                  }
                  required
                />
              </Form.Item>
              <Form.Item label="Saat">
                <Input
                  type="time"
                  value={formData.saat}
                  onChange={(e) =>
                    setFormData({ ...formData, saat: e.target.value })
                  }
                  required
                />
              </Form.Item>
              <Form.Item label="Açıklama">
                <Input.TextArea
                  rows={1}
                  value={formData.aciklama}
                  onChange={(e) =>
                    setFormData({ ...formData, aciklama: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Ekle
                </Button>
              </Form.Item>
            </Form>

            <Table
              dataSource={gorevler}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Açıklama Gösterme Modalı */}
      {selectedGorev && (
        <Modal
          title="Görev Açıklaması"
          visible={isModalVisible}
          onOk={handleUpdateDescription}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form layout="vertical">
            <Form.Item label="Açıklama">
              <Input.TextArea
                value={selectedGorev.aciklama}
                onChange={(e) =>
                  setSelectedGorev({ ...selectedGorev, aciklama: e.target.value })
                }
                rows={5}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default GundelikGorevler;
