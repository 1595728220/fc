const express = require("express")
const pool = require("../pool")
let router = express.Router()
//宝贝详情 /get pid
router.get("/detail",(req,res)=>{
  let pid = req.query.pid
  //验证产品编号是否为空
  if(!pid) {
    res.send({code:401,msg:"产品编号不能为空"})
    return
  }
  //查询商品的详情
  let sql = "select * from product where pid = ?"
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err
    if(result.length > 0) { //查询到产品的详情结果不为空，返回详情数据
      res.send(result)
    } else { //为空，返回提示信息
      res.send({code:301,msg:"未找到该产品"})
    }
  })
})

//导出产品模块
module.exports = router