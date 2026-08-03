package com.trash2track.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.trash2track.entity.User;
import com.trash2track.service.AuthService;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    @Lazy
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        /*String path = request.getServletPath();

        // Skip authentication endpoints
        // Skip ONLY login, register, otp endpoints
if (
    path.equals("/auth/login") ||
    path.equals("/auth/register") ||
    path.equals("/auth/send-otp") ||
    path.equals("/auth/verify-otp") ||
    path.equals("/auth/forgot-password") ||
    path.equals("/auth/reset-password")
) {
    filterChain.doFilter(request, response);
    return;
}*/

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            // Validate JWT token
            if (jwtService.validateToken(token)) {

                String email = jwtService.extractEmail(token);

                if (email != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null) {

                    User user = authService.findByEmail(email);

                    UsernamePasswordAuthenticationToken authToken =
    new UsernamePasswordAuthenticationToken(
        user,   // ✅ FIX: pass full User object
        null,
        List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
);

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}