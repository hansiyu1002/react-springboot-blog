package com.zzhhsy.blogweb.dao.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("bw_article")
public class Article {
    private Long id;
    private String title;
    private Long authorId;
    private Long createDate;
}
