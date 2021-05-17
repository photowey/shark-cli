package org.springframework.cloud.logging;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.context.properties.bind.Bindable;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.boot.logging.LogLevel;
import org.springframework.boot.logging.LoggingSystem;
import org.springframework.cloud.context.environment.EnvironmentChangeEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;

import java.util.Collections;
import java.util.Map;

/**
 * Listener that looks for {@link org.springframework.cloud.context.environment.EnvironmentChangeEvent} and rebinds logger levels if any
 * changed.
 *
 * @author Dave Syer
 */
public class LoggingRebinder
        implements ApplicationListener<EnvironmentChangeEvent>, EnvironmentAware {

    private static final Bindable<Map<String, String>> STRING_STRING_MAP = Bindable
            .mapOf(String.class, String.class);

    private final Log logger = LogFactory.getLog(getClass());

    private Environment environment;

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void onApplicationEvent(EnvironmentChangeEvent event) {
        if (this.environment == null) {
            return;
        }
        LoggingSystem system = LoggingSystem.get(LoggingSystem.class.getClassLoader());
        setLogLevels(system, this.environment);
    }

    protected void setLogLevels(LoggingSystem system, Environment environment) {
        Map<String, String> levels = Binder.get(environment)
                .bind("logging.level", STRING_STRING_MAP)
                .orElseGet(Collections::emptyMap);
        for (Map.Entry<String, String> entry : levels.entrySet()) {
            setLogLevel(system, environment, entry.getKey(), entry.getValue().toString());
        }
    }

    private void setLogLevel(LoggingSystem system, Environment environment, String name, String level) {
        try {
            if (name.equalsIgnoreCase("root")) {
                name = null;
            }
            // convert the level if necessary
            if ("false".equals(level)) {
                level = "off";
            }
            level = environment.resolvePlaceholders(level);
            system.setLogLevel(name, LogLevel.valueOf(level.toUpperCase()));
        } catch (RuntimeException ex) {
            this.logger.error("Cannot set level: " + level + " for '" + name + "'");
        }
    }

}
