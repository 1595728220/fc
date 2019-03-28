const express = require("express")
const pool = require("../pool")
let router = express.Router()

//用户登陆 /login post phone upwd
router.post("/login", (req, res) => {
    let { phone, upwd } = req.body
    let phoneRegex = /^1[34578]\d{9}$/
    let upwdRegex = /^[a-zA-Z\d_]{6,12}$/
    if (!phoneRegex.test(phone)) {
        res.send({ code: 401, msg: "手机号格式不正确" })
        return
    }
    if (!upwdRegex.test(upwd)) {
        res.send({ code: 402, msg: "密码格式不正确" })
        return
    }
    let sql = "select uid, nick from user where phone = ? and upwd = ?"
    pool.query(sql, [phone, upwd], (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            req.session.uid = result[0].uid
            req.session.nick = result[0].nick
            res.send({ code: 200, msg: "登录成功" })
        } else {
            res.send({ code: 200, msg: "登录失败" })
        }
    })
})
//用户登录状态验证,登录状态则返回用户昵称
router.get("/state",(req,res)=>{
    if(req.session.uid === undefined) res.send({code:401,msg:"用户未登录"})
    else res.send({code:200,msg:req.session.nick})
})
//用户注销登录
router.get("/logout", (req,res)=>{
    delete req.session.uid
    res.send({code:200,msg:"注销成功"})
})
//用户注册 /register post identify phone upwd
//重置密码 /forget phone identify upwd repwd
//添加/修改信息 /add uid userName addr nick
//修改头像 /updateAvatar uid
//获取和验证验证码 /yzm phone
module.exports = router