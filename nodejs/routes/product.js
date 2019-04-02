const express = require("express")
const pool = require("../pool")
let router = express.Router()
//宝贝详情 /get pid
router.get("/detail", (req, res) => {
  let pid = req.query.pid
  //验证产品编号是否为空
  if (!pid) {
    res.send({
      code: 401,
      msg: "产品编号不能为空"
    })
    return
  }
  //查询商品的详情
  let sql = "select * from product where pid = ?"
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err
    if (result.length > 0) { //查询到产品的详情结果不为空，返回详情数据
      res.send(result)
    } else { //为空，返回提示信息
      res.send({
        code: 301,
        msg: "未找到该产品"
      })
    }
  })
})
//单品列表 /get classify style thickness color minprice maxprice rexiao xinpin pno size keywords
router.get("/list", (req, res) => {
  let {
    classify,
    style,
    thickness,
    color,
    minprice,
    maxprice,
    rexiao,
    xinpin,
    pno,
    size,
    keywords
  } = req.query;
  !pno && (pno = 1);
  !size && (size = 6);
  pno = parseInt(pno)
  size = parseInt(size)
  minprice < 0 && (minprice = 0)
  maxprice < minprice && (maxprice = 99999999)
  let start = (pno - 1) * size,
    sql = "select described,price,md1 from product,product_img where imgId = iid",
    arr = []
  if (!!classify) {
    sql += " and classify = ?"
    arr.push(classify)
  }
  if(!!style) {
    sql += " and style = ?"
    arr.push(style)
  }
  if(!!thickness){
    sql += " and thickness = ?"
    arr.push(thickness)
  }
  if(!!color) {
    sql += " and color = ?"
    arr.push(color)
  }
  if(!!minprice) {
    sql += " and price >= ?"
    arr.push(minprice)
  }
  if(!!maxprice) {
    sql += " and price <= ?"
    arr.push(maxprice)
  }
  if(!!keywords) {
    keywords = "%"+keywords+"%"
    sql += " and described like ?"
    arr.push(keywords)
  }
  if(!!rexiao || !!xinpin){
    sql += " order by "
    if(!!rexiao) {
    sql += " month_buy desc"
    }
    if(!!xinpin) {
      sql += " ,shelf_time desc"
    }
  }
  sql += " limit ?,?"
  arr = arr.concat([start,size])
  console.log(sql)
  console.log(arr)
  pool.query(sql, arr, (err,result)=>{
    if(err) throw err
    res.send(result)
  })
})
//导出产品模块
module.exports = router