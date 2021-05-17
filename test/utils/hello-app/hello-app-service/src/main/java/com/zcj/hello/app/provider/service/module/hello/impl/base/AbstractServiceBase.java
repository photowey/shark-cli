package com.zcj.hello.app.provider.service.module.hello.impl.base;

import com.zcj.hello.app.core.factory.IEntityFactory;
import com.gmsoft.query.autoconfigure.properties.TableProperties;
import com.gmsoft.query.autoconfigure.repository.AbstractRepository;
import com.gmsoft.query.autoconfigure.service.impl.BaseServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * {@code AbstractServiceBase}
 * 采购执行-总的服务基类
 *
 * @author photowey
 * @date 2021/04/15
 * @since 1.0.0
 */
@Slf4j
public abstract class AbstractServiceBase<T, D, R extends AbstractRepository<T>> extends BaseServiceImpl<T, D, R> {

    public AbstractServiceBase(R baseRepository, TableProperties tableProperties) {
        super(baseRepository, tableProperties);
    }

    // FACTORY

    @Autowired
    protected IEntityFactory entityFactory;

}
