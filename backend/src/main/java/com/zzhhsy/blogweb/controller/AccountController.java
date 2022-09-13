package com.zzhhsy.blogweb.controller;

import com.zzhhsy.blogweb.service.AccountService;
import com.zzhhsy.blogweb.vo.AccountParam;
import com.zzhhsy.blogweb.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AccountController {
    @Autowired
    AccountService accountService;

    @PostMapping("/login")
    public Result login(@RequestBody AccountParam accountParam) {
        return accountService.login(accountParam);
    }

    @PostMapping("/signup")
    public Result signup(@RequestBody AccountParam accountParam) {
        return accountService.signup(accountParam);
    }

    @DeleteMapping("/logout")
    public Result logout(@RequestHeader("Authorization") String token) {
        return accountService.logout(token);
    }
}
