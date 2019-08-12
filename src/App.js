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
		if(cart.filter(product => product.title === item.title).length === 0){
			setCart([...cart, item]);
			localStorage.setItem('cart', JSON.stringify([...cart, item]))
		} else {
			const currentCart = cart.filter(product => product.id !== item.id)
			const tempObj = cart.filter(product => product.title === item.title)[0]
			setCart([...currentCart, {...tempObj, quantity: tempObj.quantity + 1}])
			localStorage.setItem('cart', JSON.stringify([...currentCart, {...tempObj, quantity: tempObj.quantity + 1}]))
		}
	};

	const removeItem = id => {
		const currentItem = cart.filter(item => item.id === id)[0];
		if(cart.filter(item => item.id === id)[0].quantity > 1){
			const currentCart = cart.filter(product => product.id !== currentItem.id)
			const tempObj = cart.filter(product => product.title === currentItem.title)[0]
			setCart([...currentCart, {...tempObj, quantity: tempObj.quantity - 1}])
			localStorage.setItem('cart', JSON.stringify([...currentCart, {...tempObj, quantity: tempObj.quantity - 1}]))
		} else {
		setCart(cart.filter(item => item.id !== id))
		localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id !== id)))
		}
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
