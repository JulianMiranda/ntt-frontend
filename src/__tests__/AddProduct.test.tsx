import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import AddProduct from '../pages/AddProduct';

jest.mock('../components/ProductForm', () => () => (
	<div data-testid="product-form">Product Form</div>
));

describe('AddProduct', () => {
	test('renders ProductForm', () => {
		render(
			<MemoryRouter initialEntries={['/add-product']}>
				<Routes>
					<Route path="/add-product" element={<AddProduct />} />
				</Routes>
			</MemoryRouter>
		);

		// Verifica que el componente ProductForm se ha renderizado
		const productFormElement = screen.getByTestId('product-form');
		expect(productFormElement).toBeInTheDocument();
		expect(productFormElement).toHaveTextContent('Product Form');
	});
});
