import React, { useEffect } from "react";
import {
	Button,
	Checkbox,
	Form,
	Input,
	InputNumber,
	Space,
	Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createTour, getTour, updateTour } from "../Services/tour/tourSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddTour = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const onFinish = (values) => {
		if (id) {
			dispatch(updateTour({ id, ...values }));
		} else {
			dispatch(createTour(values));
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const createdTour = useSelector((state) => state.tour.createTour);
	const updatedTour = useSelector((state) => state.tour.updateTour);
	const tour = useSelector((state) => state.tour.getTour);
	useEffect(() => {
		if (id) {
			dispatch(getTour(id));
		}
	}, [id, dispatch]);
	useEffect(() => {
		if (createdTour || updatedTour) {
			navigate("/admin/tours");
		}
	}, [createdTour, navigate, updatedTour]);
	useEffect(() => {
		if (tour !== undefined) {
			form.setFieldsValue(tour);
		}
	}, [tour, form]);
	return (
		<Space size={20} direction='vertical'>
			<Typography.Title level={4}>
				{id ? "Chỉnh sửa tour" : "Thêm tour"}
			</Typography.Title>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout='horizontal'
				style={{ minWidth: 900 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				form={form}
			>
				<Form.Item label='Tên tour' name='title'>
					<Input />
				</Form.Item>
				<Form.Item label='Giá/người' name='price'>
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item label='Tag' name='featured' valuePropName='checked'>
					<Checkbox>Phổ biến</Checkbox>
				</Form.Item>
				<Form.Item label='Khoảng cách' name='distance'>
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item label='Số người' name='maxGroupSize'>
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
				<Form.Item label='Thành phố' name='city'>
					<Input />
				</Form.Item>
				<Form.Item label='Địa chỉ' name='address'>
					<Input />
				</Form.Item>
				<Form.Item label='Mô tả' name='desc'>
					<Input />
				</Form.Item>
				<Form.Item label='Hình ảnh' name='photo'>
					<Input />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						{id ? "Cập nhật" : "Thêm"}
					</Button>
				</Form.Item>
			</Form>
		</Space>
	);
};

export default AddTour;
