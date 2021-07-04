package ${package.repository};

import ${package.entity}.${entity};
import org.springframework.stereotype.Repository;
import com.gmsoft.persistence.dao.InteractionAPI;
import com.gmsoft.query.autoconfigure.repository.AbstractRepository;

/**
 * $!{tableInfo.comment} Repository 接口
 *
 * @author ${author}
 * @date ${date}
 * @since ${version}
 */
@Repository
public class ${tableInfo.repositoryName} extends AbstractRepository<${entity}> {

    public ${tableInfo.repositoryName} (InteractionAPI dao) {
        super(dao);
    }
}