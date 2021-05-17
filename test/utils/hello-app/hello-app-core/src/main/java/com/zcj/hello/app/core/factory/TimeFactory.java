package com.zcj.hello.app.core.factory;

import com.photowey.core.date.DateUtil;
import com.photowey.core.date.TimeUtils;
import com.photowey.core.validator.Validator;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * {@code TimeFactory}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public class TimeFactory {

    private TimeFactory() {
        throw new AssertionError("No " + this.getClass().getName() + " instances for you!");
    }

    public static Date now() {
        return new Date();
    }

    public static String format(String pattern) {
        Instant instant = now().toInstant();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime.format(DateTimeFormatter.ofPattern(pattern));
    }

    // ================================================

    public static Date start() {
        return DateUtil.getFirstDateOfThisDay(now());
    }

    public static Date start(Date start) {
        return DateUtil.getFirstDateOfThisDay(start);
    }

    // ================================================

    public static Date end() {
        return DateUtil.getLastDateOfThisDay(now());
    }

    public static Date end(Date end) {
        return DateUtil.getLastDateOfThisDay(end);
    }

    // ================================================

    public static Date yearStart(Date start) {
        return DateUtil.getFirstDateOfThisYear(start);
    }

    public static Date yearStart() {
        return yearStart(now());
    }

    public static Date yearEnd(Date end) {
        return DateUtil.getLastDateOfThisYear(end);
    }

    public static Date yearEnd() {
        return yearEnd(now());
    }

    // ================================================

    public static Date monthStart(Date start) {
        return DateUtil.getFirstDateOfThisMonth(start);
    }

    public static Date monthStart() {
        return DateUtil.getFirstDateOfThisMonth(now());
    }

    public static Date monthEnd(Date end) {
        return DateUtil.getLastDateOfThisMonth(end);
    }

    public static Date monthEnd() {
        return DateUtil.getLastDateOfThisMonth(now());
    }
    // ================================================

    public static Date weekStart(Date start) {
        return DateUtil.getFirstDateOfThisWeekInCN(start);
    }

    public static Date weekStart() {
        return DateUtil.getFirstDateOfThisWeekInCN(now());
    }

    public static Date weekEnd(Date end) {
        return DateUtil.getLastDateOfThisWeekInCN(end);
    }

    public static Date weekEnd() {
        return DateUtil.getLastDateOfThisWeekInCN(now());
    }

    // ================================================

    /**
     * 指定时间对应的季度的开始时间
     *
     * @return 季度的结束始时间
     */
    public static Date quarterStart(Date start) {
        return toQuarter(start, QuarterEnum.START);
    }

    /**
     * 当前时间对应的季度的开始时间
     *
     * @return 季度的结束始时间
     */
    public static Date quarterStart() {
        return toQuarter(now(), QuarterEnum.START);
    }

    /**
     * 指定时间对应的季度的结束时间
     *
     * @param end 指定时间
     * @return 季度的结束始时间
     */
    public static Date quarterEnd(Date end) {
        return toQuarter(end, QuarterEnum.END);
    }

    /**
     * 当前时间对应的季度的结束时间
     *
     * @return 季度的结束始时间
     */
    public static Date quarterEnd() {
        return toQuarter(now(), QuarterEnum.END);
    }

    // ================================================

    /**
     * 获取指定的季度开始和结束时间
     *
     * @param now     指定的时间
     * @param quarter 季度开始还是结束枚举类
     * @return 季度的开始时间或者结束时间
     */
    public static Date toQuarter(Date now, QuarterEnum quarter) {
        int month = DateUtil.getMonth(now) - 1;
        int mode = month % 3;
        switch (mode) {
            // 0-3-6-9
            case 0:
                if (QuarterEnum.START.equals(quarter)) {
                    // 季度的开始
                    now = monthStart(now);
                } else {
                    now = monthEnd(DateUtil.addMonth(now, 2));
                }
                break;
            // 1-4-7-10
            case 1:
                if (QuarterEnum.START.equals(quarter)) {
                    // 季度的开始
                    now = monthStart(DateUtil.addMonth(now, -1));
                } else {
                    now = monthEnd(DateUtil.addMonth(now, 1));
                }
                break;
            // 2-5-8-11
            case 2:
                if (QuarterEnum.START.equals(quarter)) {
                    // 季度的开始
                    now = monthStart(DateUtil.addMonth(now, -2));
                } else {
                    now = monthEnd(now);
                }
                break;
            default:
                break;
        }

        return now;
    }

    public static Integer toQuarter(int month) {
        return (int) Math.ceil(month / 3.0);
    }

    // ================================================

    /**
     * 将长整型-时间戳 转换为 Date 类型时间
     *
     * @param time 时间戳
     * @return 转换后的时间
     */
    public static Date toTime(Long time) {
        if (Validator.isNullOrEmpty(time)) {
            return null;
        }

        time = time / 1000 * 1000;

        return new Date(time);
    }

    /**
     * 将时间戳对象 转换为 Date 类型时间
     *
     * @param time 时间戳
     * @return 转换后的时间
     */
    public static Date toTime(Timestamp time) {
        if (Validator.isNullOrEmpty(time)) {
            return null;
        }
        return toTime(time.getTime());
    }

    public static Long fromTime(Date time) {
        if (Validator.isNullOrEmpty(time)) {
            return null;
        }
        return time.getTime();
    }

    // ================================================

    public static int dayDiffInQuarter(Date now) {
        Date quarterStart = quarterStart(now);
        return DateUtil.getDayOfYear(now) - DateUtil.getDayOfYear(quarterStart) + 1;
    }

    // ================================================

    /**
     * 获取指定月份所持有的天数
     *
     * @param target 和 month 坐在同一年的任何一个日期均可 - 主要是为了取年份
     * @param month  指定月份
     * @return
     */
    public static int monthDays(Date target, int month) {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 2:
                boolean leapYear = DateUtil.isLeapYear(DateUtil.getYear(target));
                return leapYear ? 29 : 28;
            default:
                break;
        }

        return 30;
    }

    public static int yearMonths() {
        return 0x0C;
    }

    /**
     * 季度开始-结束-枚举类
     *
     * @author photowey
     * @date 2019/02/27
     */
    public enum QuarterEnum {
        /**
         * 季度开始
         */
        START("START", 0),
        /**
         * 季度结束
         */
        END("END", 1);

        public String name;
        public int value;

        QuarterEnum(String name, int value) {
            this.name = name;
            this.value = value;
        }

        public static QuarterEnum valueOf(Integer value) {
            if (Validator.isNullOrEmpty(value)) {
                return null;
            }
            int temp = value;
            for (QuarterEnum target : QuarterEnum.values()) {
                if (target.value() == temp) {
                    return target;
                }
            }

            return null;
        }

        public String toName() {
            return name;
        }

        public int value() {
            return value;
        }
    }
}
