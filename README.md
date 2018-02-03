# koa-xbatis
极简风格的RESTful无后端Node框架，基于koa-xbatis中间件，只需要写SQL，然后直接RESTful请求，全自动CRUD

[传送门：XServer官网文档](http://www.xserver.top)

快速上手
>
	1, config/default.js 中设置数据库连接，执行npm install

	2, 提前创建好数据表，或者使用 xmodel 自动生成数据库

	3, node app.js(启动)

单独使用koa-xbatis中间件(任意koa应用均可集成)
>
	1, npm install koa-xbatis --save

	2, const xbatis = require('koa-xbatis')

	3, xbatis.init(app, nodebatis, options)

	yaml文件夹路径默认是 {project}/src/yaml/

命名规则
>
	RESTful名，【下划线分割】
	yml文件名，【下划线分割】
	yml内部方法名，【驼峰法】

框架目录结构
>
	├── app.js
	├── config
	│   ├── default.json
	│   ├── develop.json
	│   └── production.json
	├── node_modules
	├── package.json
	├── src
	│   ├── nodebatis
	│   └── yaml
	└── xbatis_modules
	    └── koa-xbatis

RESTful规则
>
	[POST]http://host:port/xbatis/MODEL_NAME/METHOD_NAME

例子
>
	以一个用户模块为例，需要对用户进行定制查询:
	[POST]http://host:port/xbatis/user/find_by_username
		post body:{"username":"cheney"}
	user.yml文件:
		findByUsername:	
    		- select * from user where username = :username

帮助联系
>
	作者:cheneyxu
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.04.29:无后端理念确认，1.0版本推出
	2017.12.05:精简更新所有依赖包
	2017.12.12:更新koa-body
	2018.02.03:更新所有依赖，增加支持多层中间层业务流转，全新1.0版本发布

