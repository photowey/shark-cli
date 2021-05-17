package com.zcj.hello.app.provider.config;

import com.gec.org.LoginUser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * {@code SwaggerConfiguration} 配置
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    public static final String API_TITLE = "project-template";
    public static final String API_DESCRIPTION = "project-template";
    public static final String GROUP_NAME = "project-template";
    public static final String CONTROLLER_BASE_PACKAGE = "com.zcj.hello.app.provider.controller";
    public static final String SWAGGER_API_INFO_BEAN_NAME = "swagger-project-template-api-info";
    public static final String SWAGGER_DOCKET_BEAN_NAME = "swagger-project-template-docket";

    /**
     * {@link ApiInfo}
     *
     * @return {@link ApiInfo}
     */
    @Bean(SWAGGER_API_INFO_BEAN_NAME)
    public ApiInfo apiInfo() {
        ApiInfo apiInfo = new ApiInfoBuilder()
                .title(API_TITLE)
                .description(API_DESCRIPTION)
                .build();

        return apiInfo;
    }

    /**
     * {@link Docket}
     *
     * @return {@link Docket}
     */
    @Bean(SWAGGER_DOCKET_BEAN_NAME)
    public Docket apiDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(this.apiInfo())
                .groupName(GROUP_NAME)
                .ignoredParameterTypes(LoginUser.class)
                .select()
                .paths(PathSelectors.any())
                .apis(RequestHandlerSelectors.basePackage(CONTROLLER_BASE_PACKAGE))
                .build();
    }
}
