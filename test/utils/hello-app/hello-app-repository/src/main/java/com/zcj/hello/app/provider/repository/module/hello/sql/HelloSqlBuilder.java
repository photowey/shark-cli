package com.zcj.hello.app.provider.repository.module.hello.sql;

import com.zcj.hello.app.core.domain.module.hello.entity.Hello;
import com.gmsoft.annotation.SQLBuilder;
import com.gmsoft.query.autoconfigure.repository.sql.AbstractSqlBuilder;

/**
 * {@code HelloSqlBuilder}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@SQLBuilder("helloSqlBuilder")
public class HelloSqlBuilder extends AbstractSqlBuilder<Hello> {


}
