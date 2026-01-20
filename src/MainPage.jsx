import Header from './Header';
import './MainPage.css';
import { useState } from 'react';

// Demo product data
const demoProducts = [
    { id: 1, name: 'Abstract Sunrise', price: 1200, category: 'Abstract', size: '24x36', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Modern Still Life', price: 950, category: 'Still Life', size: '18x24', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Golden Hour', price: 1800, category: 'Landscape', size: '30x40', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Blue Harmony', price: 1100, category: 'Abstract', size: '20x20', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Urban Muse', price: 1400, category: 'Cityscape', size: '24x30', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
    { id: 6, name: 'Serene Reflection', price: 1600, category: 'Landscape', size: '30x40', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
];


const categories = ['All', 'Abstract', 'Still Life', 'Landscape', 'Cityscape'];
const sizes = ['All', '20x20', '18x24', '24x30', '24x36', '30x40'];
const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $1000', min: 0, max: 999 },
    { label: '$1000 - $1500', min: 1000, max: 1500 },
    { label: 'Above $1500', min: 1501, max: Infinity },
];

function MainPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSize, setSelectedSize] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');
    const [order, setOrder] = useState([]);
    const [zoomImg, setZoomImg] = useState(null); // {src, alt}

    // Filtered products
    const filtered = demoProducts.filter(p => {
        const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchSize = selectedSize === 'All' || p.size === selectedSize;
        const priceObj = priceRanges.find(pr => pr.label === selectedPrice) || priceRanges[0];
        const matchPrice = (p.price >= priceObj.min && p.price <= priceObj.max);
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSize && matchPrice && matchSearch;
    });

    function addToOrder(product) {
        if (!order.find(item => item.id === product.id)) {
            setOrder([...order, product]);
        }
    }
    function removeFromOrder(id) {
        setOrder(order.filter(item => item.id !== id));
    }

    function shareWhatsApp() {
        const text = order.length
            ? `Order from Huecraft:%0A` + order.map(p => `• ${p.name} (${p.size}) - $${p.price}`).join('%0A')
            : 'No items in order.';
        window.open(`https://wa.me/?text=${text}`);
    }

    return (
        <div className="mainpage-root">
            <Header />
            <div className="mainpage-content">
                {/* Sidebar Filters */}
                <aside className="mainpage-sidebar">
                    <div className="mainpage-filters">
                        <h2>Filter</h2>
                        <div className="mainpage-filter-group">
                            <label>Category</label>
                            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                {categories.map(cat => <option key={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="mainpage-filter-group">
                            <label>Size</label>
                            <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                                {sizes.map(size => <option key={size}>{size}</option>)}
                            </select>
                        </div>
                        <div className="mainpage-filter-group">
                            <label>Price Range</label>
                            <select value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)}>
                                {priceRanges.map(pr => <option key={pr.label}>{pr.label}</option>)}
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Main Gallery */}
                <main className="mainpage-gallery-area">
                    <div className="mainpage-search-row">
                        <input
                            className="mainpage-search"
                            type="text"
                            placeholder="Search artworks..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="mainpage-gallery">
                        {filtered.length === 0 ? (
                            <div className="mainpage-no-results">No artworks found.</div>
                        ) : (
                            filtered.map(product => (
                                <div className="mainpage-product-card" key={product.id} style={{ position: 'relative' }}>
                                    <div className="mainpage-img-zoom-container"
                                        style={{ position: 'relative', width: '100%' }}
                                    >
                                        <img src={product.img} alt={product.name} style={{ width: '100%' }} />
                                        <button
                                            className="mainpage-zoom-btn"
                                            style={{
                                                display: 'none',
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                zIndex: 2,
                                                padding: '0.3em 0.7em',
                                                fontSize: '0.95em',
                                                borderRadius: '6px',
                                                border: 'none',
                                                background: 'rgba(0,0,0,0.65)',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                transition: 'opacity 0.2s',
                                            }}
                                            onClick={() => setZoomImg({ src: product.img, alt: product.name })}
                                            tabIndex={-1}
                                        >
                                            Zoom
                                        </button>
                                    </div>
                                    <div className="mainpage-product-info">
                                        <h3>{product.name}</h3>
                                        <div className="mainpage-product-meta">
                                            <span>{product.size}</span>
                                            <span>${product.price}</span>
                                        </div>
                                        <button onClick={() => addToOrder(product)} disabled={!!order.find(i => i.id === product.id)}>
                                            {order.find(i => i.id === product.id) ? 'Added' : 'Add to Order'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
            {/* Zoom Modal */}
            {zoomImg && (
                <div
                    className="mainpage-zoom-modal"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={() => setZoomImg(null)}
                >
                    <img
                        src={zoomImg.src}
                        alt={zoomImg.alt}
                        style={{
                            width: '60vw',
                            height: '60vh',
                            borderRadius: '18px',
                            boxShadow: '0 8px 48px rgba(0,0,0,0.32)',
                            background: '#fff',
                        }}
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}

export default MainPage;