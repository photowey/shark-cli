package com.zcj.hello.app.core.query.module.hello;

import com.zcj.hello.app.core.domain.module.hello.entity.Hello;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.gmsoft.query.core.enums.SqlLike;
import com.gmsoft.query.criteria.annotaion.Eq;
import com.gmsoft.query.criteria.annotaion.Like;
import com.gmsoft.query.criteria.query.AbstractQuery;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * {@code HelloQuery}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Data
public class HelloQuery extends AbstractQuery<Hello> implements Serializable {

    private static final long serialVersionUID = -2765383276761058752L;

    @Eq
    @JsonSerialize(using = ToStringSerializer.class)
    @ApiModelProperty(value = "主键标识", required = false)
    private Long id;

    @Like(like = SqlLike.DEFAULT)
    @ApiModelProperty(value = "名称", required = false)
    private String name;
}
