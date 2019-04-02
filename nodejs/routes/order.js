//引入模块
const express = require("express")
const pool = require("../pool")
let router = express.Router()

//生成订单 get uid,pid
router.get("/create",(req,res)=>{
  //获取用户编号和产品编号
  let {uid, pid} = req.query
  if(!uid) { //用户编号为空
    res.send({code:401,msg:"用户编号不能为空"})
    return
  }
  if(!pid) { //产品编号为空
    res.send({code:402,msg:"产品编号不能为空"})
    return
  }
  //生成订单将订单数据插入数据库
  let sql = "insert into user_order values(null, ?, ?)"
  pool.query(sql,[uid, pid], (err,result)=>{
    if(err) throw err
    if(result.affectedRows > 0) { //插入影响的行数不为0 
      res.send({code:200,msg:"订单生成"})
    } else { //插入影响的行数为0
      res.send({code:301,msg:"订单生成失败"})
    }
  })
})
//用户的订单概况 get uid
router.get("/list",(req,res)=>{
  //获取用户编号
  let uid = req.query.uid
  if(!uid) { //用户编号为空
    res.send({code:401,msg:"用户编号不能为空"})
    return
  }
  //查询某用户某产品对应的订单
  let sql = "select described,price,oid from user_order,product where productId = pid and userId = ?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err
    if(result.length > 0) { //查询结果不为空
      res.send({code:200,msg:"订单查询成功",data:result})
    } else { //查询结果为空
      res.send({code:301,msg:"订单不存在"})
    }
  })
})
//订单详情 get uid
router.get("/detail",(req,res)=>{
  //获取订单编号
  let {oid} = req.query
  if(!oid) { //订单编号为空
    res.send({code:401,msg:"订单编号不能为空"})
    return
  }
  //查询订单编号对应的订单详情
  let sql = "select userName,oid,described,price,sm1 from user,product,user_order,product_img where uid = userId and productId = pid and iid = product_imgId and oid = ?"
  pool.query(sql,[oid],(err,result)=>{
    if(err) throw err
    if(result.length > 0) { //查询结果不为空
      res.send({code:200,msg:"订单查询成功",data:result})
    } else { //查询结果为空
      res.send({code:301,msg:"订单不存在"})
    }
  })
})
//订单完成/取消
router.get("/finish",(req,res) => {
  let oid = req.query.oid
  if(!oid) {
    res.send({code:401,msg:"订单编号不能为空"})
    return
  }
  let sql = "delete from user_order where oid = ?"
  pool.query(sql,[oid],(err,result)=>{
    if(err) throw err
    if(result.affectedRows > 0) {
      res.send({code:200,msg:"订单完成/取消成功"})
    }else {
      res.send({code:301,msg:"订单不存在"})
    }
  })
})
//导出路由模块
module.exports = router