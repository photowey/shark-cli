package com.zcj.hello.app.core.log;

import org.slf4j.Logger;

import java.util.List;
import java.util.Objects;
import java.util.function.Supplier;

/**
 * {@code LoggerHandler}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public final class LoggerHandler {

    /**
     * Instantiates a new Logger util.
     */
    private LoggerHandler() {
        throw new AssertionError("No " + this.getClass().getName() + " instances for you!");
    }

    /**
     * Debug.
     *
     * @param logger     the logger
     * @param format     the format
     * @param parameters the supplier
     */
    public static void debug(final Logger logger, final String format, final Object... parameters) {
        if (logger.isDebugEnabled()) {
            logger.info(format, parameters);
        }
    }

    /**
     * Debug.
     *
     * @param logger   log
     * @param format   log information
     * @param supplier supplier
     */
    public static void debug(final Logger logger, final String format, final Supplier<List<Object>> supplier) {
        if (logger.isDebugEnabled()) {
            logger.debug(format, supplier.get().toArray());
        }
    }

    /**
     * Debug.
     *
     * @param logger   the logger
     * @param supplier the supplier
     */
    public static void debug(final Logger logger, final Supplier<Object> supplier) {
        if (logger.isDebugEnabled()) {
            logger.debug(Objects.toString(supplier.get()));
        }
    }

    /**
     * Info.
     *
     * @param logger     the logger
     * @param format     the format
     * @param parameters the supplier
     */
    public static void info(final Logger logger, final String format, final Object... parameters) {
        if (logger.isInfoEnabled()) {
            logger.info(format, parameters);
        }
    }

    /**
     * Info.
     *
     * @param logger   the logger
     * @param format   the format
     * @param supplier the supplier
     */
    public static void info(final Logger logger, final String format, final Supplier<List<Object>> supplier) {
        if (logger.isInfoEnabled()) {
            logger.info(format, supplier.get().toArray());
        }
    }

    /**
     * Info.
     *
     * @param logger   the logger
     * @param supplier the supplier
     */
    public static void info(final Logger logger, final Supplier<Object> supplier) {
        if (logger.isInfoEnabled()) {
            logger.info(Objects.toString(supplier.get()));
        }
    }

    /**
     * Warn.
     *
     * @param logger     the logger
     * @param format     the format
     * @param parameters the supplier
     */
    public static void warn(final Logger logger, final String format, final Object... parameters) {
        if (logger.isWarnEnabled()) {
            logger.info(format, parameters);
        }
    }

    /**
     * Warn.
     *
     * @param logger   the logger
     * @param format   the format
     * @param supplier the supplier
     */
    public static void warn(final Logger logger, final String format, final Supplier<List<Object>> supplier) {
        if (logger.isWarnEnabled()) {
            logger.warn(format, supplier.get().toArray());
        }
    }

    /**
     * Warn.
     *
     * @param logger   the logger
     * @param supplier the supplier
     */
    public static void warn(final Logger logger, final Supplier<Object> supplier) {
        if (logger.isWarnEnabled()) {
            logger.warn(Objects.toString(supplier.get()));
        }
    }

    /**
     * Error.
     *
     * @param logger     the logger
     * @param format     the format
     * @param parameters the supplier
     */
    public static void error(final Logger logger, final String format, final Object... parameters) {
        if (logger.isErrorEnabled()) {
            logger.info(format, parameters);
        }
    }

    /**
     * Error.
     *
     * @param logger   the logger
     * @param format   the format
     * @param supplier the supplier
     */
    public static void error(final Logger logger, final String format, final Supplier<List<Object>> supplier) {
        if (logger.isErrorEnabled()) {
            logger.error(format, supplier.get().toArray());
        }
    }

    /**
     * Error.
     *
     * @param logger   the logger
     * @param supplier the supplier
     */
    public static void error(final Logger logger, final Supplier<Object> supplier) {
        if (logger.isErrorEnabled()) {
            logger.error(Objects.toString(supplier.get()));
        }
    }
}
