import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from '../pages/Home';

jest.mock('../components/ProductList', () => () => (
	<div data-testid="product-list">Product List</div>
));

describe('Home', () => {
	test('renders ProductList component', () => {
		render(<Home />);

		// Verifica que el componente ProductList se ha renderizado
		const productListElement = screen.getByTestId('product-list');
		expect(productListElement).toBeInTheDocument();
		expect(productListElement).toHaveTextContent('Product List');
	});
});
