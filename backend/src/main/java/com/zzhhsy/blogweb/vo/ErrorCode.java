package com.zzhhsy.blogweb.vo;

public enum ErrorCode {
    SERVER_ERROR(9999, "服务器错误"),
    PARAM_ERROR(1000, "参数错误"),
    ACCOUNT_PWD_ERROR(2000, "用户名或密码错误"),
    TOKEN_ILLEGAL(3000, "token不合法"),
    ACCOUNT_ALREADY_EXIST(4000, "该邮箱已注册"),
    ACCESS_DENIED(5000, "未登录");

    private int code;
    private String msg;

    ErrorCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
