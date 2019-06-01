const express = require("express")
const pool = require("../pool")
let router = express.Router()
//6个路由
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
  let sql = "select * from product,product_img where pid = ? and product_imgId = iid"
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
  //获取请求查询字符串中的classify style thickness color minprice maxprice rexiao xinpin pno size keywords
  let {
    classify,
    style,
    thickness,
    color,
    minprice,
    maxprice,
    rexiao,
    xinpin,
    recommond,
    pno,
    size,
    keywords
  } = req.query,
    uid = req.session.uid
  // console.log(uid,
  //   classify,
  //   style,
  //   thickness,
  //   color,
  //   minprice,
  //   maxprice,
  //   rexiao,
  //   xinpin,
  //   recommond,
  //   pno,
  //   size,
  //   keywords)
  //默认值
  // console.log("当前查询产品列表的用户编号为"+uid)
  !pno && (pno = 1);
  !size && (size = 6);
  //转换位整数
  pno = parseInt(pno)
  size = parseInt(size);
  //不规范的参数规范化
  (isNaN(Number(minprice)) || minprice < 0) && (minprice = 0);
  (isNaN(Number(maxprice)) || maxprice < minprice) && (maxprice = 99999999)
  // console.log(maxprice, minprice)
  //计算分页的开始下标
  let start = (pno - 1) * size,
    sql = "select sql_calc_found_rows pid,described,price,photo1 from product,product_img where product_imgId = iid", //存储查询的sql 语句
    arr = [] //存储查询的参数
  if (!!classify) { //如果分类不为空
    sql += " and classify = ?" //拼接查询条件
    arr.push(classify) //插入参数到数组中
  }
  if (!!style) { //款式不为空
    sql += " and style = ?"
    arr.push(style)
  }
  if (!!thickness) { //种水不为空
    sql += " and thickness = ?"
    arr.push(thickness)
  }
  if (!!color) { //颜色不为空
    sql += " and color = ?"
    arr.push(color)
  }
  if (!!minprice) { //最低价不为空
    sql += " and price >= ?"
    arr.push(minprice)
  }
  if (!!maxprice) { //最高价不为空
    sql += " and price <= ?"
    arr.push(maxprice)
  }
  if (recommond === "true") { //推荐产品不为空 
    sql += " and recommond = 1 "
  }
  if (!!keywords) { //关键字不为空
    let keyword = "%" + keywords + "%"
    sql += " and described like ? "
    arr.push(keyword)
  }
  if (rexiao === "true" || xinpin === "true") { //热销和新品中至少有一个不为空 , 
    sql += " order by "
    if (rexiao === "true") { //热销不为空
      sql += " month_buy desc"
      if (xinpin === "true") { //新品不为空
        sql += " ,shelf_time desc"
      }
    } else if (xinpin === "true") { //新品不为空
      sql += " shelf_time desc"
    }
  }
  sql += " limit ?,?;select found_rows();"
  // console.log(sql)
  // console.log(keywords)
  arr = arr.concat([start, size])
  // console.log(sql)
  // console.log(arr)
  //查询数据库
  pool.query(sql, arr, (err, result) => {
    if (err) throw err
    console.log(result)
    //查询该用户的收藏记录
    sql = "select coll_productId pid from collect where coll_userId = ?"
    let tmpArr = result
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err
      //如果存在收藏记录
      if (result.length > 0) {
        //取出收藏产品编号转为数组
        result = Object.values(result[0])
        console.log(result)
        //遍历查询产品结果列表
        tmpArr[0].forEach(el => {
          //如果查询结果中的产品不是用户所收藏的
          if (result.indexOf(el.pid) === -1) {
            //添加收藏属性为false
            el.collect = false
          } else { //是用户收藏
            console.log(`商品${el.pid}为用户收藏的产品`)
            //添加收藏属性为true
            el.collect = true
          }
        })
      }
      //返回查询结果
      res.send(tmpArr)
    })


  })
})
//获取产品的分类信息 /get 
router.get("/classfy", (req, res) => {
  // console.log("请求产品分类模块")
  let sql = "select  classify,style,thickness,color from product "
  pool.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
//获取首页轮播图 /get
router.get("/banner", (req, res) => {
  let sql = "select banner,pid,described,photo1 from product,product_img where product_imgId = iid and recommond = 1"
  pool.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
//获取产品的评论信息
router.get("/get_words", (req, res) => {
  let pid = req.query.pid,
    sql = "select content,nick,img_addr from words,user,user_img where productId = ? and uid = userId and user_imgId = uiid"
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err
    if (result.length > 0)
      res.send({ code: 200, msg: result })
    else res.send({ code: 301, msg: "暂无评论" })
  })
})
//用户搜索时添加搜索记录
router.get("/search", (req, res) => {
  let { uid, keywords } = req.query
  //检查用户是否输入用户编号，如果没有统一改为0，表示游客的搜索关键词
  if (!uid) {
    uid = 0
  }
  //当用户通过关键字搜索产品时
  if (!!keywords) {
    //添加搜索的关键字到keywords表中
    let sql1 = "select count,kid from keywords where content = ? and key_userId = ?",
      count = 1,
      kid
    //在keywords表中查询是否存在关键字
    pool.query(sql1, [keywords, uid], (err, result) => {
      if (err) throw err
      if (result.length > 0) { //存在
        //搜索次数+1
        count = result[0].count + 1
        //所搜关键词记录的编号
        kid = result[0].kid
        //更新关键字的搜索次数
        sql1 = "update keywords set count = ? where kid = ?"
        pool.query(sql1, [count, kid], (err, result) => {
          if (err) throw err
          console.log("更新关键词表完成")
        })
      } else { //不存在
        //插入新的关键字搜索记录
        sql1 = "insert into keywords values(null,?,?,?)"
        pool.query(sql1, [keywords, uid, count], (err, result) => {
          if (err) throw err
          console.log("插入关键词表完成")
        })
      }
    })
  }
})
//导出产品模块
module.exports = router