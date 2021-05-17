package com.zcj.hello.app.core.util;

import com.gmsoft.core.WebBusinessException;
import com.photowey.core.text.TextFormatUtil;
import com.photowey.core.validator.Validator;

/**
 * 异常检测器
 *
 * @author photowey
 * @date 2021/01/12
 * @since 1.0.0
 */
public abstract class ExceptionChecker {

    /**
     * 检查是否是允许通过的值 否抛出异常
     *
     * @param data            正则表达式
     * @param allowableValues 允许通过的值
     * @param message         异常消息
     */
    public static void checkAllowableValues(String data, String allowableValues, String message) {
        checkNotNull(data, message);
        checkTrue(allowableValues.contains(data), message);
    }

    /**
     * 检查是否满足正则 否抛出异常
     *
     * @param pattern 正则表达式
     * @param message 异常消息
     * @param datas   目标数据
     */
    public static void checkPattern(String pattern, String message, String... datas) {
        checkNotNull(datas, message);
        for (String data : datas) {
            checkTrue(data.matches(pattern), message);
        }
    }

    /**
     * 检查非NULL 空则抛出异常
     *
     * @param data    目标数据
     * @param message 异常消息
     * @param <T>     T 类型
     */
    public static <T> void checkNotNull(T data, String message) {
        if (Validator.isNullOrEmpty(data)) {
            throwException(message);
        }
    }

    public static <T> void checkNotNull(String message, T... datas) {
        for (T data : datas) {
            if (Validator.isNullOrEmpty(data)) {
                throwException(message);
            }
        }
    }

    public static <T> void checkNotNull(T data, String message, Object... params) {
        checkNotNull(data, TextFormatUtil.format(message, params));
    }

    /**
     * 检查NULL 非空则抛出异常
     *
     * @param data    目标数据
     * @param message 异常消息
     * @param <T>     T 类型
     */
    public static <T> void checkNull(T data, String message) {
        if (Validator.isNotNullOrEmpty(data)) {
            throwException(message);
        }
    }

    public static <T> void checkNull(T data, String message, Object... params) {
        if (Validator.isNotNullOrEmpty(data)) {
            throwException(TextFormatUtil.format(message, params));
        }
    }

    /**
     * 检查真 非真则抛出异常
     *
     * @param expect  期望值
     * @param message 异常消息
     */
    public static void checkTrue(Boolean expect, String message) {
        if (!Boolean.TRUE.equals(expect)) {
            throwException(message);
        }
    }

    public static void checkTrue(Boolean expect, String message, Object... params) {
        checkTrue(expect, TextFormatUtil.format(message, params));
    }

    // ========================================================================= 400

    /**
     * 抛出异常
     *
     * @param message 异常消息
     */
    public static void throwException(String message) {
        throw new WebBusinessException(400, 400, message);
    }

    public static void throwException(String message, Object... params) {
        throwException(TextFormatUtil.format(message, params));
    }

    // ========================================================================= 401

    public static void throwException401() {
        throwException401("系统检测到您还未登录,请先登录!");
    }

    public static void throwException401(String message) {
        throw new WebBusinessException(401, 401, message);
    }


    public static void throwException401(String message, Object... params) {
        throwException401(TextFormatUtil.format(message, params));
    }

    // ========================================================================= 403

    public static void throwException403() {
        throwException403("您当前还未没有操作权限,请切换身相应的身份后,再操作!");
    }

    public static void throwException403(String message) {
        throw new WebBusinessException(403, 403, message);
    }

    public static void throwException403(String message, Object... params) {
        throwException403(TextFormatUtil.format(message, params));
    }

}
