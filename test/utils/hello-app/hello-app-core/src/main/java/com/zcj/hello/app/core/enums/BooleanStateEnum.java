package com.zcj.hello.app.core.enums;

import com.photowey.core.validator.Validator;

/**
 * {@code BooleanStateEnum} 布尔值-枚举类
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public enum BooleanStateEnum {
    /**
     * 真
     */
    TRUE(Boolean.TRUE, "1", 1),
    /**
     * 假
     */
    FALSE(Boolean.FALSE, "0", 0),
    /**
     * 默认值
     */
    DEFAULT(Boolean.FALSE, "-1", -1);

    private Boolean name;
    private String valueStr;
    private int value;

    BooleanStateEnum(Boolean name, String valueStr, int value) {
        this.name = name;
        this.valueStr = valueStr;
        this.value = value;
    }

    public static BooleanStateEnum valueOf(Integer value) {
        if (Validator.isNullOrEmpty(value)) {
            return null;
        }
        int var = value.intValue();
        for (BooleanStateEnum e : BooleanStateEnum.values()) {
            if (e.value() == var) {
                return e;
            }
        }
        return null;
    }

    public String valueStr() {
        return valueStr;
    }

    public int value() {
        return value;
    }
}

