import { useEffect, useState } from "react";
import { Card, Skeleton, Modal, Input, Button } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DeleteOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, setEditUser, updateUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";


const { Meta } = Card;

const UserCard = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUserData, setEditedUserData] = useState({}); // Track edited user data
  


  // -------------
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  console.log("setCookie", setCookie)
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  // --------------

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteClick = (userId) => {
    dispatch(deleteUser(userId));
  };


  const handleEditClick = (user) => {
    dispatch(setEditUser(user));
    setIsModalVisible(true);
    setEditedUserData(user); // Set the edited user data when "Edit" is clicked
  };

  const handleCancel = () => {
    dispatch(setEditUser(null));
    setIsModalVisible(false);
    setEditedUserData({}); // Clear the edited user data when the modal is closed
  };

  const handleOk = () => {
    // Dispatch an action to update the user data
    dispatch(updateUser({ id: editedUserData.id, updatedData: editedUserData }));
    setIsModalVisible(false);
    setEditedUserData({}); // Clear the edited user data after updating
  };

  const coverImageSrc =
    "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

  const renderCards = () => {
    if (loading) {
      return <Skeleton active />;
    }

    return users.map((user) => (
      <Card
        key={user.id}
        className="user-card"
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={() => handleEditClick(user)} />,
          <DeleteOutlined key="ellipsis" onClick={() => handleDeleteClick(user.id)}/>,
        ]}
        style={{ width: 300 }}
        cover={<img alt={`${user.name}'s cover`} src={coverImageSrc} />}
      >
        <Meta
          title={user.name}
          description={
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div>
                <MailOutlined /> {user.email}
              </div>
              <div>
                <PhoneOutlined /> Phone: {user.phone}
              </div>
              <div>
                <GlobalOutlined /> Website: {user.website}
              </div>
            </div>
          }
        />
      </Card>
    ));
  };

  return (

    <div>
     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1>User Information List</h1>
        <Button type="primary" onClick={logOut} icon={<LogoutOutlined /> }>
          Logout
        </Button>
      </div>
    <div className="card-container">
      {renderCards()}

      {/* Modal for editing user */}
      {isModalVisible && (
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {/* Fields for editing user */}
          <Input
            style={{ marginBottom: 16 }}
            placeholder="name"
            value={editedUserData.name}
            onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
          />
          <Input
            style={{ marginBottom: 16 }}
            placeholder="email"
            value={editedUserData.email}
            onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
          />
          <Input
            style={{ marginBottom: 16 }}
            placeholder="phone"
            value={editedUserData.phone}
            onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
          />
          <Input
            style={{ marginBottom: 16 }}
            placeholder="website"
            value={editedUserData.website}
            onChange={(e) => setEditedUserData({ ...editedUserData, website: e.target.value })}
          />
        </Modal>
      )}
    </div>
    </div>
  );
};

export default UserCard;
