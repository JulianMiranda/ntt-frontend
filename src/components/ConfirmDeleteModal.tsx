import React from 'react';
import '../styles/ConfirmModal.css';

interface ConfirmModalProps {
	show: boolean;
	onClose: () => void;
	onConfirm: () => void;
	productName: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	show,
	onClose,
	onConfirm,
	productName
}) => {
	if (!show) {
		return null;
	}

	return (
		<div className="modal-backdrop">
			<div className="modal">
				<p>¿Estás seguro de eliminar el producto {productName}?</p>
				<div className="modal-actions">
					<button className="cancel-button" onClick={onClose}>
						Cancelar
					</button>
					<button className="confirm-button" onClick={onConfirm}>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
