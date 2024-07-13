import {useCallback} from 'react';
import axios from 'axios';
export const useFormValidations = () => {
	const checkIdExists = useCallback(async (value: string) => {
		try {
			if (!value) {
				return;
			}
			const response = await axios.get(
				`http://localhost:3002/bp/products/verification/${value}`
			);
			if (response.status !== 200) {
				throw new Error('Network response was not ok');
			}
			return response.data === true ? 'ID ya existe' : true;
		} catch (error) {
			console.error('Error checking ID:', error);
			return 'Error verificando el ID';
		}
	}, []);

	const validateReleaseDate = useCallback((value: string) => {
		if (!value) {
			return 'Fecha de Liberación es requerida';
		}
		const today = new Date().toISOString().split('T')[0];
		return value >= today || 'Fecha de Liberación no puede ser en el pasado';
	}, []);

	const validateReviewDate = useCallback(
		(releaseDate: string, reviewDate: string) => {
			if (!releaseDate || isNaN(new Date(releaseDate).getTime())) {
				return 'Fecha de Liberación es inválida';
			}
			if (!reviewDate) {
				return 'Fecha de Revisión es requerida';
			}
			const releaseDateValue = new Date(releaseDate);
			const expectedReviewDate = new Date(releaseDateValue);
			expectedReviewDate.setFullYear(expectedReviewDate.getFullYear() + 1);
			const expectedReviewDateString = expectedReviewDate
				.toISOString()
				.split('T')[0];
			return (
				reviewDate === expectedReviewDateString ||
				'Fecha de Revisión debe ser exactamente un año después de la Fecha de Liberación'
			);
		},
		[]
	);

	return {
		checkIdExists,
		validateReleaseDate,
		validateReviewDate
	};
};
