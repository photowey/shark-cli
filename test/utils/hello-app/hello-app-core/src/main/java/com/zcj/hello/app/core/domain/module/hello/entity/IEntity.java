package com.zcj.hello.app.core.domain.module.hello.entity;

import java.util.Date;

/**
 * {@code IEntity}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public interface IEntity {

    void setCreateTime(Date createTime);

    void setUpdateTime(Date createTime);
}
