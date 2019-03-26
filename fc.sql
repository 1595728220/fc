set names utf8;
drop database if exists fc;
create database fc charset=utf8;
use fc;
#用户表
create table user(
  uid int primary key auto_increment comment "用户编号",
  uname varchar(12) comment "用户名",
  upwd varchar(16) comment "密码",
  user_name varchar(8) comment "姓名",
  phone varchar(11) comment "手机",
  addr varchar(32) comment "收货地址",
  nick varchar(12) comment "昵称",
  imgId int comment "用户头像图片编号" 
);
insert into user values(null,"dingding","123456","丁丁","13811111111","杭州市西湖区中心路11号","zero","avatar_1.jpg")
insert into user values(null,"dangdang","123456","当当","13811111111","杭州市西湖区中心路12号","旧日憾事","avatar_1.jpg")
insert into user values(null,"dongdong","123456","东东","13811111111","杭州市西湖区中心路13号","失去派大","avatar_1.jpg")
insert into user values(null,"duanduan","123456","端端","13811111111","杭州市西湖区中心路14号","朕好萌i","avatar_1.jpg")
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
  imgId int comment "产品图片编号"
);
#http://www.cuihui.cn/cuihuiw/products/13321583.html
insert into product values(null,3100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","圆圈","冰种","白底青",1553604596095,1000,1)
#订单表
create table user_order(
  oid int primary key auto_increment comment "订单编号",
  userId int comment "用户编号",
  productId int comment "产品编号"
);
#图片表
create table img(
  iid int primary key auto_increment comment "图片编号",
  sm1 varchar(128) comment "小图",
  sm2 varchar(128) comment "小图",
  sm3 varchar(128) comment "小图",
  sm4 varchar(128) comment "小图",
  sm5 varchar(128) comment "小图",
  sm6 varchar(128) comment "小图",
  md1 varchar(128) comment "中图",
  md2 varchar(128) comment "中图",
  md3 varchar(128) comment "中图",
  md4 varchar(128) comment "中图",
  md5 varchar(128) comment "中图",
  md6 varchar(128) comment "中图",
  lg1 varchar(128) comment "大图",
  lg2 varchar(128) comment "大图",
  lg3 varchar(128) comment "大图",
  lg4 varchar(128) comment "大图",
  lg5 varchar(128) comment "大图",
  lg6 varchar(128) comment "大图"
);
#视频表
create table video(
  vid int primary key auto_increment comment "视频编号",
  addr varchar(128) comment "视频url"
);