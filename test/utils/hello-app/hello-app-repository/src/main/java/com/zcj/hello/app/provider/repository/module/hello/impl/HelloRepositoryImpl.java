package com.zcj.hello.app.provider.repository.module.hello.impl;

import com.zcj.hello.app.provider.repository.module.hello.IHelloRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code HelloRepositoryImpl}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Repository
public class HelloRepositoryImpl implements IHelloRepository {

    @Override
    public String sayHello() {
        return "\"Say Hello\" from project-template-protemp~";
    }
}
