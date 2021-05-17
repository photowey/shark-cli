package com.zcj.hello.app.provider.security;

import com.gec.org.Constants;
import com.gec.org.LoginUser;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * {@code SecurityContextHolder}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
public final class SecurityContextHolder {

    private SecurityContextHolder() {
        throw new AssertionError("No " + this.getClass().getName() + " instances for you!");
    }

    public static LoginUser getLoginUser() {
        HttpServletRequest request = null;
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes == null || (request = attributes.getRequest()) == null) {
            return null;
        }
        LoginUser loginUser = (LoginUser) request.getAttribute(Constants.USER_REQUEST_KEY);
        return loginUser;
    }
}
