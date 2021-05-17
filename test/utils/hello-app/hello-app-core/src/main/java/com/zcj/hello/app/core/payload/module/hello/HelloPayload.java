package com.zcj.hello.app.core.payload.module.hello;

import lombok.Data;

import java.io.Serializable;

/**
 * {@code HelloPayload} 请求体对象
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public class HelloPayload implements Serializable {

    private static final long serialVersionUID = -6700798658553610817L;

    @Data
    public static class HelloInputPayload {
        private Long id;
        private String name;
    }
}
