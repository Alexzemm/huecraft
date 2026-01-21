import React from 'react';
import Header from './Header';
import './Cart.css';


// Cart expects: items (array), onRemove (function), onClear (function)
function Cart({ items, onRemove, onClear }) {
		// Helper to count quantities by item id
		const getItemSummary = () => {
			const counts = {};
			items.forEach(item => {
				const key = item.id;
				if (!counts[key]) {
					counts[key] = { ...item, quantity: 0 };
				}
				counts[key].quantity += 1;
			});
			return Object.values(counts);
		};

		// Order summary generator
		const getOrderSummaryText = () => {
			if (items.length === 0) return 'My cart is empty.';
			const orderId = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
			const summaryItems = getItemSummary().map(item => `${item.name} (${item.size}) x${item.quantity} - $${item.price * item.quantity}`);
			const lines = [
				'Order Summary:',
				...summaryItems,
				`Total: $${total}`,
				`Order ID: ${orderId}`
			];
			return lines.join('\n');
		};

		const handleShareWhatsapp = () => {
			const msg = encodeURIComponent(getOrderSummaryText());
			window.open(`https://wa.me/?text=${msg}`, '_blank');
		};
	const total = items.reduce((sum, item) => sum + item.price, 0);
	// WhatsApp message generator
	const getWhatsappMessage = () => {
		if (items.length === 0) return 'My cart is empty.';
		const lines = items.map(item => `${item.name} (${item.size}) - $${item.price}`);
		lines.push(`Total: $${total}`);
		return `Hello, I'd like to order:\n${lines.join('\n')}`;
	};

	const handleWhatsapp = () => {
		const msg = encodeURIComponent(getWhatsappMessage());
		// Replace with your WhatsApp number
		const phone = '1234567890';
		window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
	};

	const handleCheckout = () => {
		// Placeholder: You can add navigation or modal logic here
		alert('Proceeding to checkout...');
	};

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
									<img src={item.img} alt={item.name} className="cart-item-img" />
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
						<button className="cart-checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
						<button className="cart-whatsapp-btn" onClick={handleWhatsapp}>Send to WhatsApp</button>
						<button className="cart-share-btn" onClick={handleShareWhatsapp}>Share on WhatsApp</button>
					</>
				)}
			</aside>
		</>
	);
}

export default Cart;
