package com.zzhhsy.blogweb.controller;

import com.zzhhsy.blogweb.service.ArticleService;
import com.zzhhsy.blogweb.vo.ArticleParam;
import com.zzhhsy.blogweb.vo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("/{id}")
    public Result getArticleById(@PathVariable("id") Long id) {
        return articleService.getArticleById(id);
    }

    @GetMapping("/mine")
    public Result getMyArticles() {
        return articleService.getMyArticles();
    }

    @PostMapping("/post")
    public Result postArticle(@RequestBody ArticleParam articleParam) {
        return articleService.postArticle(articleParam);
    }

    @PatchMapping("/{id}")
    public Result updateArticle(@PathVariable("id") Long id, @RequestBody ArticleParam articleParam) {
        return articleService.updateArticle(id, articleParam);
    }

    @DeleteMapping("/{id}")
    public Result deleteArticle(@PathVariable("id") Long id) {
        return articleService.deleteArticle(id);
    }
}
