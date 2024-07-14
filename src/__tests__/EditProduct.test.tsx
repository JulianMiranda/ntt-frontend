import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import EditProduct from '../pages/EditProduct';

jest.mock('../components/ProductForm', () => ({id}: {id: string}) => (
	<div data-testid="product-form">{`Product Form for ID: ${id}`}</div>
));

describe('EditProduct', () => {
	test('renders ProductForm with the correct id', () => {
		const testId = '12345';

		render(
			<MemoryRouter initialEntries={[`/edit-product/${testId}`]}>
				<Routes>
					<Route path="/edit-product/:id" element={<EditProduct />} />
				</Routes>
			</MemoryRouter>
		);

		// Verifica que el componente ProductForm se ha renderizado con el id correcto
		const productFormElement = screen.getByTestId('product-form');
		expect(productFormElement).toBeInTheDocument();
		expect(productFormElement).toHaveTextContent(
			`Product Form for ID: ${testId}`
		);
	});
});
