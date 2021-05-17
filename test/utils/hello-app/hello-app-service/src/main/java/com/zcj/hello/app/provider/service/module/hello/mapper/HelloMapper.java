package com.zcj.hello.app.provider.service.module.hello.mapper;

import com.zcj.hello.app.core.domain.module.hello.dto.HelloDTO;
import com.zcj.hello.app.core.domain.module.hello.entity.Hello;
import com.gmsoft.query.autoconfigure.service.mapper.AbstractEntityMapperAdaptor;
import org.springframework.stereotype.Component;

/**
 * {@code HelloMapper}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Component
public class HelloMapper extends AbstractEntityMapperAdaptor<HelloDTO, Hello> {
    // do nothing
}
