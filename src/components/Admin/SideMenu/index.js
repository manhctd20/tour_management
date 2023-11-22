import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        className="SideMenuVertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/admin",
          },
          {
            label: "Tours",
            key: "/admin/tours",
            icon: <ShopOutlined />,
          },
          {
            label: "Booking",
            key: "/admin/booking",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Tài khoản",
            key: "/admin/account",
            icon: <UserOutlined />,
          },
        ]}
      />
    </div>
  );
}
export default SideMenu;
