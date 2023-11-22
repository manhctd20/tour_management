import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from "../../../Services/booking/bookingSlide";
import TableReport from '../../../components/Common/TableReport';

const columns=[
	{
		title: "Khách hàng",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Số điện thoại",
		dataIndex: "phone",
		key: "phone",
	},
	{
		title: "Số người",
		dataIndex: "guestSize",
		key: "guestSize",
	},
	{
		title: "Tên tour",
		dataIndex: "tourName",
		key: "tourName",
	},
	{
		title: "Ngày đi",
		dataIndex: "bookAt",
		key: "bookAt",
		render: (date) => {
			return new Date(date).toLocaleDateString();
		},
	},
	{
		title: "Tổng tiền",
		dataIndex: "totalAmount",
		key: "totalAmount",
		render: (totalAmount) => (
			<span>
				{new Intl.NumberFormat().format(totalAmount)}đ
			</span>
		),
	},
];

export default function TableDashboard() {
	const dispatch = useDispatch();

	const { isLoading, bookings } = useSelector((state) => state.booking);
	const bookingRecents = bookings?.slice(0, 3);
	useEffect(() => {
		dispatch(getBookings());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<TableReport
				className="dashboard"
				columns={columns}
				loading={isLoading}
				dataSource={bookingRecents}
				pagination={false}
				isShowPagination={true}
			/>
		</>
	);
}
