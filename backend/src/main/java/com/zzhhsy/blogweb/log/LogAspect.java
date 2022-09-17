package com.zzhhsy.blogweb.log;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class LogAspect {
    @Autowired
    private ObjectMapper objectMapper;

    @Pointcut("execution(* com.zzhhsy.blogweb.controller.*.*(..))")
    public void pointcut() {}

    @Around("pointcut()")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        Long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        Long end = System.currentTimeMillis();

        log.info("--------------------LogAspect--------------------");
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        log.info("method: {}", className + "." + methodName);

        Object[] args = joinPoint.getArgs();
        String argsJson = objectMapper.writeValueAsString(args);
        log.info("params: {}", argsJson);

        log.info("execution time: {} ms", end - start);
        log.info("--------------------LogAspect--------------------");
        return result;
    }
}
