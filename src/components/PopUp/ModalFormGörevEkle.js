import React from 'react';
import { Component } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import gorevService from '../../services/gorevService';
import { useState } from 'react';
export default class AddGorev extends React.Component{
  constructor(props){
    super(props);
    this.onChangeGorevAdi=this.onChangeGorevAdi.bind(this);
    this.onChangeAciklama=this.onChangeAciklama.bind(this);
    this.onChangeTarih=this.onChangeTarih.bind(this);
    this.onChangeSaat=this.onChangeSaat.bind(this);
    this.onChangeOncelik=this.onChangeOncelik.bind(this);
    this.saveGorev=this.saveGorev.bind(this);
    this.newGorev=this.newGorev.bind(this);

    this.state={
      id:null,
      gorev_adi:"",
      aciklama:"",
      tarih:"",
      saat:"",
      oncelik:false,

      submitted:false
    }
    
    
  }
  onChangeGorevAdi(e) {
    this.setState({
      gorev_adi: e.target.value
    });
  }
  onChangeAciklama(e){
    this.setState({
      aciklama: e.target.value
    });
  }
  onChangeTarih(e){
    this.setState({
      tarih: e.target.value
    });
  }
  onChangeSaat(e){
    this.setState({
      saat: e.target.value
    });
  }
  onChangeOncelik(e){
    this.setState({
      oncelik: e.target.value
    });
  }
  saveGorev(){
    var data ={
      gorev_adi:this.state.gorev_adi,
      aciklama:this.state.aciklama,
      tarih:this.state.tarih,
      saat:this.state.saat,
      oncelik:this.state.oncelik
    }
    gorevService.create(data).then(response=>{
      this.setState({
        id:response.data.id,
        gorev_adi:response.data.gorev_adi,
        aciklama:response.data.aciklama,
        tarih:response.data.tarih,
        saat:response.data.saat,
        oncelik:response.data.oncelik,

        submitted:true
      });
    }).catch(e=> {
      console.log(e);
    });
  }
  newGorev(){
    this.setState({
      id:null,
      gorev_adi:"",
      aciklama:"",
      tarih:"",
      saat:"",
      oncelik:false,

      submitted:false
    });
  }
  render(){
    const { isOpen, toggle } = this.props;
    // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [saat, setSaat] = useState('');
    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    // };


    // const handleSaatChange = (event) => {
    //   const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // Saat formatı: HH:MM
    //   const newSaat = event.target.value;
    //   if (regex.test(newSaat) || newSaat === '') {
    //     setSaat(newSaat);
    //   }
    // };
    return (
      <Modal size='lg' isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Popup</ModalHeader>
        <ModalBody>
          <div className='submit-form'>
          {this.state.submitted ? (
              <div>
                <h4>kayıt başarılı</h4>
              </div>
            ):(
              <form>
                <Row>
                  <Col lg={12}>
                    <div>
                      <label htmlFor='gorev_adi'>Görev</label>
                      <input 
                      type="text" 
                      className="form-control"
                      id="gorev_adi"
                      required
                      value={this.state.gorev_adi} 
                      onChange={this.onChangeGorevAdi}
                      name="gorev_adi"
                      placeholder="Görev gir" />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div>
                      <label htmlFor='aciklama'>Açıklama</label>
                      <input 
                      type="text" 
                      className="form-control" 
                      id="aciklama"
                      required
                      value={this.state.aciklama}
                      onChange={this.onChangeAciklama}
                      name='aciklama'
                      placeholder="Açıklama gir" />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div>
                      <label htmlFor="tarih">Tarih</label>
                      {/* <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        customInput={<input
                          type="text"
                          placeholder="Tarih Seç"
                          style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                          }}
                          id="tarih"
                          required
                          value={this.state.tarih}
                          onChange={this.onChangeTarih}
                          name='tarih'
                        />}
                      /> */}
                      <input
                          type="text"
                          placeholder="Tarih Seç"
                          style={{
                            padding: '10px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                          }}
                          id="tarih"
                          required
                          value={this.state.tarih}
                          onChange={this.onChangeTarih}
                          name='tarih'
                        />
                    </div>
                  </Col>
                  <Col lg={12}>
                  <div>
                    <label htmlFor="saat">Saat:</label>
                    <input
                      type="text"
                      id="saat"
                      required
                      value={this.state.saat}
                      // onChange={handleSaatChange}
                      onChange={this.onChangeSaat}
                      placeholder="HH:MM"
                    />
                  </div>
                  </Col>
                </Row>
              <button 
                // onClick={()=> window.location.reload()}
                type="submit" 
                className="btn mt-3" 
                onClick={this.saveGorev}
                style={{ backgroundColor: "#0b3629", color: "white" }}
                >
                Kaydet
              </button>
          </form>
            )
            }
          </div>
          
        </ModalBody>
      </Modal>
    );
  }
}



