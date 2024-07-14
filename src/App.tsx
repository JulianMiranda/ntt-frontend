import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Header from './components/Header';

const App: React.FC = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add-product" element={<AddProduct />} />
				<Route path="/edit-product/:id" element={<EditProduct />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
};

export default App;
