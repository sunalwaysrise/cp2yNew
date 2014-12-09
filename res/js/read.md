requireJs
jquery
bootstrap[依赖jquery]
util[工具模块：提供弹窗，提示消息，基本算法，原生方法扩展][依赖jquery,bootstrap]
user[用户模块：提供注册，登录方法][依赖util]
lottery[数字彩模块：提供数字彩需要的通用方法，定义数字彩的流程][依赖jquery,bootstrap,util,user]
issues[倍投模块：提供倍投计算，智能追号方法等所有关于奖期的方法][依赖jquery,util]
100xx[主模块：完成该模块的所有操作][依赖以上所有的模块]
