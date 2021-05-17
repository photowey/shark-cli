package com.zcj.hello.app.provider.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.SmartInitializingSingleton;
import org.springframework.context.annotation.Configuration;

/**
 * 任务执行器配置类
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Slf4j
@Configuration
public class TaskExecutorConfiguration implements SmartInitializingSingleton, DisposableBean, BeanFactoryAware {

    private BeanFactory beanFactory;

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    @Override
    public void afterSingletonsInstantiated() {

    }

    @Override
    public void destroy() throws Exception {

    }
}
