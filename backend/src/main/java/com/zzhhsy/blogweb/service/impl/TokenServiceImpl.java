package com.zzhhsy.blogweb.service.impl;

import com.alibaba.fastjson2.JSON;
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
        return JSON.parseObject(userJson, User.class);
    }
}
