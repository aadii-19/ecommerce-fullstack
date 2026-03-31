package org.myorg.ecommerce.repository;

import org.myorg.ecommerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
}
