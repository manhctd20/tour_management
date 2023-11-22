import { Layout, theme } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../Admin/SideMenu";
import Header from "../Header";
const { Content, Footer, Sider } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <SideMenu />
      </Sider>
      <Layout>
        <Header />
        <Content
          style={{
            margin: "10px 20px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
