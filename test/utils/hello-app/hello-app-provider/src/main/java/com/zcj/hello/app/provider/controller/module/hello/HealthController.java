package com.zcj.hello.app.provider.controller.module.hello;

import com.zcj.hello.app.provider.service.module.hello.IHelloService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * {@code HealthController}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Slf4j
@RestController
@Api(tags = "健康检查")
@RequestMapping("/health")
public class HealthController {

    @Autowired
    private IHelloService helloService;

    /**
     * Say Hello
     *
     * @return "Say Hello"
     * @see * http://localhost:9527/health/sayHello
     * @see * curl -X GET http://localhost:9527/health/sayHello
     */
    @GetMapping("/sayHello")
    public String sayHello() {
        return this.helloService.sayHello();
    }

}
