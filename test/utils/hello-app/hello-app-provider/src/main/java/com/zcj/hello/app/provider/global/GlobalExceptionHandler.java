package com.zcj.hello.app.provider.global;

import com.gmsoft.query.autoconfigure.global.AbstractGlobalExceptionAdapter;
import com.gmsoft.query.autoconfigure.global.ExceptionDTO;
import com.gmsoft.query.core.exception.AbstractException;
import com.gmsoft.query.core.exception.BizException;
import com.gmsoft.query.core.exception.QueryException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * {@code GlobalExceptionHandler}
 * 自定义抛出的异常::统一处理 RequestParam(required = true) RequestBody(Validated) 抛出的验证 exception
 *
 * @author photowey
 * @date 2021/01/18
 * @since 1.0.0
 */
@Slf4j
@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler extends AbstractGlobalExceptionAdapter {

    /**
     * 处理自定义 异常
     *
     * @param exception Throwable
     * @param request   HttpServletRequest
     * @param response  HttpServletResponse
     * @return ResponseEntity
     * @throws Exception
     */
    @Override
    @ResponseBody
    @ExceptionHandler(value = {BizException.class, QueryException.class})
    public ResponseEntity<ExceptionDTO> handleBizException(AbstractException exception, HttpServletRequest request,
                                                           HttpServletResponse response) throws Exception {
        try {
            int status = exception.getStatus();
            if (HttpStatus.UNAUTHORIZED.value() == status) {
                return new ResponseEntity<>(new ExceptionDTO(401, "系统检查到您未登陆, 请前往登陆!"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.error("handle @{com.gmsoft.query.core.exception.BizException} exception", e);
            exception.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }

        return super.handleBizException(exception, request, response);
    }

    /**
     * 处理系统异常
     *
     * @param exception Throwable
     * @param request   HttpServletRequest
     * @param response  HttpServletResponse
     * @return ResponseEntity
     * @throws Exception
     */
    @Override
    @ResponseBody
    @ExceptionHandler(value = {Throwable.class})
    public ResponseEntity<ExceptionDTO> handleSystemException(Throwable
                                                                      exception, HttpServletRequest request,
                                                              HttpServletResponse response) throws Exception {
        return super.handleInnerSystemException(exception, request, response);
    }
}
