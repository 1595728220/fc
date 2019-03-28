const express = require("express")
let router = express.Router()

//用户登陆 /login post phone upwd
//用户注册 /register post identify phone upwd
//重置密码 /forget phone identify upwd repwd
//添加/修改信息 /add uid userName addr nick
//修改头像 /updateAvatar uid
//获取和验证验证码 /yzm phone