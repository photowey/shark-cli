package com.zcj.hello.app.provider.config;

import com.zcj.hello.app.core.factory.EntityFactory;
import com.zcj.hello.app.core.factory.IEntityFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * {@code CommonConfigurer}
 *
 * @author photowey
 * @date 2021/03/15
 * @since 1.0.0
 */
@Configuration
public class CommonConfigurer {

    @Bean
    public IEntityFactory entityFactory() {
        return new EntityFactory();
    }
}
