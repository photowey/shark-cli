<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">

<hibernate-mapping>
    <class name="${package.entity}.${tableInfo.entityName}" table="${tableInfo.tableName}" catalog="${tableInfo.catalog}">
    <#list tableInfo.fields as field>
        <#if field.primaryKey == true>
        <id name="${field.propertyName}" type="${field.fieldType}">
            <column name="${field.fieldName}"/>
            <generator class="assigned"/>
        </id>
        <#else>
        <property name="${field.propertyName}" type="${field.fieldType}" column="${field.fieldName}"/>
        </#if>
    </#list>
    </class>
</hibernate-mapping>