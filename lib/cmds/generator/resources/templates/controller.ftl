package ${package.controller};

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import com.gmsoft.query.autoconfigure.controller.AbstractController;
import ${package.entity}.${entity};
import lombok.extern.slf4j.Slf4j;

/**
 * ${tableInfo.comment} 控制器
 *
 * @author ${author}
 * @date ${date}
 * @since ${version}
 */
@Slf4j
@RestController
@RequestMapping("/${tableInfo.controllerMapping}" )
public class ${tableInfo.controllerName} extends AbstractController<${entity}> {

}