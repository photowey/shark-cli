package com.zcj.hello.app.provider;

import com.djc.check.login.ext.annotation.EnableCheckLogin;
import com.gec.org.client2.EnableOrgClient;
import com.gec.org.web.EnableServicePassport;
import com.gmsoft.authen.client.EnableAuthenClient;
import com.gmsoft.core.GmConst;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * {@link App}
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Slf4j
@EnableOrgClient
@EnableCheckLogin
@EnableAuthenClient
@SpringBootApplication
@EnableDiscoveryClient
@EnableServicePassport
public class App {

    public static void main(String[] args) throws UnknownHostException {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(App.class, args);
        ConfigurableEnvironment environment = applicationContext.getEnvironment();
        doStartupLog(environment);
        doGenerateUuiIdByManual();
    }

    private static void doGenerateUuiIdByManual() {
        // 手动 调用一次 - 避免在初次调用的时候 花费很多的时间-导致超时
        long uuidLong = GmConst.uuidLong();
        log.info("==> in Application,init the uuidLong,the first id is:{}", uuidLong);
    }

    private static void doStartupLog(ConfigurableEnvironment environment) throws UnknownHostException {
        String PORT = environment.getProperty("server.port");
        String PROFILE = environment.getProperty("spring.cloud.config.profile");
        String LABEL = environment.getProperty("spring.cloud.config.label");
        String HOST = InetAddress.getLocalHost().getHostAddress();
        log.info("\n----------------------------------------------------------\n\t" +
                        "Bootstrap: '{}' is Success!\n\t" +
                        "Application: '{}' is running! Access URLs:\n\t" +
                        "Local: \t\t{}://{}:{}\n\t" +
                        "Doc: \t\t{}://{}:{}{}\n\t" +
                        "External: \t{}://{}:{}\n\t" +
                        "Health: \t{}://{}:{}/actuator/hello\n\t" +
                        "Profile(s): {}\n----------------------------------------------------------\n",
                // Bootstrap
                "project-template Service" + " Context",
                // Application
                "project-template App",
                // Local
                "http", HOST, PORT,
                // Doc
                "http", HOST, PORT, "/doc.html",
                // External
                "http", HOST, PORT,
                "http", HOST, PORT,
                // Profile(s)
                PROFILE + "-" + LABEL
        );
    }

}
