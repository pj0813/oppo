SET NAMES UTF8;
USE my9700730;

CREATE TABLE user_list(uid INT PRIMARY KEY AUTO_INCREMENT,phoneNum VARCHAR(11),pwd VARCHAR(32));
INSERT INTO user_list VALUES(null,'13911111111','1qaz2wsx');
INSERT INTO user_list VALUES(null,'13811111111','profile.php');
CREATE TABLE acc_cate(cid INT PRIMARY KEY AUTO_INCREMENT,catename VARCHAR(32));
INSERT INTO acc_cate VALUES(null,'推荐');
INSERT INTO acc_cate VALUES(null,'数据线/适配器');
INSERT INTO acc_cate VALUES(null,'耳机');
INSERT INTO acc_cate VALUES(null,'保护壳');
INSERT INTO acc_cate VALUES(null,'其他');

CREATE TABLE accessories(aid INT PRIMARY KEY AUTO_INCREMENT,accname VARCHAR(32),price DOUBLE(10,2),pic VARCHAR(32),cate INT,tables VARCHAR(32));
INSERT INTO accessories VALUES(null,'O-Free无线耳机',699,'img/11.jpg',1,'立减20元');
INSERT INTO accessories VALUES(null,'R17 Pro 保护壳',149,'img/12.jpg',1,'新品');
INSERT INTO accessories VALUES(null,'闪充 USB 数据线',29,'img/13.jpg',1,'立减3元');
INSERT INTO accessories VALUES(null,'闪充电源适配器',79,'img/14.jpg',1,'立减8元');
INSERT INTO accessories VALUES(null,'半入耳式耳机',59,'img/15.jpg',1,'立减6元');
INSERT INTO accessories VALUES(null,'Find X 保护壳',199,'img/16.jpg',1,'立减20元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/17.jpg',1,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/21.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/22.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/23.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/24.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/25.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/26.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/26.jpg',2,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/31.jpg',3,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/32.jpg',3,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/33.jpg',3,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/34.jpg',3,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/35.jpg',3,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/41.jpg',4,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/42.jpg',4,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/43.jpg',4,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/44.jpg',4,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/45.jpg',4,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/46.jpg',4,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/51.jpg',5,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/52.jpg',5,'立减9元');
INSERT INTO accessories VALUES(null,'超闪数据线',89,'img/53.jpg',5,'立减9元');

CREATE TABLE comments (
  cid int(11) NOT NULL,
  uname varchar(32) DEFAULT NULL,
  upic varchar(32) DEFAULT NULL,
  uxc int(11) DEFAULT NULL,
  comment varchar(500) DEFAULT NULL,
  cpic1 varchar(32) DEFAULT NULL,
  cpic2 varchar(32) DEFAULT NULL,
  cpic3 varchar(32) DEFAULT NULL,
  cpic4 varchar(32) DEFAULT NULL,
  cdate date DEFAULT NULL,
  comment_add varchar(500) DEFAULT NULL,
  cdpic1 varchar(32) DEFAULT NULL,
  cdpic2 varchar(32) DEFAULT NULL,
  cdpic3 varchar(32) DEFAULT NULL,
  cdpic4 varchar(32) DEFAULT NULL,
  cddate date DEFAULT NULL,
  replay varchar(500) DEFAULT NULL,
  isrecommend int(11) DEFAULT NULL,
  pid int(11) DEFAULT NULL
);

