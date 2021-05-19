# $ shark deploy
## 子选项
* "-b, --branch \<branch\>" 该项目在SVN中的具体分支.
* "-e,--env \<environment\>" 项目发布到那个环境.
* "-m,--machine \<machineRoom\>" 项目发布到那个机房.

```shell
## 1.采用子选项
$ shark deploy -b <branch> -e <environment> -m <machineRoom>
# 比如:
$ shark deploy -b trunk -e test -m zcj

## 2.不采用子选项
# 此时,$shark 会自动发起询问.
$ shark deploy ## 此时,命令行会发起询问.
```