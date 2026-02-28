import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './ProductCard.css';

export default function ProductCard({ product, style }) {
  const { dispatch, cart } = useCart();
  const [adding, setAdding] = useState(false);
  const inCart = cart.find(i => i.id === product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
    setAdding(true);
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card" style={style}>
      <div className="card-image">
        <img src={product.img} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
            {product.badge}
          </span>
        )}
        {discount && <span className="badge badge-discount">-{discount}%</span>}
      </div>

      <div className="card-body">
        <div className="card-brand">{product.brand}</div>
        <h3 className="card-name">{product.name}</h3>

        <div className="card-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="card-footer">
          <div className="card-prices">
            <span className="price">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            className={`add-btn${adding ? ' added' : ''}${inCart ? ' in-cart' : ''}`}
            onClick={handleAdd}
          >
            {adding ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