INSERT INTO comments (cid, uname, upic, uxc, comment, cpic1, cpic2, cpic3, cpic4, cdate, comment_add, cdpic1, cdpic2, cdpic3, cdpic4, cddate, replay, isrecommend,pid) VALUES
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '这是买的第四部oppo手机了，拿到手还是很激动的，外观漂亮，很吸引眼球，系统反应很快，拍照很强大，相片拍出来很棒速度和介绍的一样快，很满意，继续支持oppo', NULL, NULL, NULL, NULL, '2018-11-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '手机好用，无敌流畅', NULL, NULL, NULL, NULL, '2018-11-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '默认好评！', NULL, NULL, NULL, NULL, '2018-11-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '默认好评！', NULL, NULL, NULL, NULL, '2018-11-14', '物有所值，物流也快，点赞', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', NULL, NULL, '2018-11-15', NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '手机非常好，速度没得说，游戏都是完美运行，我下了一堆东西都不卡，很值得拥有。OPPO手机就是厉害！', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', '../img/pdt/sm_comment_13.jpg', '../img/pdt/sm_comment_14.jpg', '2018-11-14', '物有所值，物流也快，点赞', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', NULL, NULL, '2018-11-15', '亲爱的O粉，简短的几句肯定胜过无数的赞美，您的满意就是对我们最大的支持！小欧相信产品使用过程中能够带给您更多便利与欢乐~【Find X ,Find more】', 1,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '手机非常好，速度没得说，游戏都是完美运行，我下了一堆东西都不卡，很值得拥有。OPPO手机就是厉害！', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', '../img/pdt/sm_comment_13.jpg', '../img/pdt/sm_comment_14.jpg', '2018-11-14', NULL, NULL, NULL, NULL, NULL, '2018-11-15', '您的评价太太太赞啦，么么哒~FindX采用6.42英寸曲面全景屏，屏占比高达93.8%，横屏全屏时支持任意应用中呼出快捷应用进行使用，可以满足更多应用哦。期待后续您在使用产品的过程中能收获更多的惊喜！【Find X ,Find more】', 1,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '这是买的第四部oppo手机了，拿到手还是很激动的，外观漂亮，很吸引眼球，系统反应很快，拍照很强大，相片拍出来很棒速度和介绍的一样快，很满意，继续支持oppo', NULL, NULL, NULL, NULL, '2018-11-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '手机好用，无敌流畅', NULL, NULL, NULL, NULL, '2018-11-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '默认好评！', NULL, NULL, NULL, NULL, '2018-11-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '默认好评！', NULL, NULL, NULL, NULL, '2018-11-14', '物有所值，物流也快，点赞', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', NULL, NULL, '2018-11-15', NULL, 0,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '手机非常好，速度没得说，游戏都是完美运行，我下了一堆东西都不卡，很值得拥有。OPPO手机就是厉害！', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', '../img/pdt/sm_comment_13.jpg', '../img/pdt/sm_comment_14.jpg', '2018-11-14', '物有所值，物流也快，点赞', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', NULL, NULL, '2018-11-15', '亲爱的O粉，简短的几句肯定胜过无数的赞美，您的满意就是对我们最大的支持！小欧相信产品使用过程中能够带给您更多便利与欢乐~【Find X ,Find more】', 1,1),
(null, 'OPPO用户', '../img/pdt/head_img.png', 5, '手机非常好，速度没得说，游戏都是完美运行，我下了一堆东西都不卡，很值得拥有。OPPO手机就是厉害！', '../img/pdt/sm_comment_11.jpg', '../img/pdt/sm_comment_12.jpg', '../img/pdt/sm_comment_13.jpg', '../img/pdt/sm_comment_14.jpg', '2018-11-14', NULL, NULL, NULL, NULL, NULL, '2018-11-15', '您的评价太太太赞啦，么么哒~FindX采用6.42英寸曲面全景屏，屏占比高达93.8%，横屏全屏时支持任意应用中呼出快捷应用进行使用，可以满足更多应用哦。期待后续您在使用产品的过程中能收获更多的惊喜！【Find X ,Find more】', 1,1);

CREATE TABLE cart(cid INT PRIMARY KEY AUTO_INCREMENT,pdtname VARCHAR(32),price DOUBLE(10,2),pic VARCHAR(32),pdtcount INT, pdtadd VARCHAR(32),addprice DOUBLE(10,2),service VARCHAR(32),sprice DOUBLE(10,2),zeng VARCHAR(32),zenpic VARCHAR(32),huafen INT,allprice DOUBLE(10,2),allcount INT,userid INT,mx VARCHAR(6),isbuy INT);

