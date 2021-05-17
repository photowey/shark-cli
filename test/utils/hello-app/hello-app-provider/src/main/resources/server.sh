#!/bin/bash
source /etc/profile

#jar文件的名称(不要.jar后缀)
finalName=@project.artifactId@

#虚拟机启动参数
JAVA_OPTS="-Xms512m -Xmx512m -Xmn256m -XX:MaxPermSize=128m  -Djava.awt.headless=true "

#应用程序参数
ARG_OPTS=" --spring.cloud.config.uri=@spring.cloud.config.uri@ "
ARG_OPTS="$ARG_OPTS --spring.cloud.config.label=@spring.cloud.config.label@ "
ARG_OPTS="$ARG_OPTS --spring.cloud.config.profile=@spring.cloud.config.profile@ "


#等待启动或关闭命令超时时间，单位s
TIME_OUT=90

#应用目录
#BASE_DIR=
if [ -z "$BASE_DIR" ] ; then
  BASE_DIR=`dirname "$0"`
  BASE_DIR=`cd "$BASE_DIR" && pwd`
fi
mkdir -p $BASE_DIR/logs
PID_FILE=$BASE_DIR/logs/.run.pid


###################################
#(函数)判断程序是否已启动
#
#说明：
# 检查pid文件记录的进程是否存在
###################################
#初始化psid变量（全局）
psid=0
checkpid() {
   if [ -f "$PID_FILE" ]; then
   		pid=$(cat "$PID_FILE")
   		process=`ps aux | grep " $pid " | grep -v grep`;
   		if [ -n "$process" ]; then
   	    	psid=$pid;
   		else
   			psid=0;
   		fi
   	else
   		psid=0
   	fi

   #javaps=`$JAVA_HOME/bin/jps -l | grep $finalName.jar`
   #if [ -n "$javaps" ]; then
   #   psid=`echo $javaps | awk '{print $1}'`
   #else
   #   psid=0
   #fi
}

JOKE="黄忠60岁跟刘备，姜子牙80岁为丞相，孙悟空500岁西天取经，白素贞1000多岁才谈恋爱。年轻人，你说你急神马急...盖茨39岁成世界首富，孙中山28岁创办兴中会，孙权19岁据江东，康熙6岁登基当皇帝，贝多芬4岁就能作曲，葫芦娃刚出生就会打妖怪..."
joke()
{
    len=${#JOKE}
    index=$(($1%len))
    echo -n ${JOKE:$index:1}
}



###################################
#(函数)启动程序
#
#说明：
#1. 首先调用checkpid函数，刷新$psid全局变量
#2. 如果程序已经启动（$psid不等于0），则提示程序已启动
#3. 如果程序没有被启动，则执行启动命令行
#4. 启动后通过循环检查pid监听端口来判断是否启动成功
###################################
start() {
   checkpid

   if [ $psid -ne 0 ]; then
      echo "================================"
      echo "warn: $finalName already started! (pid=$psid)"
      echo "================================"
      return 0;
   else
      echo -n "Starting $finalName..."
      nohup $JAVA_HOME/bin/java -jar -Dproject=$finalName  $JAVA_OPTS  $BASE_DIR/$finalName.jar $ARG_OPTS $@> $BASE_DIR/logs/server.out 2>&1 &
      echo $! > $PID_FILE
      WAIT_LEN=${#WAIT[*]}
      for((i=0; i<TIME_OUT*4; i++ )); do
        sleep 0.25
        checkpid
        if [ $psid -eq 0 ]; then
            break;
        else
           port=`netstat -tlnp|grep $psid`
           if [ -n "$port" ]; then break; fi
           joke $i
        fi
      done
      checkpid
      if [ $psid -ne 0 ]; then
         echo "(pid=$psid) [OK]"
         return 0
      else
         echo "[Failed]"
         return 1
      fi
   fi
}

###################################
#(函数)停止程序
#
#说明：
#1. 首先调用checkpid函数，刷新$psid全局变量
#2. 如果程序已经启动（$psid不等于0），则开始执行停止，否则，提示程序未运行
#3. 使用kill pid命令进行强制杀死进程
#4. 反复检查checkpid，等待关闭结束
###################################
stop() {
   checkpid
   if [ $psid -ne 0 ]; then
      pid=$psid
      echo -n "Stopping $finalName..."
      kill $psid

      checkpid
      for((i=1; i<=TIME_OUT*4; i++ )); do
        sleep 0.25
        echo -n .
        checkpid
        if [ $psid -eq 0 ]; then
           break;
        fi
      done

      checkpid
      if [ $psid -eq 0 ]; then
        echo "(pid=${pid})[OK]"
        return 0
      else
        echo "[FAILED]"
        return 1
      fi
   else
      echo "================================"
      echo "warn: $finalName is not running"
      echo "================================"
      return 0
   fi
}

###################################
#(函数)检查程序运行状态
#
#说明：
#1. 首先调用checkpid函数，刷新$psid全局变量
#2. 如果程序已经启动（$psid不等于0），则提示正在运行并表示出pid
#3. 否则，提示程序未运行
###################################
status() {
   checkpid

   if [ $psid -ne 0 ];  then
      echo "$finalName is running! (pid=$psid)"
   else
      echo "$finalName is not running"
   fi
}

###################################
#(函数)打印系统环境参数
###################################
info() {
   echo "System Information:"
   echo "****************************"
   echo `head -n 1 /etc/issue`
   echo `uname -a`
   echo
   echo "JAVA_HOME=$JAVA_HOME"
   echo `$JAVA_HOME/bin/java -version`
   echo
   echo "APP_HOME=$BASE_DIR"
   echo "APP_NAME=$finalName"
   echo "****************************"
}

###################################
#读取脚本的第一个参数($1)，进行判断
#参数取值范围：{start|stop|restart|status|info}
#如参数不在指定范围之内，则打印帮助信息
###################################
err_code=0
case "$1" in
   'start')
      start $@;
      err_code=$?
      ;;
   'stop')
     stop $@;
     err_code=$?
     ;;
   'restart')
     stop $@;
     start $@;
     err_code=$?
     ;;
   'status')
     status $@;
     ;;
   'info')
     info $@;
     ;;
  *)
    echo "Usage: $0 {start|stop|restart|status|info}"
    exit 1
esac

if [ $err_code -ne 0 ]; then
  echo "****************************"
  tail -20 $BASE_DIR/logs/server.out
  echo "****************************"
fi
exit $err_code