const express = require("express")
const pool = require("../pool")
let router = express.Router()
let uidRegex = /^\d*$/
let phoneRegex = /^1[34578]\d{9}$/
let upwdRegex = /^[a-zA-Z\d_]{6,12}$/
let yanzhengma = 1234
//用户登陆 /login post phone upwd
router.post("/login", (req, res) => {
  let {
    phone,
    upwd
  } = req.body
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
  let sql = "select uid, nick from user where phone = ? and upwd = ?"
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      req.session.uid = result[0].uid
      req.session.nick = result[0].nick
      res.send({
        code: 200,
        msg: "登录成功"
      })
    } else {
      res.send({
        code: 200,
        msg: "登录失败"
      })
    }
  })
})
//用户登录状态验证,登录状态则返回用户昵称
router.get("/state", (req, res) => {
  if (req.session.uid === undefined) res.send({
    code: 401,
    msg: "用户未登录"
  })
  else res.send({
    code: 200,
    msg: req.session.nick
  })
})
//用户注销登录
router.get("/logout", (req, res) => {
  delete req.session.uid
  res.send({
    code: 200,
    msg: "注销成功"
  })
})
//用户注册 /register post identify phone upwd
router.post("/register", (req, res) => {
  let {
    phone,
    upwd,
    identify
  } = req.body
  identify = parseInt(identify)
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
  if (identify !== yanzhengma) {
    res.send({
      code: 403,
      msg: "验证码不正确"
    })
    return
  }
  let sql = "select uid from user where phone = ?"
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({
        code: 301,
        msg: "该手机号已经被注册"
      })
    } else {
      let sql = "insert into user(phone, upwd) values(?, ?)"
      pool.query(sql, [phone, upwd], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0) {
          res.send({
            code: 200,
            msg: "注册成功"
          })
        }
      })
    }
  })

})
//重置密码 /forget phone identify upwd repwd
router.post("/forget", (req, res) => {
  let {
    phone,
    identify,
    upwd,
    repwd
  } = req.body
  identify = parseInt(identify)
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
  if (upwd !== repwd) {
    res.send({
      code: 403,
      msg: "两次密码不一致"
    })
    return
  }
  if (identify !== yanzhengma) {
    res.send({
      code: 404,
      msg: "验证码不正确"
    })
    return
  }
  let sql = "update user set upwd = ? where phone = ?"
  pool.query(sql, [upwd, phone], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        msg: "修改密码成功"
      })
    } else {
      res.send({
        code: 301,
        msg: "手机号未注册"
      })
    }
  })
})
//添加/修改信息 /add uid userName addr nick
router.post("/add",(req,res)=>{
  let {uid, userName, addr, nick} = req.body
  if(!uidRegex.test(uid)) {
    res.send({code:401,msg:"用户编号格式不正确"})
    return
  }
  if(!userName) {
    userName = null
  }
  if(!addr) {
    addr = null
  }
  if(!nick) {
    nick = null
  }
  let sql = "update user set userName = ?, addr = ?, nick = ? where uid = ?"
  pool.query(sql,[userName, addr, nick, uid],(err,result)=>{
    if(err) throw err
    if(result.affectedRows > 0) {
      res.send({code:200,msg:"修改个人信息成功"})
    } else {
      res.send({code:301,msg:"修改个人信息失败"})
    }
  })
})
//修改头像 /updateAvatar uid
router.post("/avatar",(req,res)=>{
  // let {uid, avatar} = req.body
  let avatar = req
  // console.log(uid)
  console.log(avatar)
  res.send("1")
})
//获取和验证验证码 /yzm phone
module.exports = router