CREATE TABLE addrs(aid BIGINT PRIMARY KEY AUTO_INCREMENT,aname VARCHAR(32),atel VARCHAR(11),pro VARCHAR(8),city VARCHAR(12),dis VARCHAR(12),detail VARCHAR(32),isdefault TINYINT(1),uid INT);
INSERT INTO addrs VALUES(null,"彭姐","13915612876","江苏省","苏州市","常熟市","梅李镇通港工业园",1,1);

CREATE TABLE sales(sid VARCHAR(20) PRIMARY KEY,sprice DOUBLE(10,2),state INT,uid INT);
INSERT INTO sales VALUES("1qaz1qaz",200.00,1,1);
INSERT INTO sales VALUES("2wsx2wsx",200.00,0,1);

CREATE TABLE orders(oid VARCHAR(15) PRIMARY KEY,addrid BIGINT,price DOUBLE(10,2),orderTime BIGINT,status INT,fap VARCHAR(20),faccode VARCHAR(20),facname VARCHAR(32),huafen INT,uid INT,mx INT);

CREATE TABLE order_detail(did BIGINT PRIMARY KEY AUTO_INCREMENT,orderId VARCHAR(15),count INT,pdtname VARCHAR(32),pic VARCHAR(32),pdtadd VARCHAR(32),service VARCHAR(32),zeng VARCHAR(32));

