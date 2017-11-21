// 加载模块
var  path = require('path')
var mongodb = require('mongodb')
var config = require('./config')
var db = require('./db')
// index
module.exports.index = function (req,res) {

  db.findAll('news01',function(docs){
   
    res.render('index',{list:docs})
  })
  //2.1 连接对象
  // var mc = mongodb.MongoClient;
  // //2.2 连接字符串
  // var url = config.dbUrl;
  // //2.3 开始连接
  // mc.connect(url, function (err,db) {
  //   if (err) {
  //     throw err
  //   }
  //   db.collection('news').find().toArray(function(err,doc){
  //     if(err){
  //       throw err;
  //     }
  //     db.close()
  //     res.render('index',{list:doc})
  //   })
  // })
}
// detail
module.exports.detail = function (req, res) {
  
    //1. 获取 _id
    // console.log(req.query._id)
    // var _id = req.query._id;  类型不匹配
    // string -> objectId 继承  object 
    var _id = mongodb.ObjectId(req.query.id);
  
    // console.log(typeof _id);
  
    //2. 可以根据条件查找
    //2.1 连接对象
    var mc = mongodb.MongoClient;
    //2.2 连接字符串
    var url = 'mongodb://127.0.0.1:27017/test1104'
    //2.3 开始连接
    mc.connect(url, function (err, db) {
      if (err) {
        throw err
      }
  
      //2.4 根据已有条件进行条件查询
      db.collection('news01').findOne({
        _id: _id
      }, function (err, doc) {
  
        if (err) {
          throw err
        }
  
        //2.5 关闭数据库
        db.close();
  
        // console.log(doc)
        //3. 渲染
        res.render('detail', {
          list: doc
        })
      })
    })
  }

  module.exports.submit = function (req, res) {
    
      res.render('submit')
    }
    
module.exports.addGet =function(req,res){
  var obj = {
    title: req.query.title,
    url: req.query.url,
    text: req.query.text
  };
  console.log(obj);
  //2. 插入到数据库
  //2.1 连接对象
  var mc = mongodb.MongoClient;
  //2.2 连接字符串
  var url = 'mongodb://127.0.0.1:27017/test1104'
  //2.3 开始连接
  mc.connect(url, function (err, db) {
    if (err) {
      throw err
    }
    db.collection('news01').insertOne(obj,function(err){
      if(err){
        throw err;
      }
      db.close()
      
            //3. 重定向
      res.redirect('/');
    })
  })
}

//add post
module.exports.addPost = function (req, res) {
  
    //1. 获取新的对象
    // var obj = 
    console.log(req.body,1);
    // var  obj = req.body;
    var obj = {
      title: req.body.title,
      url: req.body.url,
      text: req.body.text
    }
  
    //2. 插入到数据库
    //2.1 连接对象
    var mc = mongodb.MongoClient;
    //2.2 连接字符串
    var url = 'mongodb://127.0.0.1:27017/test1104'
    //2.3 开始连接
    mc.connect(url, function (err, db) {
      if (err) {
        throw err
      }
      //2.4 插入数据
      db.collection('news01').insertOne(obj, function (err) {
        if (err) {
          throw err
        }
  
        //2.5 关闭数据库
        db.close();
  
        console.log('插入数据成功');
  
        //3. 重定向
        res.redirect('/');
  
      })
    })
  }