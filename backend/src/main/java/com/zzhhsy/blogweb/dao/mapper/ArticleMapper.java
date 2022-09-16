package com.zzhhsy.blogweb.dao.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zzhhsy.blogweb.dao.pojo.Article;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ArticleMapper extends BaseMapper<Article> {
}
