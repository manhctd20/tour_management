import { Space, Table, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../Services/booking/bookingSlide";
import TableReport from "../../components/Common/TableReport";


const columns=[
	{
		title: "Khách hàng",
		dataIndex: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Số điện thoại",
		dataIndex: "phone",
	},
	{
		title: "Số người",
		dataIndex: "guestSize",
	},
	{
		title: "Tên tour",
		dataIndex: "tourName",
	},
	{
		title: "Ngày đi",
		dataIndex: "bookAt",
		render: (date) => {
			return new Date(date).toLocaleDateString();
		},
	},
	{
		title: "Tổng tiền",
		dataIndex: "totalAmount",
		render: (totalAmount) => (
			<span>
				{new Intl.NumberFormat().format(totalAmount)}đ
			</span>
		),
	},
];

function Orders() {
	const dispatch = useDispatch();

	const { isLoading, bookings } = useSelector((state) => state.booking);
	useEffect(() => {
		dispatch(getBookings());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Space size={20} direction='vertical'>
			<Typography.Title level={4}>Booking</Typography.Title>
			<TableReport
				loading={isLoading}
				columns={columns}
				dataSource={bookings}
				pagination={false}
				isShowPagination={true}
			></TableReport>
		</Space>
	);
}
export default Orders;
