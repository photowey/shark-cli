package com.zcj.hello.app.provider.aop.logging;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zcj.hello.app.core.constant.VariableConstants;
import com.photowey.core.text.TextFormatUtil;
import com.photowey.core.validator.Validator;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UrlPathHelper;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Objects;

/**
 * Aspect for logging hello of protemp and repository Spring components.
 * {@copy from jhipster}
 *
 * @author photowey
 * @date 2021/03/18
 * @see * https://www.jhipster.tech/
 * @since 1.0.0
 */
@Aspect
@Component
public class LoggingAspect {

    private final Environment env;

    private UrlPathHelper helper = new UrlPathHelper();

    public LoggingAspect(Environment env) {
        this.env = env;
    }

    /**
     * Pointcut that matches all repositories, services and Web REST endpoints.
     */
    @Pointcut("within(@org.springframework.stereotype.Repository *)" +
            " || within(@org.springframework.stereotype.Service *)" +
            " || within(@org.springframework.web.bind.annotation.RestController *)")
    public void springBeanPointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advices.
    }

    /**
     * Pointcut that matches all Spring beans in the application's main packages.
     */
    @Pointcut("within(com.zcj.hello.app.provider.repository..*)" +
            " || within(com.zcj.hello.app.provider.service..*)" +
            " || within(com.zcj.hello.app.provider.controller..*)")
    public void applicationPackagePointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advices.
    }

    @Pointcut("within(com.zcj.hello.app.provider.repository..*)" +
            " || within(com.zcj.hello.app.provider.service..*)" +
            " || within(com.zcj.hello.app.provider.controller..*)")
    public void applicationErrorPackagePointcut() {
        // Method is empty as this is just a Pointcut, the implementations are in the advices.
    }

    /**
     * Retrieves the {@link Logger} associated to the given {@link JoinPoint}.
     *
     * @param joinPoint join point we want the logger for.
     * @return {@link Logger} associated to the given {@link JoinPoint}.
     */
    private Logger logger(JoinPoint joinPoint) {
        return LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringTypeName());
    }

    /**
     * Advice that logs methods throwing exceptions.
     *
     * @param joinPoint join point for advice.
     * @param e         exception.
     */
    @AfterThrowing(pointcut = "applicationErrorPackagePointcut() && springBeanPointcut()", throwing = "e")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
        if (env.acceptsProfiles(Profiles.of(VariableConstants.SPRING_PROFILE_DEVELOPMENT))) {
            this.logger(joinPoint)
                    .error(
                            "Exception in {}() with cause = \'{}\' and exception = \'{}\'",
                            joinPoint.getSignature().getName(),
                            e.getCause() != null ? e.getCause() : "NULL",
                            e.getMessage(),
                            e
                    );
        } else {
//            this.logger(joinPoint)
//                    .error(
//                            "Exception in {}() with cause = {}",
//                            joinPoint.getSignature().getName(),
//                            e.getCause() != null ? e.getCause() : "NULL"
//                    );
            this.logger(joinPoint)
                    .error(
                            "Exception in {}() with cause = \'{}\' and exception = \'{}\'",
                            joinPoint.getSignature().getName(),
                            e.getCause() != null ? e.getCause() : "NULL",
                            e.getMessage(),
                            e
                    );
        }
    }

    /**
     * Advice that logs when a method is entered and exited.
     *
     * @param joinPoint join point for advice.
     * @return result.
     * @throws Throwable throws {@link IllegalArgumentException}.
     */
    @Around("applicationPackagePointcut() && springBeanPointcut()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = this.handleRequest();
        if (Validator.isNullOrEmpty(request)) {
            // 子线程进入时 - 拿不到 HttpServletRequest
            return joinPoint.proceed();
        }
        Logger log = logger(joinPoint);
        if (log.isDebugEnabled()) {
            log.debug("Enter: {}() with argument[s] = {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
        }
        String method = request.getMethod();
        try {
            String userInfo = this.populateUserInfo(request);
            long startTime = System.currentTimeMillis();
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long time = endTime - startTime;
            if (log.isDebugEnabled()) {
                log.debug("Exit: {}() with result = {}", joinPoint.getSignature().getName(), result);
            }
            String uri = helper.getRequestUri(request);
            log.info("the request:[user:{}] [{} {}], use time is:{} ms", userInfo, method.toUpperCase(), uri, time);
            return result;
        } catch (IllegalArgumentException e) {
            log.error("Illegal argument: {} in {}()", Arrays.toString(joinPoint.getArgs()), joinPoint.getSignature().getName());
            throw e;
        }
    }

    private String populateUserInfo(HttpServletRequest request) {
        String userInfo = "-1";
        String userValue = request.getHeader(TOKEN_HEADER);
        if (Validator.isNotNullOrEmpty(userValue)) {
            if (userValue.startsWith(JSON_SUFFIX)) {
                userValue = StringUtils.substring(userValue, 5);
                userValue = new String(Base64Utils.decodeFromString(userValue));
                JSONObject loginUser = JSON.parseObject(userValue);
                Long userId = loginUser.getLong("userId");
                Long orgId = loginUser.getLong("orgId");
                Integer orgType = loginUser.getInteger("orgType");
                userInfo = TextFormatUtil.format("{}:{}:{}", userId, null == orgId ? -1 : orgId, null == orgType ? -1 : orgType);
            }
        }

        return userInfo;
    }

    public HttpServletRequest handleRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (Validator.isNullOrEmpty(requestAttributes)) {
            return null;
        }
        return Objects.requireNonNull(requestAttributes).getRequest();
    }

    private static final String JSON_SUFFIX = "json";
    private static final String TOKEN_HEADER = "x-microservice-user";
}
