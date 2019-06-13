//引入模块
const express = require("express")
const pool = require("../pool")
const multiparty = require("multiparty")
const fs = require("fs")
const svgCaptcha = require("svg-captcha")
let router = express.Router()
//定义变量格式验证
let uidRegex = /^\d*$/
let phoneRegex = /^1[34578]\d{9}$/
let upwdRegex = /^[a-zA-Z\d_]{6,12}$/
//13个路由
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
  let sql = "select uid, nick from user where phone = ? and upwd = md5(?)"
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err
    if (result.length > 0) { //用户名密码正确
      //将用户数据存入session
      req.session.uid = result[0].uid
      req.session.nick = result[0].nick
      //console.log(req.session.uid)
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
  // console.log(req.cookies)
  // console.log(req.session.uid)
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
      nick: req.session.nick || "", //返回用户昵称
      uid: req.session.uid //返回用户编号
    })
})
//用户注销登录
router.get("/logout", (req, res) => {
  //删除session的uid属性
  delete req.session.uid
  delete req.session.nick
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
  // console.log(!req.session.captcha)
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
  if (identify.toLowerCase() !== (req.session.captcha && req.session.captcha.toLowerCase())) {
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
      let sql = "insert into user(phone, upwd) values(?, md5(?))"
      pool.query(sql, [phone, upwd], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) { //插入影响的行数大于0，成功注册
          // console.log(result)
          req.session.uid = result.insertId
          res.send({
            code: 200,
            msg: "注册成功"
          })
        }
      })
    }
  })

})
//验证手机号是否已注册
router.get("/hasreg", (req, res) => {
  let phone = req.query.phone
  if (!phone) {
    res.send({
      code: 401,
      msg: "手机号不能为空"
    })
    return
  }
  let sql = "select uid from user where phone = ?"
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({
        code: 301,
        msg: "该手机号已被注册"
      })
    } else {
      res.send({
        code: 200,
        msg: "该手机可以注册"
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
    cpwd
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
  if (upwd !== cpwd) {
    res.send({
      code: 403,
      msg: "两次密码不一致"
    })
    return
  }
  //手机验证码校对
  if (identify.toLowerCase() !== (req.session.captcha && req.session.captcha.toLowerCase())) {
    res.send({
      code: 404,
      msg: "验证码不正确"
    })
    return
  }
  //更新数据库的用户表phone对应的upwd字段
  let sql = "update user set upwd = md5(?) where phone = ?"
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
    userName = null,
    addr = null,
    nick = null,
    birthday = null,
    addr_city = null,
    addr_detail = null,
    gender = null
  } = req.body
  console.log(req.body)
    , uid = req.session.uid
  //验证用户编号格式
  if (!uid) {
    res.send({
      code: 401,
      msg: "用户未登录"
    })
    return
  }
  if (![userName,
    addr,
    nick,
    birthday,
    addr_city,
    addr_detail,
    gender].some(el => el)) {
    res.send({ code: 402, msg: "请输入要保存的信息" })
    return
  }
  // console.log(userName,addr)
  // console.log(typeof nick)
  let sql = "update user set ", arr = []
  if (!!userName) {
    sql += " userName = ?,"
    arr.push(userName)
  }
  if (!!addr) {
    sql += "  addr = ?,"
    arr.push(addr)
  }
  if (!!nick) {
    sql += "  nick = ?,"
    arr.push(nick)
  }
  if (!!birthday) {
    sql += "  birthday = ?,"
    arr.push(birthday)
  }
  if (!!addr_city) {
    sql += "  addr_city = ?,"
    arr.push(addr_city)
  }
  if (!!addr_detail) {
    sql += "  addr_detail = ?,"
    arr.push(addr_detail)
  }
  if (!!gender) {
    sql += "  gender = ?,"
    arr.push(gender)
  }
  sql = sql.substring(0, sql.length - 1)
  sql += " where uid = ?"
  arr.push(uid)
  //更新数据库中的用户信息
  console.log(sql)
  console.log(arr)
  pool.query(sql, arr, (err, result) => {
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
  let form = new multiparty.Form()
  form.uploadDir = "./public/user" //设置图片存储路径
  // form.uploadDir = "http://file.urlip.cn/fc_assets/avatar/" //oa服务器
  form.keepExtensions = true //保留后缀
  form.maxFiledsSize = 2 * 1024 * 1024 //内存大小
  form.maxFilesSize = 5 * 1024 * 1024 //文件字节大小限制，超出时会报错
  //表单解析
  form.parse(req, function (err, fields, files) {
    // console.log(files)
    // console.log(fields.uid)
    if (err) { //上传文件大小超出限制
      // console.log(err)
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
      console.log("图片未成功添加，正在删除图片...")
      fs.unlinkSync(oldpath)
    }
    /**
     * 对查询数据库是否存在用户编号对应的用户的结果进行处理
     * @param {*} err 错误信息 
     * @param {*} result 操作数据库的结果集合
     */
    function yzuser(err, result) {
      console.log("正在验证用户是否存在...")
      if (err) throw err
      if (result.length > 0) { //用户存在
        //查询用户头像表中数据条数
        sql = "select max(uiid) as uid from user_img"
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
      console.log("正在为图片重命名...")
      // console.log(result)
      if (err) throw err
      //获取当前用户头像表的数据条数，并+1作为待登记的图片Id
      imgId = result[0].uid + 1
      //为待登记的图片取名
      fileName = "avatar_" + imgId + suffix
      //为待登记的图片的路径取值
      let url = "./public/user/" + fileName
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
      console.log("正在添加图片信息到数据库...")
      if (err) throw err
      if (result.affectedRows > 0) { //插入成功
        //更新数据库用户表中的头像字段
        sql = "update user set user_imgId = ? where uid = ?"
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
      console.log("正在修改数据库中用户头像信息...")
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
  let phone = req.query.phone
  // {
  //   random,
  //   floor
  // } = Math
  //验证手机号格式
  // console.log(req.query)
  if (!phoneRegex.test(phone)) {
    res.send({
      code: 401,
      msg: "手机号格式不正确"
    })
    return
  }
  //生成4位随机验证码
  // let yanzhengma = floor(1000 + random() * 9000)
  //存储在session中
  // req.session.yzm = yanzhengma
  // console.log(yanzhengma)
  //创建一个对象
  var captcha = svgCaptcha.create();
  //生成验证码，存入session
  req.session.captcha = captcha.text;
  // console.log(req.session.captcha)
  // 设置响应类型为svg
  res.type('svg');
  //返回数据
  res.status(200).send({ yzm: captcha })
})
//获取用户信息
router.get("/detail", (req, res) => {
  //获取用户的编号
  let uid = req.session.uid,
    sql = "select phone,userName,addr,nick,img_addr,addr_city,addr_detail,gender,birthday from user,user_img where user_imgId = uiid and uid = ?"
  if (!uid) { //用户编号为空
    res.send({
      code: 401,
      msg: "请先登录"
    })
    return
  }
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err
    // console.log(result)
    //对查询结果集进行判断
    if (result.length > 0) { //查询结果不为空，返回查询数据
      res.send({
        code: 200,
        msg: "查询成功",
        data: result[0]
      })
    } else { //查询结果为空，返回查询失败
      res.send({
        code: 301,
        msg: "查询失败,不存在的用户"
      })
    }
  })
})
//用户评论 /user_words uid,content
router.post("/user_words", (req, res) => {
  //获取请求主体中的数据
  let {
    uid,
    content,
    pid
  } = req.body
  //验证留言内容是否为空
  if (!content) { //留言内容为空，返回提示不能为空
    res.send({
      code: 401,
      msg: "评论内容不能为空"
    })
    return
  }
  //查询是否存在该用户
  let sql = "select * from user where uid = ?"
  pool.query(sql, [uid], yz_uid)
  //对是否存在用户的查询结果进行操作
  function yz_uid(err, result) {
    if (err) throw err
    if (result.length > 0) { //用户存在
      //查询是否存在该产品
      let sql = "select * from product where pid = ?"
      pool.query(sql, [pid], yz_pid)
    } else { //用户不存在，返回提示不能为空信息
      res.send({
        code: 402,
        msg: "用户不存在"
      })
    }
  }
  //对是否存在该产品的查询结果进行操作
  function yz_pid(err, result) {
    if (err) throw err
    if (result.length > 0) { //存在该商品
      //插入用户的评论信息到评论表
      let sql = "insert into words values(null,?,?,?)"
      pool.query(sql, [content, pid, uid], cr_words)
    } else { //不存在该商品，返回不能为空信息
      res.send({
        code: 403,
        msg: "产品不存在"
      })
    }
  }
  //插入评论信息的结果进行操作
  function cr_words(err, result) {
    if (err) throw err
    if (result.affectedRows > 0) { //插入成功，返回成功信息
      res.send({
        code: 200,
        msg: "评论成功"
      })
    } else { //插入失败，返回失败信息
      res.send({
        code: 301,
        msg: "评论失败"
      })
    }
  }
})
//用户搜索记录
router.get("/search", (req, res) => {
  //获取用户id
  let uid = req.session.uid,
    //存储sql语句
    sql,
    //存储数据
    data = {}
  // console.log(uid)
  sql = "select content from keywords group by content order by sum(count) desc"
  //查询数据库的关键词内容，热度降序排列
  pool.query(sql, (err, result) => {
    if (err) throw err
    //将结果关键词放在data对象的all属性
    data.all = result
    //如果用户编号不为空即登录状态
    if (!!uid) {
      sql = "select content from keywords where key_userId = ? order by count desc limit 0,3"
      //查询个人搜索次数前三的关键词
      pool.query(sql, [uid], (err, result) => {
        if (err) throw err
        //将查询的关键词结果放入data对象的me属性中
        data.me = result
        //返回json对象包含个人和全部的搜索关键词结果
        res.send({ code: 200, msg: "获取数据成功", data })
      })
    } else {
      //返回json对象包含全部的搜索关键词结果
      res.send({ code: 200, msg: "获取数据成功", data })
    }
  })
})
router.get("/mobileLogin", (req, res) => {
  let { phone, identify } = req.query,
    sql = "select uid from user where phone  = ?"
  if (identify.toLowerCase !== req.session.captcha.toLowerCase) {
    res.send({ code: 401, msg: "验证码错误" })
    return
  }
  if (!phoneRegex.test(phone)) {
    res.send({ code: 402, msg: "手机号格式不正确" })
    return
  }
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err
    if (result.length === 0) {
      console.log("用户未注册")
      sql = "insert into user(phone,upwd) values(?, md5(?))"
      pool.query(sql, [phone, identify], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) {
          console.log("注册新用户成功")
          req.session.uid = result.insertId
          res.send({ code: 200, msg: "登录成功" })

        } else {
          res.send({ code: 301, msg: "登录失败，无法创建新用户" })
        }
      })
    } else {
      console.log("用户登录成功")
      req.session.uid = result[0].uid
      res.send({ code: 200, msg: "登录成功" })
    }
  })
})
module.exports = router