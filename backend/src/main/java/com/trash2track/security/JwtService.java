package com.trash2track.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
@Service
public class JwtService {

    private static final String SECRET = "trash2track_super_secret_key_1234567890";

    private final Key SECRET_KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email, String role) {

    return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SECRET_KEY)
            .compact();
}

    public String extractRole(String token) {

    return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("role", String.class);
}
    public String extractEmail(String token) {

    return Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
}
    public boolean validateToken(String token) {

    try {
        Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token);

        return true;

    } catch (Exception e) {
        return false;
    }
}
}