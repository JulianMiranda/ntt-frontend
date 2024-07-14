import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
	test('renders header title', () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		const headerTitle = screen.getByText(/BANCO/i);
		expect(headerTitle).toBeInTheDocument();
	});

	test('renders header icon with plus sign', () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		const headerPlus = screen.getByText('+');
		expect(headerPlus).toBeInTheDocument();
	});

	test('renders link to home page', () => {
		const {container} = render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		// eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
		const link = container.querySelector('a.header-logo-link');
		expect(link).toHaveAttribute('href', '/');
	});
});
