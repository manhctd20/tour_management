import React, { useEffect } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Services/auth/authSlide";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.auth.user);
	const onFinish = (values) => {
		dispatch(login(values));
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	useEffect(() => {
		if (userInfo !== null && userInfo.role === "admin") {
			navigate("/admin");
		} else {
			navigate("/");
		}
	}, [userInfo, navigate]);
	return (
		<div className='auth'>
			<div className='wrapper'>
				<Typography.Title className='auth-title'>
					Đăng nhập
				</Typography.Title>
				<Form
					className='auth-form'
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: "Vui lòng nhập email!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Mật khẩu'
						name='password'
						rules={[
							{
								required: true,
								message: "Vui lòng nhập mật khẩu!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type='primary' htmlType='submit'>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
