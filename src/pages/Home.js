import React, { Component } from "react";
import AnaGorevService from "../services/anaGorevService";
import { Table, Button, Modal, Input, Form, Typography, Progress, Card, Timeline, Row, Col } from "antd";
import { format } from "date-fns";
import EChart from "../components/chart/EChart";
const { Title, Text, Paragraph } = Typography;

class AnaGorevler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gorevList: [],
      modalVisible: false,
      currentGorev: null,
      formData: {
        gorevAdi: "",
        sonTarih: "",
        tamamlandi: false,
      },
      timelineList: [],
    };
  }

  componentDidMount() {
    this.retrieveGorevler();
  }

  retrieveGorevler = () => {
    AnaGorevService.getAll()
      .then((response) => {
        this.setState({ gorevList: response.data }, this.prepareTimeline);
      })
      .catch((error) => {
        console.error("Görevler alınırken hata oluştu:", error);
      });
  };

  prepareTimeline = () => {
    const { gorevList } = this.state;

    // Yaklaşan görevleri sıralayıp sadece ilk 5'ini al
    const sortedTasks = [...gorevList]
      .filter((gorev) => new Date(gorev.sonTarih) > new Date()) // Geçmiş tarihleri çıkar
      .sort((a, b) => new Date(a.sonTarih) - new Date(b.sonTarih)) // Tarihe göre sıralama
      .slice(0, 5); // İlk 5 görevi al

    // Görevleri zaman çizelgesi formatına dönüştür
    const formattedTasks = sortedTasks.map((gorev) => ({
      title: gorev.gorevAdi,
      time: new Date(gorev.sonTarih).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      color: "green", // Yaklaşan görevleri yeşil renkte göster
    }));

    this.setState({ timelineList: formattedTasks });
  };

  handleAddOrEdit = () => {
    const { currentGorev, formData } = this.state;

    if (currentGorev) {
      AnaGorevService.update(currentGorev.id, formData).then(() => {
        this.retrieveGorevler();
        this.handleCancel();
      });
    } else {
      AnaGorevService.create(formData).then(() => {
        this.retrieveGorevler();
        this.handleCancel();
      });
    }
  };

  handleDelete = (id) => {
    AnaGorevService.delete(id).then(() => {
      this.retrieveGorevler();
    });
  };

  handleComplete = (gorev) => {
    Modal.confirm({
      title: "Görevi tamamlamak istiyor musunuz?",
      onOk: () => {
        gorev.tamamlandi = true;
        AnaGorevService.update(gorev.id, gorev).then(() => {
          this.retrieveGorevler();
        });
      },
    });
  };

  handleEdit = (gorev) => {
    this.setState({
      currentGorev: gorev,
      formData: { ...gorev },
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      currentGorev: null,
      formData: { gorevAdi: "", sonTarih: "", tamamlandi: false },
    });
  };

  render() {
    const { gorevList, modalVisible, formData, timelineList } = this.state;

    return (
      <div>
        <Title level={3}>Ana Görevler</Title>
        <Progress
          percent={
            (gorevList.filter((g) => g.tamamlandi).length / gorevList.length) *
            100
          }
          status="active"
        />
        {/* Tablo ve Zaman Çizelgesi Yan Yana */}
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Tablo ve Zaman Çizelgesi */}
          <Col xs={24} lg={16}>
            <Table
              dataSource={gorevList}
              rowKey="id"
              columns={[
                { title: "Görev Adı", dataIndex: "gorevAdi", key: "gorevAdi" },
                {
                  title: "Son Tarih",
                  dataIndex: "sonTarih",
                  key: "sonTarih",
                  render: (sonTarih) => {
                    const tarih = new Date(sonTarih);
                    return format(tarih, "yyyy-MM-dd");
                  },
                },
                {
                  title: "Saat",
                  dataIndex: "saat",
                  key: "saat",
                  render: (saat) => (saat ? saat : "-"),
                },
                {
                  title: "Tamamlandı",
                  dataIndex: "tamamlandi",
                  key: "tamamlandi",
                  render: (tamamlandi) => (tamamlandi ? "Evet" : "Hayır"),
                },
                {
                  title: "İşlemler",
                  key: "actions",
                  render: (_, gorev) => (
                    <span>
                      <Button onClick={() => this.handleComplete(gorev)}>Bitir</Button>
                      <Button onClick={() => this.handleEdit(gorev)}>Düzenle</Button>
                      <Button danger onClick={() => this.handleDelete(gorev.id)}>
                        Sil
                      </Button>
                    </span>
                  ),
                },
              ]}
            />
            <Button type="primary" onClick={() => this.setState({ modalVisible: true })}>
              Görev Ekle
            </Button>

            {/* Aylık Görev Grafiği */}
            <Card bordered={false} style={{ marginTop: "20px" }}>
              <EChart />
            </Card>
          </Col>

          {/* Zaman Çizelgesi */}
          <Col xs={24} lg={8}>
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Yaklaşan Görevler</Title>
                <Paragraph>Yakın tarihlerde tamamlanması gereken görevler</Paragraph>
                <Timeline className="timelinelist">
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Görev Ekleme Modalı */}
        <Modal
          title="Görev Formu"
          visible={modalVisible}
          onCancel={this.handleCancel}
          onOk={this.handleAddOrEdit}
        >
          <Form layout="vertical">
            <Form.Item label="Görev Adı">
              <Input
                name="gorevAdi"
                value={formData.gorevAdi}
                onChange={(e) =>
                  this.setState({
                    formData: { ...formData, gorevAdi: e.target.value },
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Son Tarih">
              <Input
                name="sonTarih"
                type="date"
                value={formData.sonTarih}
                onChange={(e) =>
                  this.setState({
                    formData: { ...formData, sonTarih: e.target.value },
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Saat">
              <Input
                name="saat"
                type="time"
                value={formData.saat}
                onChange={(e) =>
                  this.setState({
                    formData: { ...formData, saat: e.target.value },
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default AnaGorevler;
