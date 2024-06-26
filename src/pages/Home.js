import { useState,useEffect } from "react";
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import GorevDataService from "../services/gorevService";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import Btn from "../components/btn/openDelEditBtn"
import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import ModalForm from "../components/PopUp/ModalForm";
import ModalFormGörevEkle from "../components/PopUp/ModalFormGörevEkle";
import Echart from "../components/chart/EChart";
import ava5 from "../assets/images/logo-jira.svg";
export default class HomeClass extends Component{
  constructor(props){
    super(props);
    this.retrieveGorev=this.retrieveGorev.bind(true);
    this.refreshList=this.refreshList.bind(true);
    this.setActiveGorev=this.setActiveGorev.bind(true);
    this.radioRef = React.createRef();
    this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    this.onChangeGorevAdi=this.onChangeGorevAdi.bind(this);
    this.onChangeAciklama=this.onChangeAciklama.bind(this);
    this.onChangeTarih=this.onChangeTarih.bind(this);
    this.onChangeSaat=this.onChangeSaat.bind(this);
    this.saveGorev = this.saveGorev.bind(this);
    this.newGorev=this.newGorev.bind(this);
    this.state={
      gorevList:[],
      currentGorev:null,
      currentIndex:-1,
      clicked:false,
      checked: false,
      id:null,
      user_id:1,
      gorevAdi:"",
      aciklama:"",
      tarih:"",
      saat:"",

      submitted:false
    };
  }
  handleChangeCheckBox() {
    this.setState({checked : !this.state.checked});
  }
  handleClick=()=>{
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }
  componentDidMount(){
    this.retrieveGorev();
  }
  retrieveGorev(){
    GorevDataService.getAll().then(response =>{
      this.setState({
        gorevList:response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
  }
  refreshList(){
    this.retrieveGorev();
    this.setState({
      currentGorev:null,
      currentIndex:-1
    });
  }
  setActiveGorev(gorev,index){
    this.setState({
      currentGorev:gorev,
      currentIndex:index
    });
  }
  onChangeGorevAdi(e){
    this.setState({
      gorevAdi:e.target.value
    });
  }
  onChangeAciklama(e){
    this.setState({
      aciklama:e.target.value
    });
  }
  onChangeTarih(e){
    this.setState({
      tarih:e.target.value
    });
  }
  onChangeSaat(e){
    this.setState({
      saat:e.target.value
    });
  }
  saveGorev(){
    var data = {
      gorevAdi: this.state.gorevAdi,
      aciklama: this.state.aciklama,
      tarih: this.state.tarih,
      saat: this.state.saat,
    };
    GorevDataService.create(data)
      .then(response => {
        this.setState({
          id:response.data.id,
          gorevAdi:response.data.gorevAdi,
          aciklama:response.data.aciklama,
          tarih:response.data.tarih,
          saat:response.data.saat,

          submitted :true
        });
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });

    
  }
  newGorev(){
    this.setState({
      id: null,
      gorevAdi:"",
      aciklama:"",
      tarih:"",
      saat:"",
      oncelik:false,

      submitted: false
        
    });
  };
  render(){
    const {clicked}=this.state;
    const { Title, Text } = Typography;
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
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
  const checkbtn = [
    <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
      fill="#000"
    />
  </svg>
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
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const list = [
    {
      img: ava5,
      Title: "Ders çalış",
      time : "05/03/2024 8:57",
      progress: "Tamamlandı",
      buton:(
        <>
          <Col xs={20} md={20} className="d-flex">
          <Btn
            onEdit={this.handleClick}
          ></Btn>
        </Col>
        </>
      ),
    },
    {
      img: ava5,
      Title: "Kursa git",
      time : "05/03/2024 8:57",
      progress: "Tamamlammadı",
      buton:(
        <>
        <Col xs={20} md={20} className="d-flex">
          <Btn
            onEdit={this.handleClick}
          ></Btn>
        </Col>
        </>
      ),
    },
    {
      img: ava5,
      Title: "staja başvur",
      time : "05/03/2024 8:57",
      progress: "Tamamlandı",
      buton:(
        <>
        <Col xs={20} md={20} className="d-flex">
          <Btn
            onEdit={this.handleClick}
          ></Btn>
        </Col>
        </>
      ),
    },
    {
      img: ava5,
      Title: "spora git",
      time : "05/03/2024 8:57",
      progress: "Tamamlanmadı",
      buton:(
        <>
        <Col xs={20} md={20} className="d-flex">
          <Btn
            onEdit={this.handleClick}
          ></Btn>
        </Col>
        </>
      ),
    },
    {
      img: ava5,
      Title: "markete git",
      time : "05/03/2024 8:57",
      progress: "Tamamlandı",
      buton:(
        <>
        <Col xs={20} md={20} className="d-flex">
          <Btn
            onEdit={this.handleClick}
          ></Btn>
        </Col>
        </>
      ),
      
    },

    {
      img: ava5,
      Title: "okula git",
      time : "05/03/2024 8:57",
      progress: "Tamamlandı",
      buton:(
        <>
        <Col xs={20} md={20} className="d-flex">
          <Btn
            onEdit={this.handleClick}
          ></Btn>
        </Col>
        </>
      ),
    },
  ];

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
  const timelineList = [
    {
      title: "Ders çalış",
      time: "05/03/2024 8:57",
      color: "green",
    },
    {
      title: "Kursa git",
      time: "05/03/2024 8:57",
      color: "green",
    },
    {
      title: "staja başvur",
      time: "05/03/2024 8:57",
    },
    {
      title: "spora git",
      time: "05/03/2024 8:57",
    },
    {
      title: "markete git",
      time: "05/03/2024 8:57",
    },
    {
      title: "okula git",
      time: "05/03/2024 8:57",
      color: "gray",
    },
  ];
    return(
      <>
        <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Görev Listesi</Title>
                  <Paragraph className="lastweek">
                    Bu ay toplam başarı <span className="blue">40%</span>
                  </Paragraph>
                </div>
                
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  <thead>
                    <tr>
                      <th>GÖREVLER</th>
                      <th>SON TARİH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((d, index) => (
                      <tr key={index}>
                        <td>
                          <h6>
                            <img
                              src={d.img}
                              alt=""
                              className="avatar-sm mr-10"
                            />{" "}
                            {d.Title}
                          </h6>
                        </td>
                        <td>{d.time}</td>
                        <td>
                          <span className="text-xs font-weight-bold">
                            {d.bud}{" "}
                          </span>
                        </td>
                        <td>
                          <div className="percent-progress">{d.progress}</div>
                        </td>
                        <td>
                          <div className="percent-progress">{d.buton}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="uploadfile pb-15 shadow-none">
                
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                    onClick={this.handleClick}
                  >
                    Görev Ekle
                  </Button>
              </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
          {clicked && 
            <div>
              {this.state.submitted ? (
                <p>you submitted successfully!</p>
              ) : (
                <Card>
                    <div>
                    <form className="mt-4">
                      <Row>
                        <Col md={12}>
                          <label htmlFor="gorevAdi" style={{ marginRight: '20px' }}>Görev adı :</label>
                          <input 
                            type="text"
                            className="form-control"
                            id="gorevAdi"
                            required
                            value={this.state.gorevAdi}
                            onChange={this.onChangeGorevAdi}
                            name="gorevAdi"
                          />
                        </Col>
                        <Col md={12}>
                          <label htmlFor="aciklama" style={{ marginRight: '20px' }} >Açıklama :</label>
                          <input 
                            type="text"
                            className="form-control"
                            id="aciklama"
                            required
                            value={this.state.aciklama}
                            onChange={this.onChangeAciklama}
                            name="aciklama"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <label htmlFor="tarih" style={{ marginRight: '50px' , marginTop:'20px'}}>Tarih :</label>
                          <input 
                            type="text"
                            className="form-control"
                            id="tarih"
                            required
                            value={this.state.tarih}
                            onChange={this.onChangeTarih}
                            name="tarih"
                          />
                        </Col>
                        <Col md={12}>
                          <label style={{ marginRight: '50px', marginTop:'20px' }} >Saat :</label>
                          <input 
                            type="text"
                            className="form-control"
                            id="saat"
                            required
                            value={this.state.saat}
                            onChange={this.onChangeSaat}
                            name="saat"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <button onClick={this.saveGorev} className="btn btn-success"></button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                  </Card>
              )}
            </div>
                  }
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5} >Yaklaşan Görevler</Title>
                <Paragraph></Paragraph>
                <Timeline
                  className="timelinelist"
                >
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
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
        </Row>            
      </div>
      </>
    )
  
}
}
