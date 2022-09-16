package com.zzhhsy.blogweb.service;

import com.zzhhsy.blogweb.vo.ArticleParam;
import com.zzhhsy.blogweb.vo.Result;

public interface ArticleService {
    Result getArticleById(Long id);
    Result getMyArticles();
    Result postArticle(ArticleParam articleParam);
    Result updateArticle(Long id, ArticleParam articleParam);
    Result deleteArticle(Long id);
}
