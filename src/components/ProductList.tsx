import React, {useEffect, useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductList.css';
import Notification from './Notification';
import ConfirmModal from './ConfirmDeleteModal';
import Skeleton from './Skeleton';
import api from '../api/api';

export interface Product {
	id: string;
	name: string;
	description: string;
	logo: string;
	date_release: string;
	date_revision: string;
}

const ProductList: React.FC = React.memo(() => {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [resultCount, setResultCount] = useState(5);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [notification, setNotification] = useState<{
		message: string;
		type: 'success' | 'error';
		notificationKey: string;
	} | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [productToDelete, setProductToDelete] = useState<Product | null>(null);

	const navigate = useNavigate();
	const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get('/products');
				if (Array.isArray(response.data.data)) {
					setProducts(response.data.data);
				} else {
					console.error('Expected an array but got:', response.data.data);
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					setNotification({
						message: 'Error en el backend: Habilitar CORS',
						type: 'error',
						notificationKey: new Date().toISOString()
					});
				} else {
					console.error('Error fetching products:', error);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (activeDropdown) {
				const dropdown = dropdownRefs.current.get(activeDropdown);
				if (dropdown && !dropdown.contains(event.target as Node)) {
					setActiveDropdown(null);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [activeDropdown]);

	const filteredProducts = Array.isArray(products)
		? products.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

	const handleDelete = async (id: string) => {
		try {
			api
				.delete(`/products/${id}`)
				.then((response) => {
					console.log(response);

					setProducts((prevProducts) =>
						prevProducts.filter((product) => product.id !== id)
					);
					setActiveDropdown(null);
					setNotification({
						message: response.data.message,
						type: 'success',
						notificationKey: new Date().toISOString()
					});
				})
				.catch((err) => {
					console.error('Error deleting product:', err);
					setNotification({
						message: 'Error al eliminar el producto',
						type: 'error',
						notificationKey: new Date().toISOString()
					});
				});
		} catch (error) {
			console.error('Error deleting product:', error);
			setNotification({
				message: 'Error al eliminar el producto',
				type: 'error',
				notificationKey: new Date().toISOString()
			});
		}
		setShowModal(false);
		setProductToDelete(null);
		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};
	const handleImageError = (
		event: React.SyntheticEvent<HTMLImageElement, Event>,
		name: string
	) => {
		const target = event.target as HTMLImageElement;
		target.style.display = 'none';
		const placeholder = document.createElement('div');
		placeholder.className = 'image-placeholder';
		placeholder.innerText = name.charAt(0);
		target.parentNode?.appendChild(placeholder);
	};
	const handleEdit = (id: string) => {
		navigate(`/edit-product/${id}`);
	};

	const toggleDropdown = (id: string) => {
		setActiveDropdown(activeDropdown === id ? null : id);
	};

	const openModal = (product: Product) => {
		setProductToDelete(product);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setProductToDelete(null);
	};
	return (
		<div className="product-list">
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					notificationKey={notification.notificationKey}
				/>
			)}
			<ConfirmModal
				show={showModal}
				onClose={closeModal}
				onConfirm={() => handleDelete(productToDelete?.id || '')}
				productName={productToDelete?.name || ''}
			/>
			<div className="actions">
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Link to="/add-product">
					<button>Agregar</button>
				</Link>
			</div>
			<div className="table-wrapper">
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th className="logo-column">Logo</th>
								<th className="name-column">Nombre del producto</th>
								<th className="description-column">
									Descripción{' '}
									<span
										className="info-icon"
										data-tooltip="Descripción del producto"
									>
										ℹ
									</span>
								</th>
								<th className="release-date-column">
									Fecha de liberación{' '}
									<span
										className="info-icon"
										data-tooltip="Fecha en que el producto fue liberado"
									>
										ℹ
									</span>
								</th>
								<th className="restructure-date-column">
									Fecha de reestructuración{' '}
									<span
										className="info-icon"
										data-tooltip="Fecha en que el producto será reestructurado"
									>
										ℹ
									</span>
								</th>
								<th className="actions-column"> </th>
							</tr>
						</thead>
						<tbody>
							{loading
								? Array.from({length: 5}).map((_, index) => (
										<tr key={index}>
											<td>
												<Skeleton type="circle" />
											</td>
											<td>
												<Skeleton type="line" width="80%" />
											</td>
											<td>
												<Skeleton type="line" width="90%" />
											</td>
											<td>
												<Skeleton type="line" width="70%" />
											</td>
											<td>
												<Skeleton type="line" width="70%" />
											</td>
											<td>
												<Skeleton type="line" width="30%" />
											</td>
										</tr>
								  ))
								: filteredProducts.slice(0, resultCount).map((product) => (
										<tr key={product.id}>
											<td className="logo-column">
												<div className="image-container">
													<img
														src={product.logo}
														alt={product.name}
														className="product-logo"
														onError={(e) => handleImageError(e, product.name)}
													/>
												</div>
											</td>
											<td className="name-column">{product.name}</td>
											<td className="description-column">
												{product.description}
											</td>
											<td className="release-date-column">
												{product.date_release}
											</td>
											<td className="restructure-date-column">
												{product.date_revision}
											</td>
											<td className="actions-column">
												<div
													className="dropdown"
													ref={(el) => {
														if (el) {
															dropdownRefs.current.set(product.id, el);
														} else {
															dropdownRefs.current.delete(product.id);
														}
													}}
												>
													<button
														className="dropbtn"
														onClick={() => toggleDropdown(product.id)}
													>
														⋮
													</button>
													{activeDropdown === product.id && (
														<div
															id={`dropdown-${product.id}`}
															className="dropdown-content show"
														>
															<button onClick={() => handleEdit(product.id)}>
																Editar
															</button>
															<button onClick={() => openModal(product)}>
																Eliminar
															</button>
														</div>
													)}
												</div>
											</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
				<div className="result">
					<label htmlFor="resultCountSelect">
						{filteredProducts.length} Resultados
					</label>
					<select
						id="resultCountSelect"
						value={resultCount.toString()}
						onChange={(e) => setResultCount(Number(e.target.value))}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
				</div>
			</div>
		</div>
	);
});

export default ProductList;