CREATE TABLE phone_cate(pcid INT PRIMARY KEY AUTO_INCREMENT,pcname VARCHAR(12),isBanner INT);
INSERT INTO phone_cate VALUES(null,'Find X',0);
INSERT INTO phone_cate VALUES(null,'A1',0);
INSERT INTO phone_cate VALUES(null,'A3',0);
INSERT INTO phone_cate VALUES(null,'A5',0);
INSERT INTO phone_cate VALUES(null,'K1',1);
INSERT INTO phone_cate VALUES(null,'R17 Pro',1);
CREATE TABLE phone(pid INT PRIMARY KEY AUTO_INCREMENT,pcid INT,psize VARCHAR(12),pdesc VARCHAR(12),price DOUBLE(10,2),pic VARCHAR(32),pcolor VARCHAR(14),pbcolor VARCHAR(14),mx VARCHAR(12),isShop INT,isWhite INT,xslpic VARCHAR(32),xsrpic VARCHAR(32),bgcolor VARCHAR(14));
INSERT INTO phone VALUES(null,1,'8G+128G','超级闪充',4999.00,'img/FX_01.jpg','#080D10#0BB3D7','#0BB3D7','6期免息',0,0,null,null,'#fff');
INSERT INTO phone VALUES(null,1,'8G+128G','骁龙845',4999.00,'img/FX_02.jpg','#0C080E#E21C7D','#E21C7D','6期免息',0,0,null,null,'#fff');
INSERT INTO phone VALUES(null,1,'8G+256G','超级闪充',5999.00,'img/FX_01.jpg','#080D10#0BB3D7','#0BB3D7','6期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,1,'8G+256G','骁龙845',5999.00,'img/FX_02.jpg','#0C080E#E21C7D','#E21C7D','6期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,2,'3G+32G','后置1300万',1000.00,'img/A1_01.jpg','#375CAC','#375CAC','3期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,2,'3G+32G','面部识别',1000.00,'img/A1_02.jpg','#B01E28','#B01E28','3期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,2,'3G+32G','千元全面屏',1000.00,'img/A1_03.jpg','#F7BE9E','#F7BE9E','3期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,3,'4G+64G','钻石纹理机身',1599.00,'img/A3_01.jpg','#1d1f22','#1d1f22','3期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,3,'4G+128G','钻石纹理机身',1799.00,'img/A3_02.jpg','#c43e38','#c43e38','3期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,4,'3G+64G','强悍续航',1300.00,'img/A5_01.jpg','#FFE5E5#FFD2D5','#FFD2D5','0期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,4,'3G+64G','强悍续航',1300.00,'img/A5_02.jpg','#788DED#1E2F90','#1E2F90','0期免息',0,0,null,null,'#fff');
INSERT INTO phone VALUES(null,4,'4G+64G','全屏双摄',1500.00,'img/A5_02.jpg','#788DED#1E2F90','#1E2F90','0期免息',1,0,null,null,'#fff');
INSERT INTO phone VALUES(null,4,'4G+64G','全屏双摄',1500.00,'img/A5_01.jpg','#FFE5E5#FFD2D5','#FFD2D5','0期免息',0,0,null,null,'#fff');
INSERT INTO phone VALUES(null,5,'6G+64G','骁龙660',1799.00,'img/K1_01.jpg','#585858#111111','#585858','3期免息',1,0,"img/xs_K1_11.png","img/xs_K1_12.png",'#FFFFFF');
INSERT INTO phone VALUES(null,5,'4G+64G','骁龙660',1599.00,'img/K1_01.jpg','#585858#111111','#585858','3期免息',0,0,null,null,'#fff');
INSERT INTO phone VALUES(null,5,'6G+64G','前置2500万',1799.00,'img/K1_02.png','#c9d3d2#325d63','#c9d3d2','3期免息',1,0,"img/xs_K1_21.png","img/xs_K1_22.png",'#d1e8f1');
INSERT INTO phone VALUES(null,5,'4G+64G','前置2500万',1599.00,'img/K1_02.png','#c9d3d2#325d63','#c9d3d2','3期免息',0,0,null,null,'#fff');
INSERT INTO phone VALUES(null,5,'6G+64G','光感屏幕指纹',1799.00,'img/K1_03.png','#1a49d8#aa25a4','#554dff','3期免息',1,1,"img/xs_K1_31.png","img/xs_K1_32.png",'#111d4e');
INSERT INTO phone VALUES(null,5,'4G+64G','光感屏幕指纹',1599.00,'img/K1_03.png','#1a49d8#aa25a4','#554dff','3期免息',0,1,null,null,'#fff');
INSERT INTO phone VALUES(null,5,'4G+64G','骁龙660',1599.00,'img/K1_04.png','#e82444#290006','#53000f','3期免息',1,1,"img/xs_K1_41.png","img/xs_K1_42.png",'#5e0713');
INSERT INTO phone VALUES(null,5,'6G+64G','骁龙660',1799.00,'img/K1_04.png','#e82444#290006','#53000f','3期免息',0,1,null,null,'#fff');
INSERT INTO phone VALUES(null,6,'8G+128G','金小猪设计',4299.00,'img/R17P_01.jpg','#D33035#7A080A','#D33035','6期免息',1,0,'img/xs_R17P_11.png','img/xs_R17P_12.png','#FFFFFF');
INSERT INTO phone VALUES(null,6,'6G+128G','超级闪充',3999.00,'img/R17P_02.jpg','#A37AFE#6CE6E2','#A37AFE','6期免息',1,1,'img/xs_R17P_21.png','img/xs_R17P_22.png','#231253');
INSERT INTO phone VALUES(null,6,'8G+128G','超级闪充',4299.00,'img/R17P_02.jpg','#A37AFE#6CE6E2','#A37AFE','6期免息',0,1,null,null,'#fff');
INSERT INTO phone VALUES(null,6,'8G+128G','超强夜拍',4299.00,'img/R17P_03.jpg','#00312f#009591','#00312f','6期免息',1,1,'img/xs_R17P_31.png','img/xs_R17P_32.png','#009b93');
INSERT INTO phone VALUES(null,6,'6G+128G','超强夜拍',3999.00,'img/R17P_03.jpg','#00312f#009591','#00312f','6期免息',0,1,null,null,'#fff');


