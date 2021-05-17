package com.zcj.hello.app.provider.lisenter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

/**
 * 监听容器 ApplicationReadyEvent 事件
 * 事件发布先后顺序如下：
 * ApplicationStartingEvent
 * ApplicationEnvironmentPreparedEvent
 * ApplicationPreparedEvent
 * ApplicationStartedEvent <= 2.x 新增的事件
 * ApplicationReadyEvent
 * ApplicationFailedEvent
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Slf4j
@Component
public class ApplicationReadyEventListener implements ApplicationListener<ApplicationReadyEvent>, Ordered, BeanFactoryAware {

    private BeanFactory beanFactory;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        log.info("--- >>> Listener the App start successfully... <<< ---");
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }
}
