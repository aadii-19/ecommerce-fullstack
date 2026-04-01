package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.cart.CartItemDto;
import com.ecommerce.backend.dto.cart.CartResponseDto;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.CartItemRepository;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CartService {

    private static final Logger log = LoggerFactory.getLogger(CartService.class);

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public CartResponseDto getCurrentCart() {
        Cart cart = getOrCreateCartForCurrentUser();
        return toResponse(cart);
    }

    public CartResponseDto addItem(CartItemDto dto) {
        Cart cart = getOrCreateCartForCurrentUser();
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + dto.getProductId()));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseGet(() -> {
                    CartItem item = new CartItem();
                    item.setCart(cart);
                    item.setProduct(product);
                    item.setQuantity(0);
                    return item;
                });

        cartItem.setQuantity(cartItem.getQuantity() + dto.getQuantity());
        cartItemRepository.save(cartItem);
        log.info("Added product {} to cart {}", product.getId(), cart.getId());

        return toResponse(cartRepository.findById(cart.getId()).orElse(cart));
    }

    public CartResponseDto updateItem(CartItemDto dto) {
        Cart cart = getOrCreateCartForCurrentUser();
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + dto.getProductId()));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart"));

        cartItem.setQuantity(dto.getQuantity());
        cartItemRepository.save(cartItem);
        log.info("Updated product {} in cart {} to quantity {}", product.getId(), cart.getId(), dto.getQuantity());

        return toResponse(cartRepository.findById(cart.getId()).orElse(cart));
    }

    public CartResponseDto removeItem(Long productId) {
        Cart cart = getOrCreateCartForCurrentUser();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        cartItemRepository.deleteByCartAndProduct(cart, product);
        log.info("Removed product {} from cart {}", product.getId(), cart.getId());

        return toResponse(cartRepository.findById(cart.getId()).orElse(cart));
    }

    private Cart getOrCreateCartForCurrentUser() {
        User user = getCurrentUser();
        return cartRepository.findByUser(user)
                .orElseGet(() -> cartRepository.save(new Cart(user)));
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    private CartResponseDto toResponse(Cart cart) {
        CartResponseDto response = new CartResponseDto();
        List<CartResponseDto.CartLineDto> lines = new ArrayList<>();
        Set<CartItem> items = cart.getItems();

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : items) {
            CartResponseDto.CartLineDto line = new CartResponseDto.CartLineDto();
            line.setProductId(item.getProduct().getId());
            line.setProductName(item.getProduct().getName());
            line.setQuantity(item.getQuantity());
            line.setPrice(item.getProduct().getPrice());
            lines.add(line);

            total = total.add(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        response.setItems(lines);
        response.setTotalPrice(total);
        return response;
    }
}

