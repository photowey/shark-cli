package com.zcj.hello.app.provider;

import com.zcj.hello.app.provider.service.module.hello.IHelloService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * AppTests
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Slf4j
@SpringBootTest
public class AppTests {

    @Autowired
    private IHelloService helloService;

    @Test
    public void contextLoads() {
        this.sayHello();
    }

    private void sayHello() {
        this.helloService.sayHello();
    }
}
