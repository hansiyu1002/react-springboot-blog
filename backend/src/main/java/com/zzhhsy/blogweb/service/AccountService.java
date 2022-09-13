package com.zzhhsy.blogweb.service;

import com.zzhhsy.blogweb.vo.AccountParam;
import com.zzhhsy.blogweb.vo.Result;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface AccountService {
    Result login(AccountParam accountParam);
    Result logout(String token);
    Result signup(AccountParam accountParam);
}
