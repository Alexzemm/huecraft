import './Header.css'
import cart from './assets/cart.png'

function Header({ onCartClick }) {
    return(
        <header>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Huecraft</h1>
            </a>
            <img src={cart} alt="cart" style={{ cursor: 'pointer' }} onClick={onCartClick} />
        </header>
    )
}

export default Header