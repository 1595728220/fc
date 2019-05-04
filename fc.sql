set names utf8;
drop database if exists fc;
create database fc charset=utf8;
use fc;
#用户表
create table user(
  uid int primary key auto_increment comment "用户编号",
  upwd varchar(16) comment "密码",
  userName varchar(8) comment "姓名",
  phone varchar(11) comment "手机",
  addr varchar(32) comment "收货地址",
  nick varchar(12) comment "昵称",
  user_imgId int comment "用户头像图片编号" 
);
insert into user values(null,"123456","丁丁","15057391900","杭州市西湖区中心路11号","zero",1);
insert into user values(null,"123456","当当","13811111112","杭州市西湖区中心路12号","旧日憾事",1);
insert into user values(null,"123456","东东","13811111113","杭州市西湖区中心路13号","失去派大",1);
insert into user values(null,"123456","端端","13811111114","杭州市西湖区中心路14号","朕好萌i",1);
#竞拍表
create table auction(
  aid int primary key auto_increment comment "竞拍编号",
  productId int comment "产品编号",
  userId int comment "用户编号",
  auction_price int comment "当前竞拍价"
);
#产品表
create table product(
  pid int primary key auto_increment comment "产品编号",
  price int comment "产品价格",
  described varchar(64) comment "描述",
  artNo varchar(12) comment "货号",
  classify varchar(8) comment "分类",
  style varchar(6) comment "款式",
  thickness varchar(6) comment "种水",
  color varchar(6) comment "颜色",
  shelf_time bigint comment "上架时间",
  month_buy int comment "月销售量",
  product_imgId int comment "产品图片编号"
);
#http://www.cuihui.cn/cuihuiw/products/13321583.html
insert into product values(null,3100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","圆圈","冰种","白底青",1553604596095,1000,1);
insert into product values(null,3100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","圆圈","冰种","白底青",1553604596095,1000,2);
insert into product values(null,3100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","圆圈","冰种","白底青",1553604596095,1000,3);
insert into product values(null,3100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","圆圈","冰种","白底青",1553604596095,1000,4);
#订单表
create table user_order(
  oid int primary key auto_increment comment "订单编号",
  userId int comment "用户编号",
  productId int comment "产品编号"
);
insert into user_order values(1,1,1);
#图片表
create table product_img(
  iid int primary key auto_increment comment "图片编号",
  sm1 varchar(128) comment "小图",
  sm2 varchar(128) comment "小图",
  sm3 varchar(128) comment "小图",
  sm4 varchar(128) comment "小图",
  sm5 varchar(128) comment "小图",
  md1 varchar(128) comment "中图",
  md2 varchar(128) comment "中图",
  md3 varchar(128) comment "中图",
  md4 varchar(128) comment "中图",
  md5 varchar(128) comment "中图",
  lg1 varchar(128) comment "大图",
  lg2 varchar(128) comment "大图",
  lg3 varchar(128) comment "大图",
  lg4 varchar(128) comment "大图",
  lg5 varchar(128) comment "大图",
  detail varchar(128) comment "产品详情",
  promise varchar(128) comment "产品保障",
  recommond boolean comment "是否为推荐商品"
);
insert into product_img values(null,"fo_sm_2.jpg","fo_sm_1.jpg","fo_sm_3.jpg","fo_sm_4.jpg","fo_sm_5.jpg","fo_md_2.jpg","fo_md_1.jpg","fo_md_3.jpg","fo_md_4.jpg","fo_md_5.jpg","fo_lg_2.jpg","fo_lg_1.jpg","fo_lg_3.jpg","fo_lg_4.jpg","fo_lg_5.jpg","fo_detail.png","fo_promise.png",true);
insert into product_img values(null,"fo_sm_3.jpg","fo_sm_2.jpg","fo_sm_1.jpg","fo_sm_4.jpg","fo_sm_5.jpg","fo_md_3.jpg","fo_md_2.jpg","fo_md_1.jpg","fo_md_4.jpg","fo_md_5.jpg","fo_lg_3.jpg","fo_lg_2.jpg","fo_lg_1.jpg","fo_lg_4.jpg","fo_lg_5.jpg","fo_detail.png","fo_promise.png",true);
insert into product_img values(null,"fo_sm_4.jpg","fo_sm_2.jpg","fo_sm_3.jpg","fo_sm_1.jpg","fo_sm_5.jpg","fo_md_4.jpg","fo_md_2.jpg","fo_md_3.jpg","fo_md_1.jpg","fo_md_5.jpg","fo_lg_4.jpg","fo_lg_2.jpg","fo_lg_3.jpg","fo_lg_1.jpg","fo_lg_5.jpg","fo_detail.png","fo_promise.png",true);
insert into product_img values(null,"fo_sm_1.jpg","fo_sm_2.jpg","fo_sm_3.jpg","fo_sm_4.jpg","fo_sm_5.jpg","fo_md_1.jpg","fo_md_2.jpg","fo_md_3.jpg","fo_md_4.jpg","fo_md_5.jpg","fo_lg_1.jpg","fo_lg_2.jpg","fo_lg_3.jpg","fo_lg_4.jpg","fo_lg_5.jpg","fo_detail.png","fo_promise.png",true);
create table user_img(
  uiid int primary key auto_increment,
  img_addr varchar(32) comment "用户头像的文件名称"
);
insert into user_img values(null,"avatar_1.png");
#视频表
create table video(
  vid int primary key auto_increment comment "视频编号",
  video_addr varchar(128) comment "视频url"
);
#评论表
create table words(
  wid int primary key auto_increment,
  content varchar(256) comment "评论内容",
  productId int comment "评论的商品",
  userId int comment "评论的用户"
);
insert into words values(null,"戴了一段时间了，越来越觉得喜欢。还会继续关注",1,1);
insert into words values(null,"太喜欢了，水头很足，要朋友看了一下，是a货，送给老妈的生日礼物，发货速度很快，生日当天刚好收到，老妈很喜欢，客服很热情，很有耐心，太满意了，赞?",1,2);
insert into words values(null,"
手镯很漂亮，最开始戴不进去，询问客服，客服很耐心，客服从准备买到买后服务态度都特别好，点赞！！！",1,3);
insert into words values(null,"宝贝已收到，和想象的一样，是正品，这个价钱买到这样的宝贝已经不错了，满意",1,4);
#搜索关键字表
create table keywords(
  kid int primary key auto_increment,
  content varchar(32) comment "关键字",
  key_userId int comment "用户编号",
  count int comment "关键词使用次数"
);
insert into keywords values(null,"超值",1,1);