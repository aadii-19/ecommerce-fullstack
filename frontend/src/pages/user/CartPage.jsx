import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (loading && !cart?.items?.length) {
    return <div className="loader-container"><div className="loader animate-spin"></div></div>;
  }

  const handleQuantity = (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    updateQuantity(productId, newQty);
  };

  if (!cart?.items?.length) {
    return (
      <div className="cart-empty animate-fade-in">
        <div className="empty-icon glass-panel">
          <ShoppingBag size={48} />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn-primary mt-6">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container animate-fade-in">
      <h1 className="cart-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.productId} className="cart-item glass-panel hover-card">
              <div className="item-details">
                <Link to={`/product/${item.productId}`}>
                  <h3 className="item-name">{item.name}</h3>
                </Link>
                <p className="item-price">${Number(item.price).toFixed(2)}</p>
              </div>
              
              <div className="item-actions">
                <div className="qty-controls">
                  <button 
                    onClick={() => handleQuantity(item.productId, item.quantity, -1)}
                    className="btn-icon"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantity(item.productId, item.quantity, 1)}
                    className="btn-icon"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="btn-icon text-error delete-btn"
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary glass-panel">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${Number(cart.totalPrice).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${Number(cart.totalPrice).toFixed(2)}</span>
          </div>
          <button 
            className="btn-primary checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
