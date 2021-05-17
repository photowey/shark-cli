package com.zcj.hello.app.core.factory;

import com.zcj.hello.app.core.domain.module.hello.entity.IEntity;

import java.util.Date;
import java.util.function.Consumer;

/**
 * {@code IEntityFactory}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public interface IEntityFactory {

    void populateBaseProperties(IEntity entity);

    void populateBaseProperties(IEntity entity, Date target);

    void populateBaseProperties(IEntity entity, Consumer<IEntity> consumer);
}
