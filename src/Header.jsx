import './Header.css'
import cart from './assets/cart.png'

// Add 'showCart' prop to control cart button visibility
function Header({ onCartClick, showCart = true }) {
    return(
        <header>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Huecraft</h1>
            </a>
            {showCart && (
                <img src={cart} alt="cart" style={{ cursor: 'pointer' }} onClick={onCartClick} />
            )}
        </header>
    )
}

export default Header