import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById } from '../../services/products';
import { CartContext } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product.id, quantity);
      // Optional: show a toast notification here
      navigate('/cart');
    } catch (err) {
      alert("Failed to add to cart. Make sure you are logged in.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <div className="loader-container"><div className="loader animate-spin"></div></div>;
  if (error) return <div className="detail-error glass-panel">{error}</div>;
  if (!product) return <div className="detail-error glass-panel">Product not found</div>;

  return (
    <main className="product-detail-container animate-fade-in">
      <button onClick={() => navigate(-1)} className="btn-secondary back-btn">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="product-detail-layout glass-panel">
        <div className="detail-image-wrapper">
          <img 
            src={product.imageUrl || `https://source.unsplash.com/random/800x600/?product&${product.id}`} 
            alt={product.name} 
            className="detail-image"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=No+Image' }}
          />
        </div>
        
        <div className="detail-content">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${Number(product.price).toFixed(2)}</p>
          
          <div className="detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select 
                id="quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-input"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button 
              className="btn-primary add-to-cart-btn" 
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingCart size={20} />
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
