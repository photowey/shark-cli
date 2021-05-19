# $ shark register
## 子选项
* "-p, --project \<project-code\>" 项目名称(也可以理解为别名).  
  -- 当该项目在使用`$shark deloy`命令执行项目发布时，  
  -- 命令行发起询问，会根据当前问题,用户输入的值,去 `$shark` 的本地数据库中查找，  
  -- 对应的项目信息,进而拿到相应的：项目路径,  
  -- 这样,有一个好处就是--可以在您计算机的任何位置都可以发布您想要发布的项目。

* "-n,--name \<name\>" 项目的名称(中文(其实:是自由发挥)).
* "--path \<path\>" 当前项目的根目录(也就是: `ZCtrlCenter` 所在目录).

```shell
# 1.采用子选择
$ shark register -p <project-code> -n <project-name> --path <path>
# 比如:
$ shark register -p contract -n 政采合同 --path `d:\gmsoft-ws\zcj-contract`

# 2.不采用子选择
# 此时,$shark 会自动发起询问.
$ shark register
```