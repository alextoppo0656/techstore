import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './Cart.css';

export default function Cart() {
  const { cart, dispatch, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice >= 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shipping + tax;

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/" className="continue-shopping-btn">Browse Products</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container fade-up">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <span className="cart-count-label">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map(item => {
              const discount = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : null;

              return (
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${item.id}`} className="item-img-wrap">
                    <img src={item.img} alt={item.name} />
                  </Link>

                  <div className="item-details">
                    <div className="item-brand">{item.brand}</div>
                    <Link to={`/product/${item.id}`} className="item-name">{item.name}</Link>
                    <div className="item-category">{item.category}</div>

                    <div className="item-bottom">
                      <div className="item-prices">
                        <span className="item-price">{formatPrice(item.price)}</span>
                        {discount && <span className="item-discount">-{discount}%</span>}
                      </div>

                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })}
                        >−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })}
                        >+</button>
                      </div>

                      <div className="item-total">{formatPrice(item.price * item.qty)}</div>

                      <button
                        className="remove-btn"
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                          <path d="M10 11v6"/><path d="M14 11v6"/>
                          <path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="cart-actions-row">
              <Link to="/" className="continue-link">← Continue Shopping</Link>
              <button
                className="clear-cart-btn"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'free-shipping' : ''}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="summary-line">
                <span>GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            {shipping > 0 && (
              <p className="free-shipping-hint">
                Add {formatPrice(999 - totalPrice)} more for free shipping
              </p>
            )}

            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>

            <div className="security-badges">
              <span>🔒 Secure checkout</span>
              <span>💳 Multiple payment options</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
