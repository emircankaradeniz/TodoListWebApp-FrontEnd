import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  message,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UserService from "../services/UserService";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/blank-profile-picture.png";

function Profile() {
  const [profileInfo, setProfileInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await UserService.getYourProfile(token);
        setProfileInfo(response.ourUsers); // Profil bilgilerini state'e kaydediyoruz
    } catch (error) {
        console.error("Error fetching profile information:", error);
        message.error("Failed to fetch profile information.");
    }
};


  const handleUpdate = async (values) => {
    try {
        const token = localStorage.getItem("token"); // Token'ı al
        const userId = profileInfo.id; // Kullanıcı ID'si
        await UserService.updateUser(userId, values, token); // Backend'e istekte bulun
        message.success("Profile updated successfully!"); // Başarı mesajı
        fetchProfileInfo(); // Profili yeniden yükle
    } catch (error) {
        console.error("Error updating profile:", error); // Hata log'u
        message.error("Failed to update profile."); // Kullanıcıya hata mesajı
    }
};


const handleAvatarChange = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
      form.setFieldsValue({ avatar: e.target.result.split(",")[1] }); // Base64 string
  };
  reader.readAsDataURL(file);
  return false; // Dosyanın otomatik yüklenmesini engelle
};



  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
              <Avatar
                    size={74}
                    shape="square"
                    src={
                        profileInfo.avatarBase64
                            ? `data:image/jpeg;base64,${profileInfo.avatarBase64}`
                            : profilavatar // Eğer avatar yoksa varsayılan görsel gösterilir
                    }
                />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {profileInfo.name || "User Name"}
                  </h4>
                  <p>{profileInfo.role || "Role"}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button type="link" onClick={() => setIsModalVisible(true)}>
                Edit Profile
              </Button>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={48} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              <Descriptions.Item label="Full Name" span={3}>
                {profileInfo.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {profileInfo.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {profileInfo.city || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Role" span={3}>
                {profileInfo.role || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Profil Güncelleme Modalı */}
      <Modal
          title="Update Profile"
          visible={isModalVisible}
          onOk={() => form.submit()}
          onCancel={() => setIsModalVisible(false)}
      >
          <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
              initialValues={{
                  name: profileInfo.name,
                  email: profileInfo.email,
                  city: profileInfo.city,
              }}
          >
              <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                  <Input />
              </Form.Item>
              <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter your city' }]}>
                  <Input />
              </Form.Item>
              <Form.Item name="avatar" label="Avatar">
                  <Upload beforeUpload={handleAvatarChange} listType="picture" maxCount={1}>
                      <Button>Upload Avatar</Button>
                  </Upload>
              </Form.Item>

          </Form>
      </Modal>

    </>
  );
}

export default Profile;
