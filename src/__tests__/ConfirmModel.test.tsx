// src/components/ConfirmModal.test.tsx
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmModal from '../components/ConfirmDeleteModal';

describe('ConfirmModal Component', () => {
	const onClose = jest.fn();
	const onConfirm = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders correctly when show is true', () => {
		render(
			<ConfirmModal
				show={true}
				onClose={onClose}
				onConfirm={onConfirm}
				productName="Test Product"
			/>
		);

		// Verifica que el mensaje está presente en el documento
		expect(
			screen.getByText('¿Estás seguro de eliminar el producto Test Product?')
		).toBeInTheDocument();

		// Verifica que los botones están presentes
		expect(screen.getByText('Cancelar')).toBeInTheDocument();
		expect(screen.getByText('Confirmar')).toBeInTheDocument();
	});

	test('does not render when show is false', () => {
		render(
			<ConfirmModal
				show={false}
				onClose={onClose}
				onConfirm={onConfirm}
				productName="Test Product"
			/>
		);

		// Verifica que el mensaje no está presente en el documento
		expect(
			screen.queryByText('¿Estás seguro de eliminar el producto Test Product?')
		).not.toBeInTheDocument();
	});

	test('calls onClose when Cancelar button is clicked', () => {
		render(
			<ConfirmModal
				show={true}
				onClose={onClose}
				onConfirm={onConfirm}
				productName="Test Product"
			/>
		);

		// Simula el clic en el botón "Cancelar"
		fireEvent.click(screen.getByText('Cancelar'));

		// Verifica que se llamó a la función onClose
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	test('calls onConfirm when Confirmar button is clicked', () => {
		render(
			<ConfirmModal
				show={true}
				onClose={onClose}
				onConfirm={onConfirm}
				productName="Test Product"
			/>
		);

		// Simula el clic en el botón "Confirmar"
		fireEvent.click(screen.getByText('Confirmar'));

		// Verifica que se llamó a la función onConfirm
		expect(onConfirm).toHaveBeenCalledTimes(1);
	});
});
