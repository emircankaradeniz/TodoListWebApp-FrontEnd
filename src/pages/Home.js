import React, { Component } from "react";
import AnaGorevService from "../services/anaGorevService";
import { Table, Button, Modal, Input, Form, Typography, Progress } from "antd";

const { Title } = Typography;

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
    };
  }

  componentDidMount() {
    this.retrieveGorevler();
  }

  retrieveGorevler = () => {
    AnaGorevService.getAll()
      .then((response) => {
        this.setState({ gorevList: response.data });
      })
      .catch((error) => {
        console.error("Görevler alınırken hata oluştu:", error);
      });
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
    const { gorevList, modalVisible, formData } = this.state;

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
        <Table
          dataSource={gorevList}
          rowKey="id"
          columns={[
            { title: "Görev Adı", dataIndex: "gorevAdi", key: "gorevAdi" },
            { title: "Son Tarih", dataIndex: "sonTarih", key: "sonTarih" },
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
                  <Button onClick={() => this.handleComplete(gorev)}>
                    Bitir
                  </Button>
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
          </Form>
        </Modal>
      </div>
    );
  }
}

export default AnaGorevler;
