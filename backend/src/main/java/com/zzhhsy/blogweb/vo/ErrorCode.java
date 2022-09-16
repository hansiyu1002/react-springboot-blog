package com.zzhhsy.blogweb.vo;

public enum ErrorCode {
    SERVER_ERROR(9999, "Server Error"),
    PARAM_ERROR(1000, "Parameter Error"),
    ACCOUNT_PWD_ERROR(2000, "Account / Password Error"),
    ACCOUNT_ALREADY_EXIST(3000, "Account Already Exist"),
    ACCESS_DENIED(4000, "Not Login");

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
