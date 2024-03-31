import React from 'react';
import { Button, Col } from 'antd'; // Örneğin, antd kütüphanesinden gelen butonları kullanıyorsanız

const CustomButton = ({ onEdit, onDelete, onFinish }) => (
  <Col xs={20} md={20} className="d-flex">
    <Button type="primary" onClick={onFinish}>Bitir</Button>
    <Button type="link" danger onClick={onDelete}>DELETE</Button>
    <Button type="link" className="darkbtn" onClick={onEdit}>Düzenle</Button>
  </Col>
);

export default CustomButton;
