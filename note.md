## 版本号规范

### 参考
* https://semver.org/lang/zh-CN/
* https://juejin.cn/post/7111515461749063711

major.minor.patch[-prerelease]

### 约定

* 第一个稳定版本号为1.0.0
* beta版本号从0开始，比如：1.0.0-beta.0/2.1.0-beta.0
* 使用npm version工具进行版本升级
* prerelease只保留beta
* 只有 latest 和 beta 两个标签
* latest tag永远指向最新的稳定版本
* beta tag永远指向最新的公测版本
* 提交beta版本时，npm publish时必须加上 --tag beta 参数
* npm publish后需要给git仓库打tag，tag名称跟当前版本号一致

```
npm publish --tag beta
```

### npm version

```
npm version [ | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=] | from-git]
```

prerelease 版本升级
```
npm version prerelease --preid=beta
```

## [git提交规范](https://www.conventionalcommits.org/en/v1.0.0/)

feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动

git config --global core.autocrlf true

https://ruanyifeng.com/blog/2016/01/commit_message_change_log.html

```
node .\node_modules\husky\lib\bin add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```