# `Shark cli`
> $ shark   
> -别名:  
> $ shk

> 是一款集后端服务创建、注册、部署为一体的命令行CLI

## 安装
* 1.yarn
    - `$ yarn global add shark-cli`
* 2.npm
    - `$ npm install -g shark-cli`
>如果执行 $ ahark 过程中找不到命令
>
>1.使用 `$ yarn global bin` 显示 `yarn` 二进制文件目录.  
>2.将其添加到 `$path` 环境变量中.  
> 比如：  
> $ yarn global bin  
>   C:\Users\Administrator\AppData\Local\Yarn\bin  

## 子命令
`子选项:`
- [create](./doc/shark-create_cn.md) 创建一个`SpringBoot`微服务项目.
- [deploy](./doc/shark-deploy_cn.md) 将执行分支的代码部署到制定的机房的目标环境.
- [register](./doc/shark-register_cn.md) 注册一个项目到本地 `$shark cli` 数据库.


## 1.0.0
> 发布日志  
> #1.初步实现:项目的创建、注册和部署命令
* $ shark create
* $ shark deploy
* $ shark registerss

# RoadMap
* 1.实现数据的逆向工程