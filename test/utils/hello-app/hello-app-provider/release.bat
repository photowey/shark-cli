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

set serverIp=192.168.2.12
set serverPort=22
set serverUser=root
set serverPath=/opt/gec/hello-app


cd /d %~dp0
:update_source_code
echo provider-check out the latest code from svn...
svn update>nul

:clean_project
echo provider-clear the program...
call mvn clean -Dmaven.test.skip=true
if not "%errorlevel%"=="0" (
	echo provider-clear failure,check not close file yet...
	goto eof
)

:package_project
echo provider-package the code...
call mvn package -Dmaven.test.skip=true -U  %*
if not "%errorlevel%"=="0" (
	echo provider-package failure,check please...
	goto eof
)

:upload_zip
echo provider-upload the code...
ssh -p %serverPort% %serverUser%@%serverIp% "mkdir -p %serverPath%"
scp -P %serverPort% ./target/*.jar %serverUser%@%serverIp%:%serverPath%
scp -P %serverPort% ./target/classes/server.sh %serverUser%@%serverIp%:%serverPath%
ssh -p %serverPort% %serverUser%@%serverIp% "chmod +x %serverPath%/server.sh"

:start_service
echo provider-restart the service...
ssh -p %serverPort% %serverUser%@%serverIp% %serverPath%/server.sh restart"
if not "%errorlevel%"=="0" (
	echo provider-start the service failure
	goto eof
)
goto ok

:eof
pause>nul
exit /b 1

:ok
exit /b 0