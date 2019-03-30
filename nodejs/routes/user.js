//引入模块
const express = require("express")
const pool = require("../pool")
const multiparty = require("multiparty")
const fs = require("fs")
let router = express.Router()
//定义变量格式验证
let uidRegex = /^\d*$/
let phoneRegex = /^1[34578]\d{9}$/
let upwdRegex = /^[a-zA-Z\d_]{6,12}$/
//用户登陆 /login post phone upwd
router.post("/login", (req, res) => {
  //获取请求主体中的phone,upwd
  let {
    phone,
    upwd
  } = req.body
  //验证格式
  if (!phoneRegex.test(phone)) {
    res.send({
      code: 401,
      msg: "手机号格式不正确"
    })
    return
  }
  if (!upwdRegex.test(upwd)) {
    res.send({
      code: 402,
      msg: "密码格式不正确"
    })
    return
  }
  //操作数据库查询用户名密码是否正确
  let sql = "select uid, nick from user where phone = ? and upwd = ?"
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err
    if (result.length > 0) { //用户名密码正确
      //将用户数据存入session
      req.session.uid = result[0].uid
      req.session.nick = result[0].nick
      //响应json数据
      res.send({
        code: 200,
        msg: "登录成功"
      })
    } else { //用户名或密码错误
      //响应json数据
      res.send({
        code: 301,
        msg: "用户名或密码错误"
      })
    }
  })
})
//用户登录状态验证,登录状态则返回用户昵称
router.get("/state", (req, res) => {
  if (req.session.uid === undefined) //根据cookie凭证验证session中有无uid数据
    //session为空
    res.send({
      code: 401,
      msg: "用户未登录"
    })
  //session非空
  else
    res.send({
      code: 200,
      msg: req.session.nick //返回用户昵称
    })
})
//用户注销登录
router.get("/logout", (req, res) => {
  //删除session的uid属性
  delete req.session.uid
  //响应操作成功
  res.send({
    code: 200,
    msg: "注销成功"
  })
})
//用户注册 /register post identify phone upwd
router.post("/register", (req, res) => {
  //取出请求主体中的phone,upwd,identify(手机验证码)
  let {
    phone,
    upwd,
    identify
  } = req.body
  //强制转为数值
  identify = parseInt(identify)
  //验证手机格式
  if (!phoneRegex.test(phone)) {
    res.send({
      code: 401,
      msg: "手机号格式不正确"
    })
    return
  }
  //验证密码格式
  if (!upwdRegex.test(upwd)) {
    res.send({
      code: 402,
      msg: "密码格式不正确"
    })
    return
  }
  //验证手机验证码格式
  if (identify !== req.session.yzm) {
    res.send({
      code: 403,
      msg: "验证码不正确"
    })
    return
  }
  //查询数据库，验证手机号是否注册
  let sql = "select uid from user where phone = ?"
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err
    if (result.length > 0) { //查询结果数组非空，手机号已被注册
      res.send({
        code: 301,
        msg: "该手机号已经被注册"
      })
    } else { //查询结果数组为空，手机号未被注册
      //查询数据库，插入新注册的用户手机号和密码
      let sql = "insert into user(phone, upwd) values(?, ?)"
      pool.query(sql, [phone, upwd], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) { //插入影响的行数大于0，成功注册
          res.send({
            code: 200,
            msg: "注册成功"
          })
        }
      })
    }
  })

})
//重置密码 /forget post phone identify upwd repwd
router.post("/forget", (req, res) => {
  //取出请求主体中的phone,identify,upwd,repwd属性
  let {
    phone,
    identify,
    upwd,
    repwd
  } = req.body
  //强制转为整数
  identify = parseInt(identify)
  //手机号格式验证
  if (!phoneRegex.test(phone)) { //验证不通过
    res.send({
      code: 401,
      msg: "手机号格式不正确"
    })
    return
  }
  //密码验证
  if (!upwdRegex.test(upwd)) {
    res.send({
      code: 402,
      msg: "密码格式不正确"
    })
    return
  }
  //两次输入密码一致性验证
  if (upwd !== repwd) {
    res.send({
      code: 403,
      msg: "两次密码不一致"
    })
    return
  }
  //手机验证码校对
  if (identify !== req.session.yzm) {
    res.send({
      code: 404,
      msg: "验证码不正确"
    })
    return
  }
  //更新数据库的用户表phone对应的upwd字段
  let sql = "update user set upwd = ? where phone = ?"
  pool.query(sql, [upwd, phone], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0) { //更新成功
      res.send({
        code: 200,
        msg: "修改密码成功"
      })
    } else { //更新失败
      res.send({
        code: 301,
        msg: "手机号未注册"
      })
    }
  })
})
//添加/修改信息 /add uid userName addr nick
router.post("/add", (req, res) => {
  //取出请求主体中的uid,userName,addr,nick属性,使用对象结构的默认值写法
  let {
    uid,
    userName = null,
    addr = null,
    nick = null
  } = req.body
  //验证用户编号格式
  if (!uidRegex.test(uid)) {
    res.send({
      code: 401,
      msg: "用户编号格式不正确"
    })
    return
  }
  // console.log(userName,addr)
  // console.log(typeof nick)
  // if (!userName) {
  //   userName = null
  // }
  // if (!addr) {
  //   addr = null
  // }
  // if (!nick) {
  //   nick = null
  // }
  //更新数据库中的用户信息
  let sql = "update user set userName = ?, addr = ?, nick = ? where uid = ?"
  pool.query(sql, [userName, addr, nick, uid], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0) { //更新成功
      res.send({
        code: 200,
        msg: "修改个人信息成功"
      })
    } else {
      res.send({ //更新失败
        code: 301,
        msg: "修改个人信息失败"
      })
    }
  })
})
//修改头像 /updateAvatar uid post
router.post("/avatar", (req, res) => {
  //创建表单对象
  let form = new multiparty.Form(req.files)
  form.uploadDir = "../public/img/user" //设置图片存储路径
  form.keepExtensions = true //保留后缀
  form.maxFiledsSize = 2 * 1024 * 1024 //内存大小
  form.maxFilesSize = 5 * 1024 * 1024 //文件字节大小限制，超出时会报错
  //表单解析
  form.parse(req, function (err, fields, files) {
    if (err) { //上传文件大小超出限制
      console.log(err)
      res.send({
        code: 401,
        msg: "请上传5m以下的图片"
      })
      return
    }
    // console.log(fields)
    //获取路径
    let oldpath = files.avatar[0]["path"],
      suffix
    //文件后缀验证格式
    if (oldpath.indexOf(".jpg") >= 0) { //.jgp
      suffix = ".jpg"
    } else if (oldpath.indexOf(".png") >= 0) { //.png
      suffix = ".png"
    } else if (oldpath.indexOf(".gif") >= 0) { //.gif
      suffix = ".gif"
    } else { //上传的文件为未知格式，响应错误信息
      res.send({
        code: 402,
        msg: "请上传正确格式"
      })
      return
    }
    let sql = "select uid from user where uid = ?",
      imgId, //存储图片Id
      fileName //存储图片保存的名称
    //查询数据库是否存在用户编号对应的用户 
    pool.query(sql, [fields.uid], yzuser)
    /**
     * 删除未成功添加的图片
     */
    function shanchu() {
      fs.unlinkSync(oldpath)
      console.log("删除文件")
    }
    /**
     * 对查询数据库是否存在用户编号对应的用户的结果进行处理
     * @param {*} err 错误信息 
     * @param {*} result 操作数据库的结果集合
     */
    function yzuser(err, result) {
      if (err) throw err
      if (result.length > 0) { //用户存在
        //查询用户头像表中数据条数
        sql = "select max(uid) as uid from user_img"
        pool.query(sql, upload)
      } else { //用户不存在
        res.send({
          code: 300,
          msg: "该用户不存在"
        })
        shanchu() //删除未登记的图片
        return
      }

    }
    /**
     * 对查询用户头像表中数据条数的结果进行处理
     * @param {*} err 错误信息 
     * @param {*} result 操作数据库的结果集合
     */
    function upload(err, result) {
      if (err) throw err
      //获取当前用户头像表的数据条数，并+1作为待登记的图片Id
      imgId = result[0].uid + 1
      //为待登记的图片取名
      fileName = "avatar_" + imgId + suffix
      //为待登记的图片的路径取值
      let url = "../public/img/user/" + fileName
      //将原图片改名为新取的名称
      fs.renameSync(oldpath, url)
      //将该图片信息插入到数据库中的用户头像表
      sql = "insert into user_img values(?,?)"
      pool.query(sql, [imgId, fileName], insert)
    }
    /**
     * 对将该图片信息插入到数据库中的用户头像表的结果进行处理
     * @param {*} err 错误信息 
     * @param {*} result 操作数据库的结果集合
     */
    function insert(err, result) {
      if (err) throw err
      if (result.affectedRows > 0) { //插入成功
        //更新数据库用户表中的头像字段
        sql = "update user set imgId = ? where uid = ?"
        pool.query(sql, [imgId, fields.uid], modify)
      } else { //插入失败
        res.send({
          code: 301,
          msg: "修改失败"
        })
        shanchu() //删除无用图片
        return
      }
    }
    /**
     * 对更新数据库用户表中的头像字段的结果进行处理
     * @param {*} err 错误信息 
     * @param {*} result 操作数据库的结果集合
     */
    function modify(err, result) {
      if (err) throw err
      if (result.affectedRows > 0) { //更新成功
        res.send({
          code: 200,
          msg: "修改头像成功"
        })
      } else { //更新失败
        res.send({
          code: 302,
          msg: "用户不匹配"
        })
        shanchu() //删除无用图片
        return
      }
    }
  })
})
//验证手机号，获取验证码 /yzm phone
router.get("/yzm", (req, res) => {

  //取出请求中的查询字符串的phone值
  let phone = req.query.phone,
    {
      random,
      floor
    } = Math
  //验证手机号格式
  if (!phoneRegex.test(phone)) {
    res.send({
      code: 401,
      msg: "手机号格式不正确"
    })
    return
  }
  //生成4位随机验证码
  let yanzhengma = floor(1000 + random() * 9000)
  //存储在session中
  req.session.yzm = yanzhengma
  console.log(yanzhengma)
  res.send({
    code: 200,
    msg: "生成验证码"
  })
})
//获取用户信息
module.exports = router