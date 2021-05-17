package com.zcj.hello.app.core.factory;

import com.zcj.hello.app.core.domain.module.hello.entity.IEntity;

import java.util.Date;
import java.util.function.Consumer;

/**
 * {@code EntityFactory}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public class EntityFactory implements IEntityFactory {

    @Override
    public void populateBaseProperties(IEntity entity) {
        Date now = TimeFactory.now();
        entity.setCreateTime(now);
        entity.setUpdateTime(now);
    }

    @Override
    public void populateBaseProperties(IEntity entity, Date target) {
        entity.setCreateTime(target);
        entity.setUpdateTime(target);
    }

    @Override
    public void populateBaseProperties(IEntity entity, Consumer<IEntity> consumer) {
        this.populateBaseProperties(entity);
        consumer.accept(entity);
    }
}
