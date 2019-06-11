set names utf8;
drop database if exists fc;
create database fc charset=utf8;
use fc;
#用户表
create table user(
  uid int primary key auto_increment comment "用户编号",
  upwd varchar(32) comment "密码",
  userName varchar(8) default "不详" comment "姓名",
  phone varchar(11) comment "手机",
  addr varchar(32) default "无" comment "收货地址",
  nick varchar(12) default "无" comment "昵称",
  user_imgId int default 1 comment "用户头像图片编号" 
);
insert into user values(null,"e10adc3949ba59abbe56e057f20f883e","丁丁","15057391900","杭州市西湖区中心路11号","zero",1);
insert into user values(null,"e10adc3949ba59abbe56e057f20f883e","当当","13811111112","杭州市西湖区中心路12号","旧日憾事",1);
insert into user values(null,"e10adc3949ba59abbe56e057f20f883e","东东","13811111113","杭州市西湖区中心路13号","失去派大",1);
insert into user values(null,"e10adc3949ba59abbe56e057f20f883e","端端","13811111114","杭州市西湖区中心路14号","朕好萌i",1);
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
  price decimal(10,2) comment "产品价格",
  described varchar(64) comment "描述",
  artNo varchar(12) comment "货号",
  classify varchar(8) comment "分类",
  style varchar(6) comment "款式",
  thickness varchar(6) comment "种水",
  color varchar(6) comment "颜色",
  shelf_time bigint comment "上架时间",
  month_buy int comment "月销售量",
  product_imgId int comment "产品图片编号",
  recommond boolean comment "是否为推荐商品"
);
#http://www.cuihui.cn/cuihuiw/products/13321583.html
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596091,5000,1,true);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596092,48000,2,true);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596093,4700,3,true);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596094,4400,4,true);
insert into product values(null,53100,"糯种紫罗兰蛋面金镶钻天然翡翠戒指","ch602295","饰品","戒指","糯种","紫罗兰",1553604596095,4500,5,false);
insert into product values(null,53100,"糯种紫罗兰蛋面金镶钻天然翡翠戒指","ch602295","饰品","戒指","糯种","紫罗兰",1553604596096,4500,5,false);
insert into product values(null,53100,"糯种紫罗兰蛋面金镶钻天然翡翠戒指","ch602295","饰品","戒指","糯种","紫罗兰",1553604596097,4500,5,false);
insert into product values(null,53100,"糯种紫罗兰蛋面金镶钻天然翡翠戒指","ch602295","饰品","戒指","糯种","紫罗兰",1553604596098,4500,5,false);
insert into product values(null,53100,"糯种紫罗兰蛋面金镶钻天然翡翠戒指","ch602295","饰品","戒指","糯种","紫罗兰",1553604596099,4500,5,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596010,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596020,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596030,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596040,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596055,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596065,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,13100,"超值精品冰种观音翡翠吊坠","ch602295","挂件","吊坠","冰种","白底青",1553604596095,5000,1,false);
insert into product values(null,3100,"冰种冰白无脸佛天然翡翠吊坠","ch602295","挂件","吊坠","冰种","冰白",1553604596095,48000,2,false);
insert into product values(null,30100,"冰种冰白蛋面天然翡翠项链","ch602295","挂件","项链","冰种","无色",1553604596095,4700,3,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1583604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1593604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1883604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1573604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1563604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1543604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1533604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1523604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1513604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1953604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1853604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1753604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1653604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1553604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1453604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1353604596095,4400,4,false);
insert into product values(null,7100,"糯种满绿天然翡翠扁管手镯","ch602295","饰品","手镯","糯种","满绿",1253604596095,4400,4,false);
#订单表
create table user_order(
  oid int primary key auto_increment comment "订单编号",
  userId int comment "用户编号",
  productId int comment "产品编号",
  total decimal(10,2) comment "价格总计",
  order_state int comment "订单状态"
);
insert into user_order values(null,1,1,10000,0);
insert into user_order values(null,1,1,10000,1);
insert into user_order values(null,1,1,10000,2);
insert into user_order values(null,1,1,10000,3);
insert into user_order values(null,1,1,10000,4);
#图片表
create table product_img(
  iid int primary key auto_increment comment "图片编号",
  photo1 varchar(128) comment "产品图",
  photo2 varchar(128) comment "产品图",
  photo3 varchar(128) comment "产品图",
  photo4 varchar(128) comment "产品图",
  banner varchar(128) comment "轮播图",
  promise varchar(128) comment "产品保障"
);
insert into product_img values(null,"photo_fo_1.jpg","photo_fo_2.jpg","photo_fo_3.jpg","photo_fo_4.jpg","banner1.jpg","promise.png");
insert into product_img values(null,"photo_face_1.jpg","photo_face_2.jpg","photo_face_3.jpg","photo_face_4.jpg","banner2.jpg","promise.png");
insert into product_img values(null,"photo_eag_1.jpg","photo_eag_2.jpg","photo_eag_3.jpg","photo_eag_4.jpg","banner3.jpg","promise.png");
insert into product_img values(null,"photo_sz_1.jpg","photo_sz_2.jpg","photo_sz_3.jpg","photo_sz_4.jpg","banner4.jpg","promise.png");
insert into product_img values(null,"photo_jz_1.jpg","photo_jz_2.jpg","photo_jz_3.jpg","photo_jz_4.jpg",null,"promise.png");
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
create table collect(
  cid int primary key auto_increment,
  coll_productId int comment "产品编号",
  coll_userId int comment "用户编号",
  coll_time bigint comment "收藏时间"
);
insert into collect values(null,1,1,1559366285389);
create table browse(
  bid int primary key auto_increment,
  brow_productId int comment "产品编号",
  brow_userId int comment "用户编号",
  brow_time bigint comment "收藏时间"
);
insert into browse values(null,1,1,1559366285389);