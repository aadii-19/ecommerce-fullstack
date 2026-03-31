import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { placeOrder } from '../../services/orders';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCartState } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!cart?.items?.length && !success) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setError('Delivery address is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await placeOrder(address);
      setSuccess(true);
      clearCartState(); // Empties the frontend cart visually immediately
    } catch (err) {
      setError(err.message || 'Failed to place order. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-success animate-fade-in">
        <div className="success-icon glass-panel animate-pulse">
          <CheckCircle size={64} className="text-success" />
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Your order has been confirmed and is being processed.</p>
        <div className="success-actions">
          <button onClick={() => navigate('/orders')} className="btn-primary">View Orders</button>
          <button onClick={() => navigate('/')} className="btn-secondary">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container animate-fade-in">
      <div className="checkout-card glass-panel">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="checkout-summary">
          <h3>Order Details</h3>
          <div className="summary-items">
            {cart.items.map(item => (
              <div key={item.productId} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total-price">
            <strong>Total Amount:</strong>
            <span className="text-primary">${Number(cart.totalPrice).toFixed(2)}</span>
          </div>
        </div>

        {error && <div className="detail-error">{error}</div>}

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="form-input"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address here..."
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary checkout-action-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing Payment...' : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
