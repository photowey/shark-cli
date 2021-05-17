package com.zcj.hello.app.core.util;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * {@code LambdaUtils}
 *
 * @author photowey
 * @date 2021/01/12
 * @since 1.0.0
 */
public final class LambdaUtils {

    private LambdaUtils() {
        // utils class; can't create
        throw new AssertionError("No " + getClass().getName() + " instances for you!");
    }

    public static <T, D> List<D> transferToList(Collection<T> resources, Function<T, D> function) {
        return resources.stream().map(function::apply).collect(Collectors.toList());
    }

    public static <T, D> Set<D> transferToSet(Collection<T> resources, Function<T, D> function) {
        return resources.stream().map(function::apply).collect(Collectors.toSet());
    }

    public static <T> List<T> filter(Collection<T> resources, Predicate<? super T> predicate) {
        return resources.stream().filter(predicate::test).collect(Collectors.toList());
    }

    public static <T> T filterAny(Collection<T> resources, Predicate<T> predicate) {
        return resources.stream().filter(predicate::test).findAny().orElse(null);
    }

    public static <T, K> Map<K, List<T>> groupingBy(Collection<T> resources, Function<T, K> function) {
        return resources.stream().collect(Collectors.groupingBy(function));
    }

    public static <T> BigDecimal reduce(Collection<T> resources, Function<T, BigDecimal> function) {
        return resources.stream().map(function).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public static <T> boolean test(T resource, Predicate<T> predicate) {
        return predicate.test(resource);
    }

    public static <T> List<T> copy(Collection<T> candidates) {
        List<T> copy = candidates.stream().map(candidate -> candidate).collect(Collectors.toList());
        return copy;
    }
}
