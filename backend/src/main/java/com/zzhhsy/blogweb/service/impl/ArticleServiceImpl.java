package com.zzhhsy.blogweb.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zzhhsy.blogweb.dao.mapper.ArticleContentMapper;
import com.zzhhsy.blogweb.dao.mapper.ArticleMapper;
import com.zzhhsy.blogweb.dao.pojo.Article;
import com.zzhhsy.blogweb.dao.pojo.ArticleContent;
import com.zzhhsy.blogweb.dao.pojo.User;
import com.zzhhsy.blogweb.service.ArticleService;
import com.zzhhsy.blogweb.service.UserService;
import com.zzhhsy.blogweb.utils.UserThreadLocal;
import com.zzhhsy.blogweb.vo.ArticleParam;
import com.zzhhsy.blogweb.vo.ArticleVo;
import com.zzhhsy.blogweb.vo.Result;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    ArticleContentMapper articleContentMapper;
    @Autowired
    private UserService userService;

    @Override
    public Result getArticleById(Long id) {
        Article article = articleMapper.selectById(id);
        ArticleVo articleVo = copy(article);
        return Result.success(articleVo);
    }

    @Override
    public Result getMyArticles() {
        User user = UserThreadLocal.get();
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getAuthorId, user.getId());
        List<Article> articles = articleMapper.selectList(queryWrapper);
        List<ArticleVo> articleVos = copyList(articles);
        return Result.success(articleVos);
    }

    @Override
    public Result postArticle(ArticleParam articleParam) {
        User user = UserThreadLocal.get();
        Article article = new Article();
        article.setTitle(articleParam.getTitle());
        article.setAuthorId(user.getId());
        article.setCreateDate(System.currentTimeMillis());
        articleMapper.insert(article);
        ArticleContent articleContent = new ArticleContent();
        articleContent.setContent(articleParam.getContent());
        articleContent.setArticleId(article.getId());
        articleContentMapper.insert(articleContent);
        return Result.success(article.getId());
    }

    @Override
    public Result updateArticle(Long id, ArticleParam articleParam) {
        Article article = articleMapper.selectById(id);
        article.setTitle(articleParam.getTitle());
        articleMapper.updateById(article);
        LambdaQueryWrapper<ArticleContent> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ArticleContent::getArticleId, id);
        ArticleContent articleContent = articleContentMapper.selectOne(queryWrapper);
        articleContent.setContent(articleParam.getContent());
        articleContentMapper.updateById(articleContent);
        return Result.success(article.getId());
    }

    @Override
    public Result deleteArticle(Long id) {
        articleMapper.deleteById(id);
        LambdaQueryWrapper<ArticleContent> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ArticleContent::getArticleId, id);
        articleContentMapper.delete(queryWrapper);
        return Result.success(null);
    }

    private ArticleVo copy(Article article) {
        ArticleVo articleVo = new ArticleVo();
        BeanUtils.copyProperties(article, articleVo);
        Long authorId = article.getAuthorId();
        articleVo.setAuthor(userService.getUserById(authorId).getEmail());
        Long id = article.getId();
        LambdaQueryWrapper<ArticleContent> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ArticleContent::getArticleId, id);
        articleVo.setContent(articleContentMapper.selectOne(queryWrapper).getContent());
        return articleVo;
    }

    private List<ArticleVo> copyList(List<Article> articles) {
        List<ArticleVo> articleVos = new ArrayList<>();
        for (Article article : articles) {
            articleVos.add(copy(article));
        }
        return articleVos;
    }
}
