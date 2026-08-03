package com.trash2track.config;

import com.trash2track.security.JwtAuthenticationFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // ✅ PUBLIC endpoints
                .requestMatchers(
                    "/auth/login",
                    "/auth/register",
                    "/auth/send-otp",
                    "/auth/verify-otp",
                    "/auth/forgot-password",
                    "/auth/reset-password"
                ).permitAll()

                // 🔥 TEMP FIX: allow /auth/me (filter will still validate JWT)
                .requestMatchers("/auth/me").permitAll()

                // ROLE-based
                .requestMatchers("/citizen/**").hasAuthority("ROLE_CITIZEN")
                .requestMatchers("/worker/**").hasAuthority("ROLE_WORKER")
                .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")

                .anyRequest().authenticated()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}