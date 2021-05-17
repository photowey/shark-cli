package com.zcj.hello.app.client;

import org.springframework.context.annotation.Import;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

/**
 * {@code EnableAppClient} 开启 {@link AppClient} 客户端
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Retention(value = java.lang.annotation.RetentionPolicy.RUNTIME)
@Target(value = {java.lang.annotation.ElementType.TYPE})
@Documented
@Import({AppClientConfiguration.class})
public @interface EnableAppClient {

}
