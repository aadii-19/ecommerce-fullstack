package org.myorg.ecommerce.service;

import org.myorg.ecommerce.dto.auth.AuthResponse;
import org.myorg.ecommerce.dto.auth.LoginRequest;
import org.myorg.ecommerce.dto.auth.MessageResponse;
import org.myorg.ecommerce.dto.auth.RegisterRequest;
import org.myorg.ecommerce.entity.User;
import org.myorg.ecommerce.repository.UserRepo;
import org.myorg.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public MessageResponse register(RegisterRequest request) {

        // 1. Check if user exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 2. Create user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return new MessageResponse("User registered successfully");
    }

    public AuthResponse login(LoginRequest request) {

        // 1. Fetch user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 3. Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, user.getEmail());
    }
}
