import {
  BookOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Space, Typography } from "antd";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Services/auth/authSlide";
import { getBookings } from "../../Services/booking/bookingSlide";
import { getTours } from "../../Services/tour/tourSlice";
import DashboardCard from "./DashboardCard";
import "./style.scss";
import TableDashboard from "./TableDashboard";

function Dashboard() {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.booking.bookings);
  const tours = useSelector((state) => state.tour.tours);
  const users = useSelector((state) => state.auth.users);

  const total = bookings.reduce(
    (total, bookings) => total + bookings.totalAmount,
    0
  );

  useEffect(() => {
    dispatch(getBookings());
    dispatch(getTours());
    dispatch(getAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard__wrapper">
      <Space size={20} direction="vertical">
        <Typography.Title className="dashboard__title" level={4}>Dashboard</Typography.Title>
        <div className="dashboard__card">
          <DashboardCard
            icon={
              <BookOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Booking"}
            value={bookings?.length}
          />
          <DashboardCard
            icon={
              <EnvironmentOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Tổng tour"}
            value={tours?.length}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Tài khoản"}
            value={users?.length}
          />
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Doanh thu"}
            value={total}
          />
        </div>
      </Space>
	  <Divider/>
      <TableDashboard />
    </div>
  );
}

export default Dashboard;
