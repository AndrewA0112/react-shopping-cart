import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import { ProductContext } from './contexts/ProductContext'
import { CartContext } from './contexts/CartContext'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

	const addItem = item => {
		const todoEntries = JSON.parse(localStorage.getItem('cart')) || [];
		setCart([...cart, item]);
		todoEntries.push(item)
		localStorage.setItem('cart', JSON.stringify(todoEntries))
	};

	const removeItem = id => {
		setCart(cart.filter(item => item.id !== id))
		localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id !== id)))
	};

	return (
		<ProductContext.Provider value={{products, addItem}}>
			<CartContext.Provider value={{cart, removeItem}}>
				<div className="App">
					<Navigation />

					{/* Routes */}
					<Route exact path="/" component={Products} />

					<Route path="/cart" component={ShoppingCart} />
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
