# $ shark create
## 子选项
* "-p,--project \<project\>" 创建的项目的工程名(比如: hello-app)。
* "--path \<project-path\>" 在那个位置创建该项目。
* "-e,--env \<environment\>" 创建后初次，发布到那个环境。
* "-m,--machine \<machineRoom\>" 创建后初次，发布到那个机房。

```shell
## 1.不采用子选项 直接在子命令后面根参数(args):
# 此时,$shark 会自动发起询问.
$ shark create <project-name>
$ shark create hello-app ## 如果没有 -e 和 -m 的子选项,命令行会发起询问。

## 2.采用子选项
# 此时,$shark 会自动发起询问.
$ shark create -p hello-app -e test -m zcj
```

