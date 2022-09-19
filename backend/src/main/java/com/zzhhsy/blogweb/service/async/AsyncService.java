package com.zzhhsy.blogweb.service.async;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zzhhsy.blogweb.dao.mapper.ArticleMapper;
import com.zzhhsy.blogweb.dao.pojo.Article;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class AsyncService {
    @Autowired
    private ArticleMapper articleMapper;

    @Async
    public void incrViewCount(Long id, Integer viewCount) {
        Article articleUpdate = new Article();
        articleUpdate.setViewCount(viewCount + 1);
        LambdaQueryWrapper<Article> updateWrapper = new LambdaQueryWrapper<>();
        updateWrapper.eq(Article::getId, id);
        //其他线程可能已经更新view_count的值
        updateWrapper.eq(Article::getViewCount, viewCount);
        articleMapper.update(articleUpdate, updateWrapper);
    }
}
