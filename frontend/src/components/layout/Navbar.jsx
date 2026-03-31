import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Package, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <Package className="navbar-icon text-primary" />
          <span>SummaShop</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links desktop-only">
          <Link to="/" className="nav-link">Products</Link>
          
          {user?.isAdmin && (
            <Link to="/admin" className="nav-link admin-link">
              <ShieldCheck size={18} /> Admin Dashboard
            </Link>
          )}

          {user ? (
            <>
              <Link to="/orders" className="nav-link">Orders</Link>
              <Link to="/cart" className="nav-link cart-link">
                <ShoppingCart size={20} />
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </Link>
              <div className="user-profile">
                <span className="user-email">{user.email.split('@')[0]}</span>
                <button onClick={handleLogout} className="btn-icon" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle btn-icon desktop-hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu animate-fade-in desktop-hidden">
          <Link to="/" className="nav-link" onClick={closeMenu}>Products</Link>
          {user?.isAdmin && (
            <Link to="/admin" className="nav-link admin-link" onClick={closeMenu}>
              <ShieldCheck size={18} /> Admin Dashboard
            </Link>
          )}

          {user ? (
            <>
              <Link to="/orders" className="nav-link" onClick={closeMenu}>My Orders</Link>
              <Link to="/cart" className="nav-link" onClick={closeMenu}>
                Cart ({cartItemCount})
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">Logout ({user.email.split('@')[0]})</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="nav-link" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
