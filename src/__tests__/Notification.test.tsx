/* eslint-disable testing-library/no-node-access */
import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Notification from '../components/Notification';

describe('Notification Component', () => {
	test('renders success message', () => {
		render(
			<Notification
				message="Success message"
				type="success"
				notificationKey="1"
			/>
		);

		// Verifica que el mensaje está presente en el documento
		expect(screen.getByText('Success message')).toBeInTheDocument();

		// Verifica que la notificación tiene la clase correcta
		expect(screen.getByText('Success message').parentElement).toHaveClass(
			'notification success'
		);
	});

	test('renders error message', () => {
		render(
			<Notification message="Error message" type="error" notificationKey="2" />
		);

		// Verifica que el mensaje está presente en el documento
		expect(screen.getByText('Error message')).toBeInTheDocument();

		// Verifica que la notificación tiene la clase correcta
		expect(screen.getByText('Error message').parentElement).toHaveClass(
			'notification error'
		);
	});
});
