@echo off&setlocal enabledelayedexpansion

set jdk=jdk11
:determine_java
set javaHomeStr=JAVA_HOME_%jdk:~3%
set javaHomeVar=!%javaHomeStr%!
if "%javaHomeVar%" neq "" (
  set JAVA_HOME=!javaHomeVar!
) else (
  set javaDir=C:\Program Files\Java\!jdk!
  if exist !javaDir! (
     set JAVA_HOME=!javaDir!
  )
)

cd /d %~dp0
echo parent-update the latest code...
svn update>nul
echo parent-publish the program...
call mvn clean -Dmaven.test.skip=true source:jar deploy -pl hello-app-core,hello-app-client,hello-app-repository,hello-app-service -am %*
if not "%errorlevel%"=="0" (echo publish failure & pause>nul)