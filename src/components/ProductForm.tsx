import React, {useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import {useFormValidations} from '../hooks/useFormValidations';
import Notification from './Notification';
import '../styles/ProductForm.css';
import {Product} from './ProductList';

interface ProductFormProps {
	id?: string;
}

interface IFormInputs {
	id: string;
	name: string;
	description: string;
	logo: string;
	releaseDate: string;
	reviewDate: string;
}

const ProductForm: React.FC<ProductFormProps> = ({id}) => {
	const [product, setProduct] = useState<Product>({
		id: '',
		name: '',
		description: '',
		logo: '',
		date_release: '',
		date_revision: ''
	});
	const {checkIdExists, validateReleaseDate, validateReviewDate} =
		useFormValidations();
	const {
		register,
		handleSubmit,
		formState: {errors, isValid, isDirty},
		setValue,
		watch,
		reset,
		resetField
	} = useForm<IFormInputs>({
		mode: 'onBlur',
		criteriaMode: 'all'
	});
	const [responseMessage, setResponseMessage] = useState<string | null>(null);
	const [showNotification, setShowNotification] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (id) {
			setIsEditing(true);
			axios
				.get(`http://localhost:3002/bp/products/${id}`)
				.then((response) => {
					const productData = response.data;
					setProduct({
						id: productData.id,
						name: productData.name,
						description: productData.description,
						logo: productData.logo,
						date_release: productData.date_release,
						date_revision: productData.date_revision
					});
					setValue('id', productData.id);
					setValue('name', productData.name);
					setValue('description', productData.description);
					setValue('logo', productData.logo);
					setValue('releaseDate', productData.date_release);
					setValue('reviewDate', productData.date_revision);
				})
				.catch((error) => {
					console.error('Error fetching product:', error);
				});
		}
	}, [id, setValue]);

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		const body = {
			id: data.id,
			name: data.name,
			description: data.description,
			logo: data.logo,
			date_release: data.releaseDate,
			date_revision: data.reviewDate
		};

		try {
			if (isEditing) {
				const response = await axios.put(
					`http://localhost:3002/bp/products/${id}`,
					body,
					{headers: {'Content-Type': 'application/json'}}
				);
				setResponseMessage(response.data.message);
			} else {
				const response = await axios.post(
					'http://localhost:3002/bp/products',
					body,
					{headers: {'Content-Type': 'application/json'}}
				);
				setResponseMessage(response.data.message);
				reset();
			}
			setShowNotification(true);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error response from server:', error.response?.data);
				setResponseMessage(
					error.response?.data.message || 'Error al enviar el formulario'
				);
			} else {
				setResponseMessage('Error desconocido');
			}
			setShowNotification(true);
		}
	};

	const releaseDate = watch('releaseDate');

	useEffect(() => {
		if (releaseDate) {
			const releaseDateValue = new Date(releaseDate);
			if (!isNaN(releaseDateValue.getTime())) {
				const reviewDate = new Date(releaseDateValue);
				reviewDate.setFullYear(reviewDate.getFullYear() + 1);
				setValue('reviewDate', reviewDate.toISOString().split('T')[0]);
			} else {
				setValue('reviewDate', '');
			}
		} else {
			setValue('reviewDate', '');
		}
	}, [releaseDate, setValue]);

	useEffect(() => {
		if (showNotification) {
			const timer = setTimeout(() => {
				setShowNotification(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [showNotification]);

	const handleReset = () => {
		if (isEditing) {
			resetField('name');
			resetField('description');
			resetField('logo');
			resetField('releaseDate');
			resetField('reviewDate');
		} else {
			reset();
		}
	};

	return (
		<div className="product-form-container">
			{showNotification && responseMessage && (
				<Notification
					message={responseMessage}
					type={responseMessage.includes('successfully') ? 'success' : 'error'}
					key={new Date().toISOString()}
				/>
			)}
			<div className="product-form-header">
				<h1>{isEditing ? 'Editar Producto' : 'Formulario de Registro'}</h1>
			</div>
			<form className="product-form" onSubmit={handleSubmit(onSubmit)}>
				<div className={errors.id ? 'error' : ''}>
					<label htmlFor="id">ID</label>
					<input
						type="text"
						id="id"
						{...register('id', {
							required: 'ID es requerido',
							minLength: {
								value: 3,
								message: 'ID debe tener al menos 3 caracteres'
							},
							maxLength: {
								value: 10,
								message: 'ID no puede tener más de 10 caracteres'
							},
							validate: isEditing ? undefined : checkIdExists
						})}
						disabled={isEditing}
					/>
					{errors.id && <p className="error-message">{errors.id.message}</p>}
				</div>
				<div className={errors.name ? 'error' : ''}>
					<label htmlFor="name">Nombre</label>
					<input
						type="text"
						id="name"
						{...register('name', {
							required: 'Nombre es requerido',
							minLength: {
								value: 5,
								message: 'Nombre debe tener al menos 5 caracteres'
							},
							maxLength: {
								value: 100,
								message: 'Nombre no puede tener más de 100 caracteres'
							}
						})}
					/>
					{errors.name && (
						<p className="error-message">{errors.name.message}</p>
					)}
				</div>
				<div className={errors.description ? 'error' : ''}>
					<label htmlFor="description">Descripción</label>
					<input
						type="text"
						id="description"
						{...register('description', {
							required: 'Descripción es requerida',
							minLength: {
								value: 10,
								message: 'Descripción debe tener al menos 10 caracteres'
							},
							maxLength: {
								value: 200,
								message: 'Descripción no puede tener más de 200 caracteres'
							}
						})}
					/>
					{errors.description && (
						<p className="error-message">{errors.description.message}</p>
					)}
				</div>
				<div className={errors.logo ? 'error' : ''}>
					<label htmlFor="logo">Logo</label>
					<input
						type="text"
						id="logo"
						{...register('logo', {
							required: 'Logo es requerido'
						})}
					/>
					{errors.logo && (
						<p className="error-message">{errors.logo.message}</p>
					)}
				</div>
				<div className={errors.releaseDate ? 'error' : ''}>
					<label htmlFor="releaseDate">Fecha de Liberación</label>
					<input
						type="date"
						id="releaseDate"
						{...register('releaseDate', {
							required: 'Fecha de Liberación es requerida',
							validate: validateReleaseDate
						})}
					/>
					{errors.releaseDate && (
						<p className="error-message">{errors.releaseDate.message}</p>
					)}
				</div>
				<div className={errors.reviewDate ? 'error' : ''}>
					<label htmlFor="reviewDate">Fecha de Revisión</label>
					<input
						type="date"
						id="reviewDate"
						{...register('reviewDate', {
							required: 'Fecha de Revisión es requerida',
							validate: (value) => validateReviewDate(releaseDate, value)
						})}
						disabled
					/>
					{errors.reviewDate && (
						<p className="error-message">{errors.reviewDate.message}</p>
					)}
				</div>
				<div className="button-container full-width">
					<button type="button" onClick={handleReset}>
						Reiniciar
					</button>
					<button
						type="submit"
						className={
							isValid && isDirty ? 'submit-button active' : 'submit-button'
						}
					>
						{isEditing ? 'Actualizar' : 'Enviar'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
