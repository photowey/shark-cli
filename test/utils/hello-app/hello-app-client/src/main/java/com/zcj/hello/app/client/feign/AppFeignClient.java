package com.zcj.hello.app.client.feign;

import org.springframework.cloud.openfeign.FeignClient;

/**
 * {@link AppFeignClient}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@FeignClient(name = AppFeignClient.APP_NAME)
public interface AppFeignClient {

    /**
     * 应用名称
     */
    String APP_NAME = "hello-app";

}
