import { Button, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getAllUser } from "../../Services/auth/authSlide";
import { useDispatch, useSelector } from "react-redux";
import TableReport from "../../components/Common/TableReport";
import ModalView from "../../components/Common/ModalView";

function Customers() {
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const dispatch = useDispatch();

	const { isLoading, users } = useSelector((state) => state.auth);

	const hideModal = () => {
		setOpen(false);
	};

	const deleteAUser = (id) => {
		dispatch(deleteUser(id));
		setOpen(false);
		setTimeout(() => {
			dispatch(getAllUser());
		}, 200);
	};

	useEffect(() => {
		dispatch(getAllUser());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const columns=[
		{
			title: "Họ tên",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Phân loại",
			dataIndex: "role",
		},
		{
			title: "Thao tác",
			dataIndex: "_id",
			render: (_id) => {
				return (
					<>
						<Button
							type='primary'
							danger
							onClick={() => {
								setOpen(true);
								setUserId(_id);
							}}
						>
							Xóa
						</Button>
					</>
				);
			},
		},
	];
	return (
		<Space size={20} direction='vertical'>
			<Typography.Title level={4}>Tài khoản</Typography.Title>
			<TableReport
				loading={isLoading}
				columns={columns}
				dataSource={users}
				pagination={false}
				isShowPagination={true}
			></TableReport>
			<ModalView
				hideModal={hideModal}
				open={open}
				performAction={() => {
					deleteAUser(userId);
				}}
				title='Bạn chắc chắn muốn xóa user này?'
			/>
		</Space>
	);
}
export default Customers;
