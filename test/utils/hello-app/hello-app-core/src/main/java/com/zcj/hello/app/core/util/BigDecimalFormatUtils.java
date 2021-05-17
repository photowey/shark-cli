package com.zcj.hello.app.core.util;

import com.photowey.core.number.NumberFormatUtil;
import com.photowey.core.number.NumberPattern;
import com.photowey.core.validator.Validator;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * {@code BigDecimal} Format
 *
 * @author photowey
 * @date 2020/07/06
 * @since 1.0.0
 */
public final class BigDecimalFormatUtils {

    private BigDecimalFormatUtils() {
        // utils class; can't create
        throw new AssertionError("No " + getClass().getName() + " instances for you!");
    }

    /**
     * 格式化 BigDecimal
     *
     * @param resource      BigDecimal 数值
     * @param decimalPoints 格式
     * @param roundingMode  取整模式
     * @return 格式化后的 BigDecimal
     */
    public static BigDecimal toBigDecimal(BigDecimal resource, String decimalPoints, RoundingMode roundingMode) {
        return new BigDecimal(NumberFormatUtil.format(resource, decimalPoints, roundingMode));
    }

    /**
     * 格式化 BigDecimal
     *
     * @param resource BigDecimal 数值
     * @return 格式化后的 BigDecimal 默认:  #0.00 && HALF_UP
     */
    public static BigDecimal toBigDecimal(BigDecimal resource) {
        return new BigDecimal(NumberFormatUtil.format(resource, NumberPattern.TWO_DECIMAL_POINTS, RoundingMode.HALF_UP));
    }

    /**
     * 根据指定的格式和取整Mode 格式化 {@link BigDecimal}
     *
     * @param resource      被格式化的数据
     * @param decimalPoints 格式
     * @param roundingMode  取整方式 {@link RoundingMode}
     * @return 格式化后的字符串金额
     */
    public static String toStr(BigDecimal resource, String decimalPoints, RoundingMode roundingMode) {
        return NumberFormatUtil.format(resource, decimalPoints, roundingMode);
    }

    /**
     * 转换为字符串
     *
     * @param resource
     * @return
     */
    public static String toPlainString(BigDecimal resource) {
        if (null == resource) {
            return "";
        }
        return resource.toPlainString();
    }

    /**
     * 格式化 {@link BigDecimal} 为小数点后两位小数
     *
     * @param resource 被格式化的数据
     * @return 格式化后的字符串金额
     */
    public static String toStr(BigDecimal resource) {
        // #0.00
        return toStr(resource, NumberPattern.TWO_DECIMAL_POINTS, RoundingMode.HALF_UP);
    }

    /**
     * 格式化数字为千分符
     * 保留两位小数
     *
     * @param resource 被格式化的数据
     * @return 格式化后的字符串金额
     */
    public static String toThousands(BigDecimal resource) {
        if (Validator.isNullOrEmpty(resource)) {
            return "";
        }
        return toStr(resource, "#,##0.00", RoundingMode.HALF_UP);
    }

}
