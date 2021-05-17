package com.zcj.hello.app.core.domain.module.hello.entity;

import com.gmsoft.annotation.Required;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * {@code Hello}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Hello implements IEntity {

    /**
     * 标识
     */
    @Required(required = true, message = "必须")
    @ApiModelProperty(value = "标识", required = false)
    private Long id;
    /**
     * 名称
     */
    @ApiModelProperty(value = "名称", required = false)
    private String name;
    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间", required = false)
    private Date createTime;
    /**
     * 更新时间
     */
    @ApiModelProperty(value = "更新时间", required = false)
    private Date updateTime;
}
