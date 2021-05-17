package com.zcj.hello.app.provider.service.module.hello.impl;

import com.zcj.hello.app.provider.service.module.hello.IHelloService;
import com.zcj.hello.app.provider.repository.module.hello.IHelloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * HelloServiceImpl
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Service
public class HelloServiceImpl implements IHelloService {

    @Autowired
    private IHelloRepository helloRepository;

    @Override
    public String sayHello() {
        return this.helloRepository.sayHello();
    }
}
