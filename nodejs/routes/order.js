//引入模块
const express = require("express")
const pool = require("../pool")
let router = express.Router()
//订单详情 get uid
router.get("/detail",(req,res)=>{
  let uid = req.query.uid
  if(!uid) {
    res.send({code:401,msg:"产品编号不能为空"})
    return
  }
  let sql = "select "
  pool.query
})
//导出路由模块
module.exports = router