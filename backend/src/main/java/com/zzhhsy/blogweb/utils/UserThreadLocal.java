package com.zzhhsy.blogweb.utils;

import com.zzhhsy.blogweb.dao.pojo.User;

public class UserThreadLocal {
    private static final ThreadLocal<User> LOCAL = new ThreadLocal<>();

    private UserThreadLocal() {}

    public static void set(User user) {
        LOCAL.set(user);
    }

    public static User get() {
        return LOCAL.get();
    }

    public static void remove() {
        LOCAL.remove();
    }
}
