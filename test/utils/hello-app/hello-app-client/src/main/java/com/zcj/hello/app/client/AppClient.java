package com.zcj.hello.app.client;

import com.zcj.hello.app.client.feign.AppFeignClient;
import org.springframework.stereotype.Component;

/**
 * {@link AppClient}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Component
public class AppClient {

    AppFeignClient feignClient;

    public AppClient(AppFeignClient feignClient) {
        this.feignClient = feignClient;
    }
}
