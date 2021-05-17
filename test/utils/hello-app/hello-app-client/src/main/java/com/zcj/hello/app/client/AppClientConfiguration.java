package com.zcj.hello.app.client;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * {@code AppClientConfiguration} 执行 {@link AppClient} 客户端配置
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Configuration("AppClientConfiguration")
@EnableFeignClients(basePackages = "com.zcj.hello.app.client.feign")
@ComponentScan("com.zcj.hello.app.client")
public class AppClientConfiguration {

}
