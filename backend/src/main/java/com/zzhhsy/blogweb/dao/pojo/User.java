package com.zzhhsy.blogweb.dao.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("bw_user")
public class User {
    private Long id;
    private String email;
    private String password;
}
