package com.ecommerce.backend.dto.cart;

import java.math.BigDecimal;
import java.util.List;

public class CartResponseDto {

    private List<CartLineDto> items;
    private BigDecimal totalPrice;

    public CartResponseDto() {
    }

    public List<CartLineDto> getItems() {
        return items;
    }

    public void setItems(List<CartLineDto> items) {
        this.items = items;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public static class CartLineDto {
        private Long productId;
        private String productName;
        private int quantity;
        private BigDecimal price;

        public CartLineDto() {
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }
    }
}

