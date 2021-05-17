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

:update_source_code
echo core-the latest code...
svn update>nul

:compile_project
echo core-compile and publish...
call mvn clean -Dmaven.test.skip=true source:jar deploy
if not "%errorlevel%"=="0" (
  set msg=core module compile failure,check please...
  goto eof
)
goto ok

:eof
echo *****************************************************************
echo * core-publish failure
echo * %msg%
echo *****************************************************************
pause>nul
exit /b 1

:ok
exit /b 0
