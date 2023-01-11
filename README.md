# note for KiviBot

[![npm-version](https://img.shields.io/npm/v/kivibot-plugin-bgtool?color=527dec&label=kivibot-plugin-bgtool&style=flat-square)](https://npm.im/kivibot-plugin-bgtool)
[![dm](https://shields.io/npm/dm/kivibot-plugin-bgtool?style=flat-square)](https://npm.im/kivibot-plugin-bgtool)

[`KiviBot`](https://beta.kivibot.com) 的 [桌游小工具]() 插件。

### 安装

```shell
/plugin add bgtool
```

### 启用

```shell
/plugin on bgtool
```

### 重载

```shell
/plugin reload bgtool
```

### 使用

**掷骰**

```
roll <n?>d<B> [<m?>d<F>...]
骰n个B面骰，后面可无限跟，中间空格分隔。前面参数n可空，为1个骰子

例：roll d6 1d8 2d20
为投1个6面骰，1个8面骰和2个20面骰
```

**自定义骰子**

```
1. createdice <骰子名> [面1，面2，面3...]
例：createdice newDice a,b,c,d,e
创建自定义骰子，骰面中间用中/英文逗号隔开，指令中间空格隔开
```

```
2. croll <骰子名> <次数>
例：croll newDice 3
投自定义骰子“newDice” 3次
```

```
3. rmdice <骰子名>
例：rmdice newDice
删除自定义骰子“newDice”
```

```
4. showdice
列出所有自定义骰子
```

**决定起始玩家**

```
pickfirst <n>
n为人数，返回 1-n 的某个数字，代表起始玩家

例：pickfirst 6
返回 1-6 的某个数字，代表该号玩家为起始玩家
```

### 待办事项

- [x] 添加自定义骰子
- [ ] 其他玩桌游时能用到的功能（考虑中）

### 其他

有问题可通过`KiviBot Beta 交流群` 群内私聊 QQ 号 `981442990`
