import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card glass-panel hover-card animate-fade-in">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img 
          src={product.imageUrl || `https://source.unsplash.com/random/400x300/?product&${product.id}`} 
          alt={product.name} 
          className="product-image"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
        />
      </Link>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn-secondary btn-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
