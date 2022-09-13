package com.zzhhsy.blogweb.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtils {
    private static final String secretString = "$123456@react-springboot-blog+-*/";
    private static final SecretKey secretKey = Keys.hmacShaKeyFor(secretString.getBytes(StandardCharsets.UTF_8));

    public static String createToken(Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }

    public static Map<String, Object> parseToken(String token) {
        Map<String, Object> claims = null;
        try {
            claims =  Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return claims;
    }
}
