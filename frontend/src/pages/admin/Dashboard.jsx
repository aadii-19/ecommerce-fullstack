import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Plus, Edit2, Trash2 } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/products';
import { getAllOrders } from '../../services/orders';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', description: '', imageUrl: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const data = await getProducts();
        setProducts(data || []);
      } else {
        const data = await getAllOrders();
        setOrders(data || []);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load data for dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...productForm, price: Number(productForm.price) };
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }
      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({ name: '', price: '', description: '', imageUrl: '' });
      fetchData();
    } catch (err) {
      alert(err.message || 'Failed to save product');
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setProductForm({ 
      name: product.name, 
      price: product.price, 
      description: product.description, 
      imageUrl: product.imageUrl 
    });
    setShowProductForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchData();
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={20} /> Manage Products
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingCart size={20} /> System Orders
        </button>
      </div>

      <div className="dashboard-content">
        {loading ? (
          <div className="loader-container"><div className="loader animate-spin"></div></div>
        ) : activeTab === 'products' ? (
          <div className="admin-section">
            <div className="section-header">
              <h2>Product Catalog</h2>
              <button 
                className="btn-primary"
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({ name: '', price: '', description: '', imageUrl: '' });
                  setShowProductForm(!showProductForm);
                }}
              >
                {showProductForm ? 'Cancel' : <><Plus size={18} /> Add Product</>}
              </button>
            </div>

            {showProductForm && (
              <form onSubmit={handleProductSubmit} className="admin-form glass-panel animate-fade-in">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-input" required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input type="number" step="0.01" className="form-input" required value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea className="form-input" rows="3" required value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})}></textarea>
                  </div>
                  <div className="form-group full-width">
                    <label>Image URL</label>
                    <input type="url" className="form-input" value={productForm.imageUrl} onChange={e => setProductForm({...productForm, imageUrl: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="btn-primary form-submit">Save Product</button>
              </form>
            )}

            <div className="data-table-container glass-panel">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>${Number(p.price).toFixed(2)}</td>
                      <td className="table-actions">
                        <button onClick={() => startEdit(p)} className="btn-icon"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(p.id)} className="btn-icon text-error"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && <tr><td colSpan="4" className="text-center">No products found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="admin-section">
            <div className="section-header">
              <h2>All System Orders</h2>
            </div>
            <div className="data-table-container glass-panel">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User Email</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.orderId}>
                      <td>#{o.orderId}</td>
                      <td>{o.userEmail || 'Unknown'}</td>
                      <td className="text-primary font-bold">${Number(o.totalPrice).toFixed(2)}</td>
                      <td><span className="status-badge">{o.status}</span></td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan="4" className="text-center">No orders found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
