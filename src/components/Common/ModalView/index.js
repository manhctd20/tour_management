import React from "react";
import { Modal } from "antd";

export default function ModalView (props) {
	const { open, hideModal, performAction, title } = props;
	return (
		<Modal
			title='Thông báo'
			open={open}
			onOk={performAction}
			onCancel={hideModal}
			okText='Xác nhận'
			cancelText='Hủy'
		>
			<p>{title}</p>
		</Modal>
	);
};
