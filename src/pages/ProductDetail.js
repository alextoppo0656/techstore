import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { dispatch, cart } = useCart();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <Link to="/">← Back to shop</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const inCart = cart.find(i => i.id === product.id);

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    navigate('/checkout');
  };

  return (
    <main className="product-detail-page">
      <div className="detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb fade-up">
          <Link to="/">Shop</Link>
          <span>›</span>
          <span>{product.category}</span>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-image-wrap fade-up" style={{ animationDelay: '0.05s' }}>
            <div className="detail-image">
              <img src={product.img} alt={product.name} />
              {product.badge && <span className={`badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>{product.badge}</span>}
            </div>
          </div>

          {/* Info */}
          <div className="detail-info fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="detail-brand">{product.brand}</div>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span className="rating-num">{product.rating}</span>
              <span className="rating-count">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="detail-prices">
              <span className="detail-price">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="detail-original">{formatPrice(product.originalPrice)}</span>
                  <span className="detail-discount">{discount}% off</span>
                </>
              )}
            </div>

            {product.originalPrice && (
              <p className="savings-tag">
                You save {formatPrice(product.originalPrice - product.price)}
              </p>
            )}

            <p className="detail-desc">{product.description}</p>

            <div className="detail-actions">
              <button
                className={`btn-add-cart${added ? ' added' : ''}`}
                onClick={handleAdd}
              >
                {added ? '✓ Added to Cart' : inCart ? 'Add More' : 'Add to Cart'}
              </button>
              <button className="btn-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <div className="detail-perks">
              <div className="perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Free delivery on orders above ₹999</span>
              </div>
              <div className="perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                </svg>
                <span>Easy 30-day returns</span>
              </div>
              <div className="perk">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>1-year manufacturer warranty</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="detail-tabs">
              <div className="tab-header">
                {['specs', 'description'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="tab-content">
                {activeTab === 'specs' && (
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key}>
                          <td className="spec-key">{key}</td>
                          <td className="spec-val">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {activeTab === 'description' && (
                  <p className="desc-text">{product.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="related-section">
            <h2 className="section-title">More in {product.category}</h2>
            <div className="related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
