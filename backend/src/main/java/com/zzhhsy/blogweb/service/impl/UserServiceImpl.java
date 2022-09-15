package com.zzhhsy.blogweb.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zzhhsy.blogweb.dao.mapper.UserMapper;
import com.zzhhsy.blogweb.dao.pojo.User;
import com.zzhhsy.blogweb.service.TokenService;
import com.zzhhsy.blogweb.service.UserService;
import com.zzhhsy.blogweb.utils.JWTUtils;
import com.zzhhsy.blogweb.vo.ErrorCode;
import com.zzhhsy.blogweb.vo.Result;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TokenService tokenService;

    @Override
    public User getUser(String email, String password) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getEmail, email);
        queryWrapper.eq(User::getPassword, password);
        queryWrapper.select(User::getId, User::getEmail);
        queryWrapper.last("limit 1");
        return userMapper.selectOne(queryWrapper);
    }

    @Override
    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public User getUserByEmail(String email) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getEmail, email);
        queryWrapper.last("limit 1");
        return userMapper.selectOne(queryWrapper);
    }

    @Override
    public void saveUser(User user) {
        //默认使用雪花算法分配id
        userMapper.insert(user);
    }
}
