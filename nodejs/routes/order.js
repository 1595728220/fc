//引入模块
const express = require("express")
const pool = require("../pool")
let router = express.Router()
//10个路由
//生成订单 get uid,pid
router.get("/create", (req, res) => {
  //获取用户编号和产品编号
  let {
    pid
  } = req.query,
    uid = req.session.uid
  if (!uid) { //用户编号为空
    res.send({
      code: 401,
      msg: "请先登录"
    })
    return
  }
  if (!pid) { //产品编号为空
    res.send({
      code: 402,
      msg: "产品编号不能为空"
    })
    return
  }
  //生成订单将订单数据插入数据库
  let sql = "insert into user_order values(null, ?, ?)"
  pool.query(sql, [uid, pid], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0) { //插入影响的行数不为0 
      res.send({
        code: 200,
        msg: "订单生成"
      })
    } else { //插入影响的行数为0
      res.send({
        code: 301,
        msg: "订单生成失败"
      })
    }
  })
})
//用户的订单概况 get uid
router.get("/list", (req, res) => {
  //获取用户编号
  let uid = req.session.uid
  if (!uid) { //用户编号为空
    res.send({
      code: 401,
      msg: "请先登录"
    })
    return
  }
  //查询某用户某产品对应的订单
  let sql = "select described,price,oid from user_order,product where productId = pid and userId = ?"
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err
    if (result.length > 0) { //查询结果不为空
      res.send({
        code: 200,
        msg: "订单查询成功",
        data: result
      })
    } else { //查询结果为空
      res.send({
        code: 301,
        msg: "订单不存在"
      })
    }
  })
})
//订单详情 get uid
router.get("/detail", (req, res) => {
  //获取订单编号
  let {
    oid
  } = req.query
  if (!oid) { //订单编号为空
    res.send({
      code: 401,
      msg: "订单编号不能为空"
    })
    return
  }
  //查询订单编号对应的订单详情
  let sql = "select userName,oid,described,price,sm1 from user,product,user_order,product_img where uid = userId and productId = pid and iid = product_imgId and oid = ?"
  pool.query(sql, [oid], (err, result) => {
    if (err) throw err
    if (result.length > 0) { //查询结果不为空
      res.send({
        code: 200,
        msg: "订单查询成功",
        data: result
      })
    } else { //查询结果为空
      res.send({
        code: 301,
        msg: "订单不存在"
      })
    }
  })
})
//订单完成/取消
router.get("/finish", (req, res) => {
  let oid = req.query.oid
  if (!oid) {
    res.send({
      code: 401,
      msg: "订单编号不能为空"
    })
    return
  }
  let sql = "delete from user_order where oid = ?"
  pool.query(sql, [oid], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        msg: "订单完成/取消成功"
      })
    } else {
      res.send({
        code: 301,
        msg: "订单不存在"
      })
    }
  })
})
//添加收藏
router.get("/add_collect", (req, res) => {
  let pid = req.query.pid,
    uid = req.session.uid,
    time = (new Date()).getTime(),
    sql = "insert into collect values(null,?,?,?)"
  if (!uid) {
    res.send({ code: 400, msg: "用户未登录" })
    return
  }
  if (!pid) {
    res.send({ code: 401, msg: "缺少产品编号" })
    return
  }
  pool.query(sql, [pid, uid, time], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0)
      res.send({ code: 200, msg: "收藏成功" })
    else
      res.send({ code: 301, msg: "收藏失败" })
  })
})
//取消收藏
router.get("/remove_collect", (req, res) => {
  let pid = req.query.pid,
    uid = req.session.uid,
    sql = "delete from collect where coll_productId = ? and coll_userId = ?"
  if (!uid) {
    res.send({ code: 400, msg: "用户未登录" })
    return
  }
  if (!pid) {
    res.send({ code: 401, msg: "缺少产品编号" })
    return
  }
  pool.query(sql, [pid, uid], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0)
      res.send({ code: 200, msg: "取消收藏成功" })
    else
      res.send({ code: 301, msg: "取消收藏失败" })
  })
})
//获取用户的收藏记录
router.get("/get_collect", (req, res) => {
  let uid = req.session.uid,
    sql = "select pid,described,price,photo1,coll_time from product,product_img,collect where product_imgId = iid and coll_productId = pid and coll_userId = ?"
  if (!uid) {
    res.send({ code: 400, msg: "用户未登录" })
    return
  }
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({ code: 200, msg: "查询收藏商品成功", data: result })
    } else {
      res.send({ code: 301, msg: "未收藏商品" })
    }
  })
})
//添加浏览历史记录
router.get("/add_browse", (req, res) => {
  let pid = req.query.pid,
    uid = req.session.uid,
    time = (new Date()).getTime(),
    sql = "select bid from browse where brow_userId = ? and brow_productId = ?"
  if (!uid) {
    res.send({ code: 400, msg: "用户未登录" })
    return
  }
  if (!pid) {
    res.send({ code: 401, msg: "缺少产品编号" })
    return
  }
  pool.query(sql, [uid, pid], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      sql = "update browse set brow_time = ? where bid = ?"
      pool.query(sql, [time, result[0].bid], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0)
          res.send({ code: 200, msg: "更新浏览记录的时间成功" })
        else
          res.send({ code: 302, msg: "更新浏览记录的时间失败" })
      })
    } else {
      sql = "insert into browse values(null,?,?,?)"
      pool.query(sql, [pid, uid, time], (err, result) => {
        if (err) throw err
        if (result.affectedRows > 0)
          res.send({ code: 200, msg: "添加浏览记录成功" })
        else
          res.send({ code: 301, msg: "添加浏览记录失败" })
      })
    }
  })

})
//清空用户浏览记录
router.get("/remove_browse", (req, res) => {
  let uid = req.session.uid,
    sql = "delete from browse where brow_userId = ?"
  if (!uid) {
    res.send({ code: 400, msg: "用户未登录" })
    return
  }
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err
    if (result.affectedRows > 0)
      res.send({ code: 200, msg: "删除历史浏览记录成功" })
    else
      res.send({ code: 301, msg: "删除历史浏览记录失败" })
  })
})
//获取用户的浏览记录
router.get("/get_browse", (req, res) => {
  let uid = req.session.uid,
    sql = "select pid,described,price,photo1,brow_time from product,product_img,browse where product_imgId = iid and brow_productId = pid and brow_userId = ?"
  if (!uid) {
    res.send({ code: 400, msg: "用户未登录" })
    return
  }
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err
    if (result.length > 0) {
      res.send({ code: 200, msg: "查询收藏商品成功", data: result })
    } else {
      res.send({ code: 301, msg: "未收藏商品" })
    }
  })
})
//获取用户的收货信息
router.get("/get_order_addr",(req,res)=>{
  let uid = req.session.uid
  ,sql = "select userName,phone,addr from user where uid = ?"
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err
    if(result.length > 0) {
      res.send({code:200,msg:"用户已填写收货信息",data:result[0]})
    } else {
      res.send({code:301,msg:"用户未填写收货信息"})
    }
  })
})
//修改用户的收货信息
router.get("/set_order_addr",(req,res)=>{
  let uid = req.session.uid,
  {userName,addr} = req.query
  ,sql = "update user set userName = ?, addr = ? where uid = ?"
  pool.query(sql,[userName,addr,uid],(err,result)=>{
    if(err) throw err
    if (result.affectedRows > 0) { //更新成功
      res.send({
        code: 200,
        msg: "修改收货信息成功"
      })
    } else {
      res.send({ //更新失败
        code: 301,
        msg: "修改收货信息失败"
      })
    }
  })
})
//导出路由模块
module.exports = router