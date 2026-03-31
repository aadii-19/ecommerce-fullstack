package org.myorg.ecommerce.repository;

import org.myorg.ecommerce.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart, Long> {
}
