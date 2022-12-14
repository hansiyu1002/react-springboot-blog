package com.zzhhsy.blogweb.service;

import com.zzhhsy.blogweb.vo.ArticleParam;
import com.zzhhsy.blogweb.vo.Result;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ArticleService {
    Result getArticleById(Long id);
    Result getMyArticles();
    Result getHotArticles();
    Result postArticle(ArticleParam articleParam);
    Result updateArticle(Long id, ArticleParam articleParam);
    Result deleteArticle(Long id);
    Result incrViewCount(Long id);
}
