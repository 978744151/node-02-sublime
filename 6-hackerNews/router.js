var express=require('express');
var config = require('./config')
var handler =require('./hanlder')
var path =require('path')
var router = express.Router();
var  path = require('path');
    
router.get('/',handler.index)
router.get('/index',handler.index);

router.get('/detail',handler.detail);

router.get('/submit',handler.submit)

router.get('/add',handler.addGet);

router.post('/add',handler.addPost)

router.use('/resources',express.static(path.join(__dirname,'/resources')))

// 到处router
module.exports = router;
