package com.zzhhsy.blogweb.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zzhhsy.blogweb.dao.pojo.User;
import com.zzhhsy.blogweb.service.TokenService;
import com.zzhhsy.blogweb.utils.JWTUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenServiceImpl implements TokenService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public User auth(String token) {
        if (StringUtils.isBlank(token)) {
            return null;
        }
        if (JWTUtils.parseToken(token) == null) {
            return null;
        }
        String userJson = redisTemplate.opsForValue().get(token);
        if (StringUtils.isBlank(userJson)) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        User user = null;
        try {
            user = mapper.readValue(userJson, User.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return user;
    }
}
