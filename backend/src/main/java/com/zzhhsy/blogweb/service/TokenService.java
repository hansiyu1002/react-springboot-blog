package com.zzhhsy.blogweb.service;

import com.zzhhsy.blogweb.dao.pojo.User;

public interface TokenService {
    User auth(String token);
}
