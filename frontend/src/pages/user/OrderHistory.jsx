import React, { useEffect, useState } from 'react';
import { Package, Clock } from 'lucide-react';
import { getUserOrders } from '../../services/orders';
import './Orders.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="loader-container"><div className="loader animate-spin"></div></div>;

  if (error) return <div className="detail-error glass-panel">{error}</div>;

  return (
    <div className="orders-container animate-fade-in">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders glass-panel">
          <Package size={48} className="text-primary mb-4" />
          <h2>No orders yet</h2>
          <p>When you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card glass-panel hover-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.orderId}</h3>
                  <p className="order-status">
                    <Clock size={16} /> Status: <span className="status-badge">{order.status}</span>
                  </p>
                </div>
                <div className="order-total-price">
                  ${Number(order.totalPrice).toFixed(2)}
                </div>
              </div>
              
              <div className="order-items-list">
                {order.items && order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <span>{item.name} <span className="text-muted">x{item.quantity}</span></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
