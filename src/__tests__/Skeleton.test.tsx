/* eslint-disable testing-library/no-node-access */
import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeleton from '../components/Skeleton';

describe('Skeleton Component', () => {
	test('renders line skeleton correctly', () => {
		const {container} = render(
			<Skeleton type="line" width="100px" height="20px" />
		);

		const skeletonElement = container.firstChild;

		// Verifica que el elemento tenga la clase correcta
		expect(skeletonElement).toHaveClass('skeleton');
		expect(skeletonElement).toHaveClass('skeleton-line');

		// Verifica que el estilo tenga el ancho y alto correcto
		expect(skeletonElement).toHaveStyle({width: '100px', height: '20px'});
	});

	test('renders circle skeleton correctly', () => {
		const {container} = render(
			<Skeleton type="circle" width="50px" height="50px" />
		);

		const skeletonElement = container.firstChild;

		// Verifica que el elemento tenga la clase correcta
		expect(skeletonElement).toHaveClass('skeleton');
		expect(skeletonElement).toHaveClass('skeleton-circle');

		// Verifica que el estilo tenga el ancho y alto correcto
		expect(skeletonElement).toHaveStyle({width: '50px', height: '50px'});
	});

	test('renders with default size if width and height are not provided', () => {
		const {container} = render(<Skeleton type="line" />);

		const skeletonElement = container.firstChild;

		// Verifica que el elemento tenga la clase correcta
		expect(skeletonElement).toHaveClass('skeleton');
		expect(skeletonElement).toHaveClass('skeleton-line');

		// Verifica que el estilo tenga los valores por defecto
		expect(skeletonElement).toHaveStyle({width: '', height: ''});
	});
});
