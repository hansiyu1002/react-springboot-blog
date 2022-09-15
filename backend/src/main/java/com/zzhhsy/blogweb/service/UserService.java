package com.zzhhsy.blogweb.service;

import com.zzhhsy.blogweb.dao.pojo.User;
import com.zzhhsy.blogweb.vo.Result;

public interface UserService {
    User getUser(String email, String password);
    User getUserById(Long id);
    User getUserByEmail(String email);
    void saveUser(User user);
}
