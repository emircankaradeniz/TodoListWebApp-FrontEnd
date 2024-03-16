import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const ModalFormGörevEkle = ({ isOpen,toggle ,closeModal}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      placeholder="Tarih Seç"
      style={{
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    />
  );
  return (
    <Modal size='lg' isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Popup</ModalHeader>
      <ModalBody>
        <form>
          <Row>
            <Col lg={12}>
              <div>
                <label>Görev</label>
                <input type="text" className="form-control" placeholder="Görev gir" />
              </div>
            </Col>
            <Col lg={12}>
              <div>
                <label>Açıklama</label>
                <input type="text" className="form-control" placeholder="Açıklama gir" />
              </div>
            </Col>
            <Col lg={12}>
              <div>
                <label htmlFor="email">Tarih2</label>
                <DatePicker
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
                  />}
                />
              </div>
            </Col>
          </Row>
          <button 
            // onClick={()=> window.location.reload()}
            type="submit" 
            className="btn mt-3" 
            style={{ backgroundColor: "#0b3629", color: "white" }}
        >
        Kaydet
      </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalFormGörevEkle;
