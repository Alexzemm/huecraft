import React from 'react';
import Header from './Header';
import './Cart.css';


// Cart expects: items (array), onRemove (function), onClear (function)
function Cart({ items, onRemove, onClear }) {
	const total = items.reduce((sum, item) => sum + item.price, 0);
	return (
		<>
			<Header />
			<aside className="cart-root">
				<h2 className="cart-title">Your Cart</h2>
				{items.length === 0 ? (
					<div className="cart-empty">Cart is empty</div>
				) : (
					<>
						<ul className="cart-list">
							{items.map(item => (
								<li key={item.id} className="cart-item">
									<span className="cart-item-name">{item.name} <span className="cart-item-size">({item.size})</span></span>
									<span className="cart-item-price">${item.price}</span>
									<button className="cart-remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
								</li>
							))}
						</ul>
						<div className="cart-total-row">
							<span>Total:</span>
							<span>${total}</span>
						</div>
						<button className="cart-clear-btn" onClick={onClear}>Clear Cart</button>
					</>
				)}
			</aside>
		</>
	);
}

export default Cart;
