import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './Checkout.css';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const { cart, dispatch, totalPrice } = useCart();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNum] = useState(() => Math.floor(Math.random() * 900000) + 100000);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '', country: 'India'
  });

  const [payment, setPayment] = useState({
    method: 'card',
    cardNumber: '', expiry: '', cvv: '', name: '',
    upiId: ''
  });

  const shippingCost = totalPrice >= 999 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shippingCost + tax;

  const updateShipping = e => setShipping(p => ({ ...p, [e.target.name]: e.target.value }));
  const updatePayment = e => setPayment(p => ({ ...p, [e.target.name]: e.target.value }));

  const shippingValid = shipping.firstName && shipping.lastName && shipping.email &&
    shipping.phone && shipping.address && shipping.city && shipping.state && shipping.pincode;

  const paymentValid = payment.method === 'cod' || payment.method === 'upi'
    ? (payment.method === 'upi' ? payment.upiId : true)
    : payment.cardNumber && payment.expiry && payment.cvv && payment.name;

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      dispatch({ type: 'CLEAR_CART' });
    }, 1800);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <h2>No items to checkout</h2>
            <Link to="/">← Back to shop</Link>
          </div>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="order-success fade-up">
            <div className="success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order <strong>#{orderNum}</strong> has been confirmed.</p>
            <p className="success-email">A confirmation will be sent to <strong>{shipping.email || 'your email'}</strong></p>

            <div className="success-timeline">
              <div className="timeline-step active">
                <span>✓</span>
                <p>Order Confirmed</p>
              </div>
              <div className="timeline-line" />
              <div className="timeline-step">
                <span>2</span>
                <p>Processing</p>
              </div>
              <div className="timeline-line" />
              <div className="timeline-step">
                <span>3</span>
                <p>Shipped</p>
              </div>
              <div className="timeline-line" />
              <div className="timeline-step">
                <span>4</span>
                <p>Delivered</p>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/" className="btn-home">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container fade-up">
        <div className="checkout-header">
          <Link to="/cart" className="back-link">← Cart</Link>
          <h1 className="checkout-title">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="stepper">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>
                <div className="step-circle">
                  {i < step ? '✓' : i + 1}
                </div>
                <span>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`step-line${i < step ? ' done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="checkout-layout">
          {/* Left: Form */}
          <div className="checkout-form-wrap">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="form-section">
                <h2 className="form-section-title">Shipping Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input name="firstName" value={shipping.firstName} onChange={updateShipping} placeholder="Rahul" />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input name="lastName" value={shipping.lastName} onChange={updateShipping} placeholder="Sharma" />
                  </div>
                  <div className="form-group full">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={shipping.email} onChange={updateShipping} placeholder="rahul@example.com" />
                  </div>
                  <div className="form-group full">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={shipping.phone} onChange={updateShipping} placeholder="+91 9876543210" />
                  </div>
                  <div className="form-group full">
                    <label>Address *</label>
                    <input name="address" value={shipping.address} onChange={updateShipping} placeholder="123, Street Name, Area" />
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input name="city" value={shipping.city} onChange={updateShipping} placeholder="Mumbai" />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input name="state" value={shipping.state} onChange={updateShipping} placeholder="Maharashtra" />
                  </div>
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input name="pincode" value={shipping.pincode} onChange={updateShipping} placeholder="400001" />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={shipping.country} onChange={updateShipping}>
                      <option>India</option>
                    </select>
                  </div>
                </div>
                <button className="form-next-btn" onClick={handleNext} disabled={!shippingValid}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="form-section">
                <h2 className="form-section-title">Payment Method</h2>

                <div className="payment-methods">
                  {['card', 'upi', 'cod'].map(method => (
                    <label key={method} className={`method-card${payment.method === method ? ' selected' : ''}`}>
                      <input type="radio" name="method" value={method}
                        checked={payment.method === method}
                        onChange={updatePayment} />
                      <div className="method-label">
                        {method === 'card' && <><span className="method-icon">💳</span><span>Credit / Debit Card</span></>}
                        {method === 'upi' && <><span className="method-icon">⚡</span><span>UPI</span></>}
                        {method === 'cod' && <><span className="method-icon">📦</span><span>Cash on Delivery</span></>}
                      </div>
                    </label>
                  ))}
                </div>

                {payment.method === 'card' && (
                  <div className="form-grid card-form">
                    <div className="form-group full">
                      <label>Card Number</label>
                      <input name="cardNumber" value={payment.cardNumber} onChange={updatePayment}
                        placeholder="1234 5678 9012 3456" maxLength="19" />
                    </div>
                    <div className="form-group full">
                      <label>Cardholder Name</label>
                      <input name="name" value={payment.name} onChange={updatePayment} placeholder="Rahul Sharma" />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input name="expiry" value={payment.expiry} onChange={updatePayment} placeholder="MM/YY" maxLength="5" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input name="cvv" value={payment.cvv} onChange={updatePayment} placeholder="123" maxLength="3" type="password" />
                    </div>
                  </div>
                )}

                {payment.method === 'upi' && (
                  <div className="form-grid">
                    <div className="form-group full">
                      <label>UPI ID</label>
                      <input name="upiId" value={payment.upiId} onChange={updatePayment} placeholder="name@upi" />
                    </div>
                  </div>
                )}

                {payment.method === 'cod' && (
                  <div className="cod-note">
                    <p>₹50 COD handling charge may apply. Payment accepted at delivery.</p>
                  </div>
                )}

                <div className="form-btn-row">
                  <button className="form-back-btn" onClick={() => setStep(0)}>← Back</button>
                  <button className="form-next-btn" onClick={handleNext} disabled={!paymentValid}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="form-section">
                <h2 className="form-section-title">Review Order</h2>

                <div className="review-section">
                  <div className="review-block">
                    <div className="review-block-header">
                      <span>Shipping to</span>
                      <button onClick={() => setStep(0)}>Edit</button>
                    </div>
                    <p><strong>{shipping.firstName} {shipping.lastName}</strong></p>
                    <p>{shipping.address}, {shipping.city}, {shipping.state} {shipping.pincode}</p>
                    <p>{shipping.email} · {shipping.phone}</p>
                  </div>

                  <div className="review-block">
                    <div className="review-block-header">
                      <span>Payment</span>
                      <button onClick={() => setStep(1)}>Edit</button>
                    </div>
                    <p>
                      {payment.method === 'card' && `Card ending in ${payment.cardNumber.slice(-4) || '****'}`}
                      {payment.method === 'upi' && `UPI: ${payment.upiId}`}
                      {payment.method === 'cod' && 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                <div className="review-items">
                  {cart.map(item => (
                    <div key={item.id} className="review-item">
                      <img src={item.img} alt={item.name} />
                      <div>
                        <p className="review-item-name">{item.name}</p>
                        <p className="review-item-meta">Qty: {item.qty}</p>
                      </div>
                      <span className="review-item-price">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="form-btn-row">
                  <button className="form-back-btn" onClick={() => setStep(1)}>← Back</button>
                  <button
                    className={`place-order-btn${loading ? ' loading' : ''}`}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading-dots">Placing Order<span>.</span><span>.</span><span>.</span></span>
                    ) : (
                      `Place Order · ${formatPrice(grandTotal)}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div className="checkout-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="checkout-items-mini">
              {cart.map(item => (
                <div key={item.id} className="checkout-item-mini">
                  <div className="mini-img">
                    <img src={item.img} alt={item.name} />
                    <span className="mini-qty">{item.qty}</span>
                  </div>
                  <span className="mini-name">{item.name}</span>
                  <span className="mini-price">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'free-shipping' : ''}>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              <div className="summary-line">
                <span>GST (18%)</span><span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}