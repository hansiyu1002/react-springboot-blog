package com.zzhhsy.blogweb.service.impl;

import com.alibaba.fastjson2.JSON;
import com.zzhhsy.blogweb.dao.pojo.User;
import com.zzhhsy.blogweb.service.AccountService;
import com.zzhhsy.blogweb.service.UserService;
import com.zzhhsy.blogweb.utils.JWTUtils;
import com.zzhhsy.blogweb.vo.ErrorCode;
import com.zzhhsy.blogweb.vo.AccountParam;
import com.zzhhsy.blogweb.vo.Result;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private UserService userService;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public Result login(AccountParam accountParam) {
        String email = accountParam.getEmail();
        String password = accountParam.getPassword();
        if (StringUtils.isBlank(email) || StringUtils.isBlank(password)) {
            return Result.fail(ErrorCode.PARAM_ERROR.getCode(), ErrorCode.PARAM_ERROR.getMsg());
        }
        password = DigestUtils.md5Hex(password);
        User user = userService.getUser(email, password);
        if (user == null) {
            return Result.fail(ErrorCode.ACCOUNT_PWD_ERROR.getCode(), ErrorCode.ACCOUNT_PWD_ERROR.getMsg());
        }
        String token = JWTUtils.createToken(user.getId());
        redisTemplate.opsForValue().set(token, JSON.toJSONString(user), 1, TimeUnit.DAYS);
        return Result.success(token);
    }

    @Override
    public Result signup(AccountParam accountParam) {
        String email = accountParam.getEmail();
        String password = accountParam.getPassword();
        if (StringUtils.isBlank(email) || StringUtils.isBlank(password)) {
            return Result.fail(ErrorCode.PARAM_ERROR.getCode(), ErrorCode.PARAM_ERROR.getMsg());
        }
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return Result.fail(ErrorCode.ACCOUNT_ALREADY_EXIST.getCode(), ErrorCode.ACCOUNT_ALREADY_EXIST.getMsg());
        }
        user = new User();
        user.setEmail(email);
        user.setPassword(DigestUtils.md5Hex(password));
        userService.saveUser(user);
        String token = JWTUtils.createToken(user.getId());
        redisTemplate.opsForValue().set(token, JSON.toJSONString(user), 1, TimeUnit.DAYS);
        return Result.success(token);
    }

    @Override
    public Result logout(String token) {
        redisTemplate.delete(token);
        return Result.success(null);
    }
}
