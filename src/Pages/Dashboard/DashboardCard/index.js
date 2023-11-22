import { Card, Space, Statistic } from 'antd';
import React from 'react'

export default function DashboardCard({ title, value, icon }) {
	return (
		<Card style={{minWidth: '300px', width: 'auto'}}>
			<Space direction='horizontal'>
				{icon}
				<Statistic title={title} value={value} />
			</Space>
		</Card>
	);
}