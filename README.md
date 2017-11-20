# 牙牙星球h5项目
---

## 项目基于vue框架和webpack多页面打包，每一个模块为一个页面(跟客户端进行混合式开发，无需采用单页面)

    关于vue的版本可以具体查看项目的package.json文件

    关于webpack可以查看webpack.config.js 和 src下面的env文件的配置

## 项目的目录
	src            --项目的开发目录

	  + common        --公共的文件

	  + env           --webpack的各种环境的配置文件

	  + app           --应用文件

	  	++ 项目
	  	  +++ assets     --存放静态资源的目录(每个模块可新建一个目录)
	  	  +++ entrys     --模块的入口文件
	  	  +++ style      --模块的样式文件(推荐用less预处理)
	  	  +++ template   --模块的模板文件

	nodeModules    --npm模块的

	dist           --静态文件的生成目录


#### 项目的下载与运行
    1.首先git clone git@gitlab.9zhitx.com:server/h5-planet.git;

    2.cd h5-planet 目录然后执行

    npm install

    3.安装完成执行启动服务

    需要修改src/env/local.js host_name为本机ip地址方便手机测试

    npm run dev

#### 项目的新建与开发

    entrys、style、template目录内尽量不要新建文件夹，每一个模块新建一个命名文件，保证目录结构简单清晰

#### 项目的发布

    首先到http://192.168.1.196/jenkins/job/h5-planet/

	1.发布测试需修改配置为

	run build-test run upload-test

	2.发布预发需修改配置为

	run build-demo run upload-demo

	1.发布正式需修改配置为

	run build-release run upload-release



