package com.zcj.hello.app.provider.client;

import com.gec.org.ObjectTypeEnum;
import com.gec.org.client2.OrgClient;
import com.gec.org.entity.AgentRepo;
import com.gec.org.entity.Dept;
import com.gec.org.entity.EmployeeRepo;
import com.gec.org.entity.ProviderRepo;
import com.photowey.core.validator.Validator;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * OrgClientAssistant
 *
 * @author photowey
 * @date ${date}
 * @since 1.0.0
 */
@Component
public class OrgClientAssistant {

    private final OrgClient orgClient;

    public OrgClientAssistant(OrgClient orgClient) {
        this.orgClient = orgClient;
    }

    // ============================================================================

    public ProviderRepo retrieveProviderRepo(Long providerId, String platformCode) {
        if (Validator.isNullOrEmpty(providerId)) {
            return null;
        }
        return this.orgClient.createProviderQuery()
                .referenceObject(platformCode, ObjectTypeEnum.PLAT, true)
                .orgId(providerId)
                .requireLinkmanMobile()
                .selectOne();
    }

    public List<ProviderRepo> retrieveProviderRepos(List<Long> providerIds, String platformCode) {
        if (Validator.isNullOrEmpty(providerIds)) {
            return new ArrayList<>();
        }
        return this.orgClient.createProviderQuery()
                .referenceObject(platformCode, ObjectTypeEnum.PLAT, true)
                .orgIdIn(providerIds)
                .selectList("orgId", "orgName", "effectAreaId", "effectAreaName");
    }

    public AgentRepo retrieveAgentRepo(Long agentId, String platformCode) {
        if (Validator.isNullOrEmpty(agentId)) {
            return null;
        }
        return this.orgClient.createAgentQuery()
                .referenceObject(platformCode, ObjectTypeEnum.PLAT, true)
                .orgId(agentId)
                .requireLinkmanMobile()
                .selectOne();
    }

    public EmployeeRepo retrieveEmployeeRepo(Long employeeId, String platformCode) {
        if (Validator.isNullOrEmpty(employeeId)) {
            return null;
        }
        return this.orgClient.createEmployeeQuery()
                .userId(employeeId)
                .selectOne();
    }

    // ============================================================================

    public EmployeeRepo retrieveEmployeeRepo(Long employeeId, String... properties) {
        if (Validator.isNullOrEmpty(employeeId)) {
            return null;
        }
        EmployeeRepo employeeRepo = this.orgClient.createEmployeeQuery().userId(employeeId).selectOne(properties);

        return employeeRepo;
    }

    public Dept retrieveUserDept(Long userId, Long orgId, String... properties) {
        if (Validator.isNullOrEmpty(userId)) {
            return null;
        }
        Dept dept = this.orgClient.createDeptQuery().userId(userId).orgId(orgId).selectOne(properties);

        return dept;
    }

    // ============================================================================
}
