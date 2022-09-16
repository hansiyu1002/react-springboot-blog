package com.zzhhsy.blogweb.dao.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("bw_article_content")
public class ArticleContent {
    private Long id;
    private String content;
    private Long articleId;
}
