const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const userRouter = require("./routes/user")
const productRouter = require("./routes/product")
const orderRouter = require("./routes/order")
//定义允许跨域访问的origin列表
let White_list = ["http://47.103.4.25:5501","http://127.0.0.1:5501","http://127.0.0.1","http://192.168.137.1:8081","http://127.0.0.1:8080"],
index
let app = express()
app.listen(8081)
//用于后台测试用的静态资源目录
app.use(express.static("public"))
//利用中间件对访问的origin进行白名单验证，通过则添加对应的origin到响应头中，如果未匹配则默认返回白名单中的第一个url
app.all("*",(req,res,next)=>{
    let ori = req.headers.origin
    index = White_list.indexOf(ori)
    //console.log("在中间件中")
    if(index === -1) index = 0
    //console.log(White_list[index])
    res.header("Access-Control-Allow-Origin", White_list[index])
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(cookieParser("123456"))
app.use(session({
    secret:"123456",
    resave:false,
    saveUninitialized:true
}))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())

// 挂载用户路由模块到/user下
app.use("/user",userRouter)
//挂载产品路由模块到/product下
app.use("/product",productRouter)
//挂载订单模块到/order下
app.use("/order",orderRouter)