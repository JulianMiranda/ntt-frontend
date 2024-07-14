import React from 'react';
import '../styles/Notification.css';

interface NotificationProps {
	message: string;
	type: 'success' | 'error';
	notificationKey: string;
}

const Notification: React.FC<NotificationProps> = ({
	message,
	type,
	notificationKey
}) => {
	return (
		<div className={`notification ${type}`} key={notificationKey}>
			<p>{message}</p>
		</div>
	);
};

export default Notification;
