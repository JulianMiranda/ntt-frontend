import React from 'react';
import {useParams} from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const EditProduct: React.FC = () => {
	const {id} = useParams<{id: string}>();

	return (
		<div>
			<ProductForm id={id} />
		</div>
	);
};

export default EditProduct;
