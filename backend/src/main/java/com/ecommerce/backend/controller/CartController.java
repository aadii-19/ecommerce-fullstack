package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.cart.CartItemDto;
import com.ecommerce.backend.dto.cart.CartResponseDto;
import com.ecommerce.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<CartResponseDto> getCart() {
        return ResponseEntity.ok(cartService.getCurrentCart());
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponseDto> addItem(@Valid @RequestBody CartItemDto dto) {
        return ResponseEntity.ok(cartService.addItem(dto));
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponseDto> updateItem(@Valid @RequestBody CartItemDto dto) {
        return ResponseEntity.ok(cartService.updateItem(dto));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartResponseDto> removeItem(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItem(productId));
    }
}

