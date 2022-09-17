package com.zzhhsy.blogweb.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zzhhsy.blogweb.dao.pojo.User;
import com.zzhhsy.blogweb.service.TokenService;
import com.zzhhsy.blogweb.utils.UserThreadLocal;
import com.zzhhsy.blogweb.vo.ErrorCode;
import com.zzhhsy.blogweb.vo.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        if ("OPTIONS".equals(request.getMethod())) {
            return true;
        }
        String token = request.getHeader("Authorization");

        log.info("--------------------LoginInterceptor--------------------");
        log.info("request uri: {}", request.getRequestURI());
        log.info("request method: {}", request.getMethod());
        log.info("token: {}", token);
        log.info("--------------------LoginInterceptor--------------------");

        User user = tokenService.auth(token);
        if (user == null) {
            Result result = Result.fail(ErrorCode.ACCESS_DENIED.getCode(), ErrorCode.ACCESS_DENIED.getMsg());
            response.setContentType("application/json");
            ObjectMapper mapper = new ObjectMapper();
            String resultJson = mapper.writeValueAsString(result);
            response.getWriter().write(resultJson);
            return false;
        }
        UserThreadLocal.set(user);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        //防止ThreadLocal内存泄漏
        UserThreadLocal.remove();
    }
}
