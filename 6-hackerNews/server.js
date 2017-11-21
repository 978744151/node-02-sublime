var express = require('express');

var config = require('./config')
var bodyParser = require('body-parser')
var router = require('./router')

var  path = require('path');
//2. 实例化
var app = express();

app.set('views',path.join(__dirname,'./views'));
//4.2 自定义 html
app.engine('html',require('ejs').renderFile);
//4.3 开始使用模板引擎
app.set('view engine','html');

app.use(bodyParser.urlencoded({extended:false}))
app.use(router);
 
  app.listen(config.port,function () {
    console.log(`服务器开启了 http://localhost:${ config.port }`)
  })