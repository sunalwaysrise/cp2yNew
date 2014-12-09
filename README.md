#新版前端
=======
##使用require进行分模块协作

* requireJs
* jquery
* bootstrap[依赖jquery]
* _ util_ ** 工具模块：**提供弹窗,提示消息,基本算法,原生方法扩展,依赖`jquery`,`bootstrap`
* _ user_ ** 用户模块：**提供注册,登录方法,依赖`util`
* _ lottery_ ** 数字彩模块：**提供数字彩需要的通用方法,定义数字彩的流程,依赖`jquery`,`bootstrap`,`util`,`user`
* _ issues_ ** 倍投模块：**提供倍投计算,智能追号方法等所有关于奖期的方法,依赖`jquery`,`util`
* _100xx_ ** 主模块：**完成该模块的所有操作,依赖以上所有的模块
