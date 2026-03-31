package org.myorg.ecommerce.repository;

import org.myorg.ecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
}
