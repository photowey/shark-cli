<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE guzz-configs PUBLIC "-//GUZZ//DTD MAIN CONFIG//EN" "http://www.guzz.org/dtd/guzz.dtd">
<guzz-configs>
    <dialect class="org.guzz.dialect.Mysql5Dialect"/>
    <tran>
        <dbgroup name="default" masterDBConfigName="masterDB"/>
    </tran>
    <config-server>
        <server class="com.gmsoft.persistence.dao.guzzImpl.EnvConfigServer">
        </server>
    </config-server>
    <import resource="classpath:com/gmsoft/persistence/guzz.xml"/>

<#list businesses as business>
    <business dbgroup="default" name="${business.name}" file="classpath:${business.file}.hbm.xml"/>
</#list>

</guzz-configs>