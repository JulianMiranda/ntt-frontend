import React from 'react';
import '../styles/Notification.css';

interface NotificationProps {
	message: string;
	type: 'success' | 'error';
	key: string;
}

const Notification: React.FC<NotificationProps> = ({message, type, key}) => {
	return (
		<div className={`notification ${type}`} key={key}>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
