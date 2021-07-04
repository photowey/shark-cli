package ${package.serviceImpl};

import ${package.entity}.${entity};
import ${package.repository}.${tableInfo.repositoryName};
import ${package.service}.${tableInfo.serviceName};
import org.springframework.stereotype.Service;
import com.gmsoft.query.autoconfigure.service.impl.BaseServiceImpl;
import com.gmsoft.query.autoconfigure.properties.TableProperties;
import lombok.extern.slf4j.Slf4j;

/**
 * ${tableInfo.comment} 服务实现类
 *
 * @author ${author}
 * @date ${date}
 * @since ${version}
 */
@Slf4j
@Service
public class ${tableInfo.serviceImplName} extends BaseServiceImpl<${entity},
    ${entity},${tableInfo.repositoryName}> implements ${tableInfo.serviceName} {

    public ${tableInfo.serviceImplName}(${tableInfo.repositoryName} baseRepository, TableProperties tableProperties) {
        super(baseRepository,tableProperties);
    }
}

