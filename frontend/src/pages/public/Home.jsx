import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ui/ProductCard';
import { getProducts } from '../../services/products';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loader-container"><div className="loader animate-spin"></div></div>;

  if (error) return <div className="error-message glass-panel">{error}</div>;

  return (
    <main className="home-container animate-fade-in">
      <header className="home-hero">
        <h1 className="hero-title">Experience Premium Quality</h1>
        <p className="hero-subtitle">Discover our exclusive collection of curated products.</p>
      </header>

      <section className="product-grid">
        {products.length === 0 ? (
          <p className="empty-state">No products found.</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </section>
    </main>
  );
};

export default Home;
