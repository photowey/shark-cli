package com.zcj.hello.app.core.util;

import com.photowey.core.validator.Validator;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * {@code ObjectUtils}
 *
 * @author photowey
 * @date 2021/04/26
 * @since 1.0.0
 */
public final class ObjectUtils {

    private ObjectUtils() {
        // utils class; can't create
        throw new AssertionError("No " + this.getClass().getName() + " instances for you!");
    }

    /**
     * 安全取值
     *
     * @param target
     * @param defaultValue
     * @param <T>
     * @return
     */
    public static <T> T defaultIfNull(T target, T defaultValue) {
        return Validator.isNotNullOrEmpty(target) ? target : defaultValue;
    }

    /**
     * 对象==
     *
     * @param t1
     * @param t2
     * @param <T>
     * @return
     */
    public static <T> boolean equals(final T t1, final T t2) {
        return Objects.equals(t1, t2);
    }

    /**
     * 对象 !=
     *
     * @param t1
     * @param t2
     * @param <T>
     * @return
     */
    public static <T> boolean notEqual(final T t1, final T t2) {
        return !equals(t1, t2);
    }

    /**
     * 数值比较
     *
     * @param t1
     * @param t2
     * @param <T> 泛型 {@link Number}
     * @return 整形数值 [-1,0,1]
     */
    public static <T extends Number> int compareTo(final T t1, final T t2) {
        checkNull(t1, t2);
        BigDecimal t11 = t1 instanceof BigDecimal ? (BigDecimal) t1 : new BigDecimal(t1.toString());
        BigDecimal t21 = t1 instanceof BigDecimal ? (BigDecimal) t2 : new BigDecimal(t2.toString());

        return t11.compareTo(t21);
    }

    /**
     * 等于
     *
     * @param t1
     * @param t2
     * @param <T>
     * @return
     */
    public static <T extends Number> boolean compareEquals(final T t1, final T t2) {
        checkNull(t1, t2);
        BigDecimal t11 = t1 instanceof BigDecimal ? (BigDecimal) t1 : new BigDecimal(t1.toString());
        BigDecimal t21 = t1 instanceof BigDecimal ? (BigDecimal) t2 : new BigDecimal(t2.toString());

        return t11.compareTo(t21) == 0;
    }

    /**
     * 大于
     *
     * @param t1
     * @param t2
     * @param <T>
     * @return
     */
    public static <T extends Number> boolean compareGt(final T t1, final T t2) {
        checkNull(t1, t2);
        BigDecimal t11 = t1 instanceof BigDecimal ? (BigDecimal) t1 : new BigDecimal(t1.toString());
        BigDecimal t21 = t1 instanceof BigDecimal ? (BigDecimal) t2 : new BigDecimal(t2.toString());

        return t11.compareTo(t21) > 0;
    }

    /**
     * 小于
     *
     * @param t1
     * @param t2
     * @param <T>
     * @return
     */
    public static <T extends Number> boolean compareLt(final T t1, final T t2) {
        checkNull(t1, t2);
        BigDecimal t11 = t1 instanceof BigDecimal ? (BigDecimal) t1 : new BigDecimal(t1.toString());
        BigDecimal t21 = t1 instanceof BigDecimal ? (BigDecimal) t2 : new BigDecimal(t2.toString());

        return t11.compareTo(t21) < 0;
    }

    private static <T extends Number> void checkNull(T t1, T t2) {
        Assert.notNull(t1, "参数t1不能为空");
        Assert.notNull(t2, "参数t2不能为空");
    }
}
