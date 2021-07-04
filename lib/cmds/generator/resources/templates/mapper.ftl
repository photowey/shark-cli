package ${package.mapper};

import ${package.entity}.${entity};
import ${package.dto}.${dto};
import org.springframework.stereotype.Component;
import com.gmsoft.query.autoconfigure.service.mapper.AbstractEntityMapperAdaptor;

/**
 * ${tableInfo.mapperName}
 * Mapper for the entity ${entity} and its DTO ${dto}.
 *
 * @author ${author}
 * @date ${date}
 * @since ${version}
 */
@Component
public class ${tableInfo.mapperName} extends AbstractEntityMapperAdaptor<${dto}, ${entity}> {

}
