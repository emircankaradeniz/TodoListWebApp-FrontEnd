import { useState } from "react";
import React from 'react';
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import Paragraph from "antd/lib/skeleton/Paragraph";
import ModalForm from "../components/PopUp/ModalForm";
import ModalFormGörevEkle from "../components/PopUp/ModalFormGörevEkle";



function Tables() {
  const { Title } = Typography;
  const [modal,setmodal]=useState(false);
  const [inputValue, setInputValue] = useState('');
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const pencil2 = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];
  const deletebtn = [
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        fill="#111827"
        className="fill-danger"
      ></path>
    </svg>,
  ];
  // project table start
  const project = [
    {
      title: "GÖREVLER",
      dataIndex: "name",
      width: "32%",
    },
    {
      title: "DURUM",
      dataIndex: "address",
    },
    {
      title: "NOT",
      dataIndex: "metin",
    },
    {
      title: "----",
      dataIndex: "buton",
    },
  
  ];
  const dataproject = [
    {
      key: "1",
  
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Spotify Version</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      metin: (
        <>
          <div className="text">
          <p>emircan karadeniz</p>
          </div>
        </>
      ),
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          
          <Button type="primary">Bitir</Button>
                            <Button type="link" danger>
                            {deletebtn}DELETE
                          </Button>
          <Button
                      type="link"
                      className="darkbtn"
                      onClick={() => setmodal(true)}
                      > {pencil2} Düzenle</Button>
                      <ModalForm isOpen={modal} ></ModalForm>
          </Col>
          </>
      ),
  
    },
  
    {
      key: "2",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Progress Track</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      metin: (
        <>
          <div className="text">
          <p>emircan karadeniz</p>
          </div>
        </>
      ),
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          
          <Button type="primary">Bitir</Button>
                            <Button type="link" danger>
                            {deletebtn}DELETE
                          </Button>
          <Button
                      type="link"
                      className="darkbtn"
                      onClick={() => setmodal(true)}
                      > {pencil2} Düzenle</Button>
                      <ModalForm isOpen={modal} ></ModalForm>
          </Col>
          </>
      ),
    },
  
    {
      key: "3",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}> Jira Platform Errors</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      address: (
        <>
          <div className="text-sm">done</div>
        </>
      ),
      metin: (
        <>
          <div className="text">
          <p>emircan karadeniz</p>
          </div>
        </>
      ),
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          
          <Button type="primary">Bitir</Button>
                            <Button type="link" danger>
                            {deletebtn}DELETE
                          </Button>
          <Button
                      type="link"
                      className="darkbtn"
                      onClick={() => setmodal(true)}
                      > {pencil2} Düzenle</Button>
                      <ModalForm isOpen={modal} ></ModalForm>
          </Col>
          </>
      ),
    },
  
    {
      key: "4",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}> Launch new Mobile App</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      address: (
        <>
          <div className="text-sm">canceled</div>
        </>
      ),
      metin: (
        <>
          <div className="text">
          <p>emircan karadeniz</p>
          </div>
        </>
      ),
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          
          <Button type="primary">Bitir</Button>
                            <Button type="link" danger>
                            {deletebtn}DELETE
                          </Button>
          <Button
                      type="link"
                      className="darkbtn"
                      onClick={() => setmodal(true)}
                      > {pencil2} Düzenle</Button>
                      <ModalForm isOpen={modal} ></ModalForm>
          </Col>
          </>
      ),
    },
  
    {
      key: "5",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Web Dev</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      address: (
        <>
          <div className="text-sm">working</div>
        </>
      ),
      metin: (
        <>
          <div className="text">
          <p>emircan karadeniz</p>
          </div>
        </>
      ),
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          
          <Button type="primary">Bitir</Button>
                            <Button type="link" danger>
                            {deletebtn}DELETE
                          </Button>
          <Button
                      type="link"
                      className="darkbtn"
                      onClick={() => setmodal(true)}
                      > {pencil2} Düzenle</Button>
                      <ModalForm isOpen={modal} ></ModalForm>
          </Col>
          </>
      ),
    },
  
    {
      key: "6",
      name: (
        <>
          <Avatar.Group>
            <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
            <div className="avatar-info">
              <Title level={5}>Redesign Online Store</Title>
            </div>
          </Avatar.Group>
        </>
      ),
      address: (
        <>
          <div className="text-sm">canceled</div>
        </>
      ),
      metin: (
        <>
          <div className="text">
          <p>emircan karadeniz</p>
          </div>
        </>
      ),
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          
          <Button type="primary">Bitir</Button>
                            <Button type="link" danger>
                            {deletebtn}DELETE
                          </Button>
          <Button
                      type="link"
                      className="darkbtn"
                      onClick={() => setmodal(true)}
                      > {pencil2} Düzenle</Button>
                      <ModalForm isOpen={modal} ></ModalForm>
          </Col>
          </>
      ),
    },
  ];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Gündelik Görevler Tablosu"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">HEPSİ</Radio.Button>
                    <Radio.Button value="online">Yapılmış</Radio.Button>
                    <Radio.Button value="store">Yapılmamış</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                      columns={project}
                      dataSource={dataproject}
                      pagination={false}
                      className="ant-border-space"
                      actions={[<Button type="link">PDF</Button>]}
                    />

              </div>
              <div className="uploadfile pb-15 shadow-none">
                
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                    onClick={() => setModalOpen(true)}
                  >
                    Görev Ekle
                  </Button>
                  <ModalFormGörevEkle isOpen={modalOpen} ></ModalFormGörevEkle>

              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
