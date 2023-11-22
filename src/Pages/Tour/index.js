import { Button, Image, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalView from "../../components/Common/ModalView";
import TableReport from "../../components/Common/TableReport";
import "./style.scss";
import {
  deleteTour,
  getTours,
  resetState,
} from "../../Services/tour/tourSlice";

function Inventory() {
  const [open, setOpen] = useState(false);
  const [tourId, setTourId] = useState("");
  const dispatch = useDispatch();

  const {tours, isLoading } = useSelector((state) => state.tour);

  const calculateAvgRating = (reviews) => {
    const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
    const avgRating =
      totalRating === 0
        ? ""
        : totalRating === 1
        ? totalRating
        : (totalRating / reviews?.length).toFixed(1);
    return avgRating;
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteATour = (id) => {
    dispatch(deleteTour(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getTours());
    }, 200);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getTours());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "photo",
      render: (link) => {
        return <Image width={100} src={link} />;
      },
    },
    {
      title: "Tours",
      dataIndex: "title",
    },
    {
      title: "Giá/người",
      dataIndex: "price",
      render: (value) => (
        <span>{new Intl.NumberFormat().format(value)}đ</span>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "reviews",
      render: (reviews) => {
        return (
          <Rate value={calculateAvgRating(reviews)} allowHalf disabled />
        );
      },
    },

    {
      title: "Khoảng cách",
      dataIndex: "distance",
      render: (distance) => {
        return <p>{distance} km</p>;
      },
    },
    {
      title: "Số người",
      dataIndex: "maxGroupSize",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Button
              type="primary"
              danger
              onClick={() => {
                setOpen(true);
                setTourId(_id);
              }}
            >
              Xóa
            </Button>{" "}
            <Link to={`/admin/tours/edit/${_id}`}>
              <Button type="primary" style={{ backgroundColor: "green" }}>
                Sửa
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Tours</Typography.Title>
      <Link style={{display: "flex", justifyContent: 'flex-end'}} to="/admin/tours/add">
        <Button type="primary">Thêm mới</Button>
      </Link>
      <TableReport
        dataSource={tours}
        pagination={false}
        loading={isLoading}
        columns={columns}
      />
      <ModalView
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteATour(tourId);
        }}
        title="Bạn chắc chắn muốn xóa tour này?"
      />
    </Space>
  );
}
export default Inventory;
