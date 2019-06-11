var insertCart;
var quickBuy;
$(function(){
    var uarr=location.pathname.split('/');
    var pid=parseInt(uarr[uarr.length-1].replace(".html",""));
  $(".phone_color .color_ricle").each(function(){
        var c=$(this).data("color").split("#");
        if(c.length==2){
            $(this).css("backgroundColor","#"+c[1]);
        }else if(c.length==3){
            $(this).css("backgroundImage","linear-gradient(to right bottom,#"+c[1]+",#"+c[2]+")");
        }
    })
    $(".over_count").html("X1");
    total_price();

    $(".my_indicators").on("click","li",function(){
        $(".my_indicators li").removeClass("active");
        $(this).addClass("active");
    })
    var p=parseFloat($(".pdt_price").html().replace(/[^0-9.]/ig,""));
    $(".hb>.row").html(fenqi(p,parseInt($(".qishu").data("mx"))));
    function fenqi(total,mx){
        var huaHtml="";
        var qishu,rate,all;
        for(var i=0;i<3;i++){
            switch (i){
                case 0:
                    qishu=3;
                    if(mx>=3){
                        rate=0;
                    }else{
                        rate=0.0023;
                    }
                    break;
                case 1:
                    qishu=6;
                    if(mx>=6){
                        rate=0;
                    }else{
                        rate=0.0045;
                    }
                    break;
                case 2:
                    qishu=12;
                    if(mx>=12){
                        rate=0;
                    }else{
                        rate=0.0075;
                    }
                    break;
            }
            var shouxu=+(parseFloat(total)*rate).toFixed(2);
            var fenqiCharge=+(parseFloat(total)/qishu).toFixed(2)+shouxu;
            huaHtml+='<div class="col-xs-4"><span class="btn-parm" data-qishu="3"><p>￥'+fenqiCharge.toFixed(2)+' x '+qishu+' 期</p>';
            huaHtml+='<p class="'+(rate==0?"charge_0":"charge_N0")+'">手续费 ￥'+shouxu+' / 期</p></span></div>';
        }
        return huaHtml;
    }
    var w=window.innerWidth ||document.documentElement.clientWidth;
    if(w>=767){
        scroll_pdt();
        $(window).on("scroll",scroll_pdt);
    }else{
		xs_scroll_pdt();
		$(window).on("scroll",xs_scroll_pdt);
	}
    var CommentsIndex=0;
    //获取评论个数
    $.ajax({
        type:'GET',
        url:"../data/getComCount.php",
        data:"pid="+pid,
        success:function(data){
            $(".allCom").html(data.allComments);
            $(".picCom").html(data.picComments);
            $(".addCom").html(data.addComments);

        },
        error:function(){
            console.log("获取评论数程序出错！")
        }
    })
   $(".comment_nav li:first-child").addClass("curComm");
    getComments("LIMIT 0,3");
    $(".comment_nav li").click(function(e){
        e.preventDefault();
        CommentsIndex=0;
        var i=$(this).index();
        $(".comment").html("");
        $(".comment_footer").hide();
        $(this).addClass("curComm");
        $(this).siblings().removeClass("curComm");
        if(i==0){
            getComments("LIMIT 0,3");
        }else if(i==1){
            getComments("AND cpic1 is not null LIMIT 0,3");
        }else if(i==2){
            getComments("AND comment_add is not null LIMIT 0,3");
        }
    })
    //小页面上点击查看全部评价
    getXsComment();
     $(document).on("click",".xs_allComments",function(e){
        e.preventDefault();
        $(".evaluate").addClass("div_fixed");
        $(".evaluate").css("marginTop","0");
         $(document.body) .css("position","fixed");
        if($(".comment_footer").is(":hidden")){
            $(".evaluate").on("scroll",more);
        }
        $(".evaluate").show();
    })

   $(".pdt_parm").on("click","span.btn-parm",function(){
        $(this).parents(".ps").find(".btn-parm").removeClass('cur')
        $(this).addClass('cur');
        if($(this).parents().is(".addbuy")){
            var selcted= $(this).contents().filter(function (index, content) {
                return content.nodeType === 3;
            }).text();
            if($(".over_text .over_add").length==0){
                if($(".over_text .over_ser").length==0){
                    $(".over_text").append('<p class="over_other over_add">'+selcted+'</p>');
                }else{
                    $(".over_text .over_ser").before('<p class="over_other over_add">'+selcted+'</p>');
                }

            }else{
                $(".over_text .over_add").html(selcted);
            }

        }else if($(this).parents().is(".pdt_service")){
            if($(".over_text .over_ser").length==0){
                $(".over_text").append('<p class="over_other over_ser">'+$(this).html()+'</p>');
            }else{
                $(".over_text .over_ser").html($(this).html());
            }

        }
        total_price();
    })
    //数量加减
    $(".buy_count").on('keyup paste', function(){
        var bc=$(this).val();
        if(bc==1){
            $(".minus").addClass("disable");
            $(".add").removeClass("disable");
        }else if(bc>=2){
            $(this).val(2);
            $(this).trigger("input");
            $(".minus").removeClass("disable");
            $(".add").addClass("disable");
        }else if(bc==''){
            $(this).val(1);
            $(this).trigger("input");
            $(".minus").addClass("disable");
            $(".add").removeClass("disable");
        }
    })
    $(".minus").click(function(){
        var bc=$(".buy_count").val();
        if(bc==2){
            $(".buy_count").val(bc-1);
            $(".buy_count").trigger("input");
            $(".minus").addClass("disable");
            $(".add").removeClass("disable");
        }
    })
    $(".add").click(function(){
        var bc=$(".buy_count").val();
        if(bc==1){
            $(".buy_count").val(parseInt(bc)+1);
            $(".buy_count").trigger("input");
            $(".add").addClass("disable");
            $(".minus").removeClass("disable");
        }
    })
   $(document).on("input propertychange",'.buy_count',function(){
        total_price();
        $(".over_count").html("X"+$(this).val());
    })

    $(".addToCart").click(function(e){
        e.preventDefault();
        var  userId=localStorage.getItem("uid");
        if(userId!=undefined){
            jump($(this));
            insertCart();
        }else{
            $(".nextHTML").val("cart");
            $('#loginModal').modal('show');
        }
    })
    $(".buy").click(function(e){
        e.preventDefault();
        var  userId=localStorage.getItem("uid");
        if(userId!=undefined){
            jump($(this));
            quickBuy();
            location.href="../buy.html?quickBuy=1";
        }else{
            $(".nextHTML").val("buy");
            $('#loginModal').modal('show');
        }
    })

    //按空白处对话框隐藏
    $("#loginModal").click(function(){
    $('#loginModal').modal('hide');
})
    $(".modal-dialog").click(function(e){
        e.stopPropagation();
    })
    $(window).on("resize",function(){
        var w=window.innerWidth ||document.documentElement.clientWidth;
        if(w>=767){
			$(window).off("scroll",xs_scroll_pdt);
            $(window).on("scroll",scroll_pdt);
            $(".evaluate").removeClass("div_fixed");
            $(document.body) .css("position","static");
            var $slider = $('.pdt_thumbnail .carousel-inner');
        }else{
			$(window).off("scroll",scroll_pdt);
			$(window).on("scroll",xs_scroll_pdt);
			$(".pdt_thumbnail").removeClass("pdt_fixed");
			$(".pdt_thumbnail").removeClass("pdt_bottom");
		}
    })
    $(".back").click(function(){
        $(".evaluate").removeClass("div_fixed");
        $(document.body) .css("position","static");
        $(".evaluate").hide();
    })
    //加入购物车数据库
    insertCart=function(){
        var t=param();
        $.ajax({
            type:'POST',
            url:'../data/insertcart.php',
            data:t,
            success:function(data){
                if(data[0].code>0){
                   location.href="../cart.html";
                }
            },
            error:function(){
                console.log("插入购物车程序失败")
            }
        })
    }
    //立即购买
    quickBuy=function(){
        var c=param();
        sessionStorage.clear();
        for(var key in c){
           sessionStorage[key]=c[key];
        }

    }
    //手机图片拖动轮播效果
    phoneMove();


    function getComments(term){
        $.ajax({
            type:'GET',
            url:"../data/getComment.php",
            data:"term="+term+"&pid="+pid,
            success:function(data){
                if(data[0].code<0){
                    if(data[0].code==-2){
                        $(".comment_footer").show();
                        if($(".comment").html().replace(/\s/g,"").length==0){
                            $(".comment_footer").html("暂无任何评论！");
                        }
                    }else{
                        console.log("查询评论失败");
                    }
                }else{
                    var cHtml="";
                    for(var i=0;i<data.length;i++){
                        cHtml+='<div class="row"><div class="col-xs-12 col-sm-3 u_info"><div class="row"><div class="col-xs-1 col-sm-2"><img src="'+data[i].upic+'"></div><div class="col-xs-11 col-sm-10"><div class="col-xs-6 col-sm-12"><p class="comment_user">'+data[i].uname+'</p><p class="xs_commen_date">'+data[i].cdate+'</p></div><div class="col-xs-6 col-sm-12 user_star">';
                        for(var j=0;j<data[i].uxc;j++){
                            cHtml+='<span class="iconfont icon-star"></span>';
                        }
                        cHtml+='</div></div></div></div>';
                        cHtml+='<div class="col-sm-9 comment_detail"><div class="row first_comment"><div class="col-sm-10"><p>'+data[i].comment+'</p>';
                        if(data[i].cpic1!=null){
                            cHtml+='<div class="comment_img"><a href=""><img src="'+data[i].cpic1+'"></a>';
                            cHtml+=(data[i].cpic2!=null)?'<a href=""><img src="'+data[i].cpic2+'"></a>':'';
                            cHtml+=(data[i].cpic3!=null)?'<a href=""><img src="'+data[i].cpic3+'"></a>':'';
                            cHtml+=(data[i].cpic4!=null)?'<a href=""><img src="'+data[i].cpic4+'"></a>':'';
                            cHtml+='</div>';
                        }
                        cHtml+='</div><div class="col-sm-2 text-right hidden-xs">'+data[i].cdate+'</div></div>';
                        if(data[i].comment_add!=null){
                            cHtml+='<div class="row add_comment"><div class="col-sm-10"><p class="xs_add_date">'+data[i].cddate+'</p><p><span class="lab">追加评价:</span>'+data[i].comment_add+'</p>';
                            if(data[i].cdpic1!=null){
                                cHtml+='<div class="comment_img"><a href=""><img src="'+data[i].cdpic1+'"></a>';
                                cHtml+=(data[i].cdpic2!=null)?'<a href=""><img src="'+data[i].cdpic2+'"></a>':'';
                                cHtml+=(data[i].cdpic3!=null)?'<a href=""><img src="'+data[i].cdpic3+'"></a>':'';
                                cHtml+=(data[i].cdpic4!=null)?'<a href=""><img src="'+data[i].cdpic4+'"></a>':'';
                                cHtml+='</div>';
                            }
                            cHtml+='</div><div class="col-sm-2 text-right hidden-xs">'+data[i].cddate+'</div></div>';
                            if(data[i].replay!=null){
                                cHtml+='<div class="row replay"><div class="col-sm-9"><p><span class="lab">官方回复：</span>'+data[i].replay+'</p></div></div>';
                            }
                            cHtml+='</div></div>';
                        }
                        cHtml+='</div></div>';
                    }
                    if($(".comment").html()==""){
                        $(".comment").html(cHtml);
                    }else{
                        $(".comment").append(cHtml);
                    }

                }
            },
            fail:function(){
                console.log("获取评论程序出错！")
            }
        })
    }
    //获取小屏幕下的单个评价
    function getXsComment(){
        $.ajax({
            type:'GET',
            url:"../data/getXsComment.php",
            data:"pid="+pid,
            success:function(data){
                if(data[0].code<0){
                    if(data[0].code==-2){
                        $(".xs_comment").html('<div class="xs_null">暂无任何评论</div>')
                    }else{
                        console.log("查询单个评论失败");
                    }
                }else{
                    var xsHtml='<a href="#" class="xs_allComments"></a>';
                    xsHtml+='<div class="row user_info"><div class="col-xs-6 u_info"><div class="row"><div class="col-xs-2"><img src="'+data[0].upic+'"></div>';
                    xsHtml+='<div class="col-xs-10"><p class="comment_user">'+data[0].uname+'</p><p class="xs_commen_date">'+data[0].cdate+'</p></div></div></div>';
                    xsHtml+='<div class="col-xs-6 text-right">';
                    for(var j=0;j<data[0].uxc;j++){
                        xsHtml+='<span class="iconfont icon-star"></span>';
                    }
                    xsHtml+='</div></div>';
                    xsHtml+='<div class="row xs_comment_content"><div><img src="'+data[0].cpic1+'"/></div>';
                    xsHtml+='<div class="xs_comment_desc"><p>'+data[0].comment+'</p></div></div>';
                    $(".xs_comment").append(xsHtml);
                }
            },
            fail:function(){
                console.log("获取单个评论程序出错！")
            }
        })
    }
    function more(){
        var wst=$(document).scrollTop();
        var wh=$(window).height();
        var sum = $(".comment").offset().top+$(".comment").height();//元素底部距离文档的高度
        var cur= wst+wh;//浏览器窗口底部位于文档的距离
        if (sum<=cur) {
            CommentsIndex+=3;
            var i=$(".comment_nav .curComm").index();
            if(i==0){
                getComments("LIMIT "+CommentsIndex+",3");
            }else if(i==1){
                getComments("AND cpic1 is not null LIMIT "+CommentsIndex+",3");
            }else if(i==2){
                getComments("AND comment_add is not null LIMIT "+CommentsIndex+",3");
            }
        }
    }
    //  滚动图片固定位置
    function scroll_pdt(){
        var wst=$(document).scrollTop();
        var iet=$(".pdt_detail").offset().top;
        var wh=$(window).height();
        var th=$(".pdt_text").height();
        var ih=$(".pdt_thumbnail").height();
        var dh=$(".pdt_detail").innerHeight();
        var tbh=th-wh-(wst-iet);
        var ibh=ih-wh;
        var sum = $(".comment").offset().top+$(".comment").height();
        //产品介绍图片位置
        if(wst>iet){
            if(ibh>=tbh){
                $(".pdt_thumbnail").removeClass("pdt_fixed");
                $(".pdt_thumbnail").addClass("pdt_bottom");

            }else{
                $(".pdt_thumbnail").removeClass("pdt_bottom");
                $(".pdt_thumbnail").addClass("pdt_fixed");
            }
        }else{
            $(".pdt_thumbnail").removeClass("pdt_fixed");
        }
        //购买标题定位
        if((wst-iet)>dh){
            $(".overview").show();
        }else{
            $(".overview").hide();
        }
        //加载更多
        if($(".comment_footer").is(":hidden")){
            more();
        }

    }
    function xs_scroll_pdt(){
        var wst=$(document).scrollTop();
        var iet=$(".pdt_detail").offset().top;
        var ih=$(".pdt_thumbnail").height();
        if((wst-iet)>ih){
            $(".overview").show();
        }else{
            $(".overview").hide();
        }
    }
    function param(){
        var options={
            pdtname: $(".pdt_title").html(),
            price:parseFloat($(".pdt_price").html().replace(/[^0-9.]/ig,"")),
            pic:$(".over_img>img").attr("src").replace(/..\//,""),
            pdtcount:$(".buy_count").val(),
            userid:localStorage["uid"],
            isbuy:0,
        }
        var i=1;
        if($('.addbuy .cur').length>0){
            var addbuy= $('.addbuy .cur').contents().filter(function (index, content) {
                return content.nodeType === 3;
            }).text();
            var arr=addbuy.split("￥");
            options.pdtadd=arr[0];
            options.addprice=parseFloat(arr[1],2);
            i++;

        }
        if($('.pdt_service .cur').length>0){
            var pdtService= $('.pdt_service .cur').contents().filter(function (index, content) {
                return content.nodeType === 3;
            }).text();
            var arr=pdtService.split("￥");
            options.service=arr[0];
            options.sprice=parseFloat(arr[1],2);
        }
        if($(".hb .cur").length>0){
            options.huafen=$(".hb .cur").attr("data-qishu");
        }
        if($(".zeng").length>0){
            options.zeng=$(".zeng p").html();
            options.zenpic=$(".zeng img").attr("src").replace(/..\//,"");
            i++;
        }
        options.allprice=parseFloat($(".over_total").html().split("￥")[1]);
        options.allcount= parseInt($(".buy_count").val())*i;
        options.mx=$(".qishu").data("mx");
        return options
    }
    function phoneMove(){
        var $slider = $('.pdt_thumbnail .carousel-inner');
        var $li = $slider.children('div');
        var WIDTH = $li.width();
        var SIZE = $li.size();
        var $line=$(".line-nav .cur");
        var w=$line.width();
        var ox,mx,sumx,scroll,linex,lineLeft,curW,i=0,bool=false;
        $slider.mousedown(function(e){
            //鼠标左键轮播区域
            if(e.target.tagName == 'IMG'){
                //左键图片
                sumx = 0;
                //初始化鼠标偏移为0
                bool = true;
                //记录左键状态
                ox = e.pageX;
                //记录鼠标初始坐标
                //scroll=parseFloat($slider.css("transform").split(",")[4]);
                scroll=parseFloat($slider.css("left"));
                lineLeft=parseFloat($line.css("left"));
                if(isNaN(lineLeft)){
                    lineLeft=0;
                }
                if(isNaN(scroll)){
                    scroll=0;
                }
                e.preventDefault();
                //阻止鼠标点击默认事件
            }
        });
        $slider.mousemove(function(e){
            //鼠标在轮播区域移动
            e.preventDefault();
            if(bool){//左键状态
                mx = e.pageX;
                //记录鼠标实时坐标
                sumx =mx-ox;
                //记录鼠标坐标偏移
                //$slider.css("transform","translateX("+(scroll+sumx)+"px)");
                $slider.css("left",scroll+sumx+"px");
                linex=-sumx*w/WIDTH;
                if(i==0 && sumx>0){
                    $line.css("width",w+linex+"px");
                }else if(i==SIZE-1&& sumx<0){
                    $line.css("left",i*w+linex+"px");
                    $line.css("width",w-linex+"px");
                }else{
                    $line.css("left",lineLeft+linex+"px");
                }
            }
        });
        $slider.mouseleave(function(e){
            e.preventDefault();
            //鼠标离开轮播区域
            if(bool){
                //左键状态
                bool = false;//释放左键状态
                moveEnd();
            }
        });
        $slider.mouseup(function(e){
            e.preventDefault();
            if(bool){
                bool = false;
                //释放左键状态
                moveEnd();
            }
        });
        function moveEnd(){
            //scroll=parseFloat($slider.css("transform").split(",")[4]);
            scroll=parseFloat($slider.css("left"));
            lineLeft=parseFloat($line.css("left"));
            if(sumx < -WIDTH/2 && i <(SIZE-1)){
                i++;
                $(".my_indicators li").removeClass("active");
                $(".my_indicators li").eq(i).addClass("active");

            }
            if(sumx > WIDTH/2 && i >0){
                i--;
                $(".my_indicators li").removeClass("active");
                $(".my_indicators li").eq(i).addClass("active");
            }
            if((i==0 && sumx>0) || (i==SIZE-1 &&sumx<0)){
                curW=parseFloat($line.css("width"));
            }
            var start = null;
            function step(timestamp){
                if (!start) start = timestamp;
                var progress = timestamp - start;
                if(progress>1000){
                    //$slider.css("transform","translateX("+(-i)*WIDTH+"px)");
                    $slider.css("left",(-i)*WIDTH+"px");
                    $line.css("left",i*w+'px');
                    if((i==0 && sumx>0) || (i==SIZE-1 &&sumx<0)){
                        $line.css("width",w+"px");
                    }
                    cancelAnimationFrame(timer);
                }else{
                    //$slider.css("transform","translateX("+(scroll-(scroll+i*WIDTH)*progress/1000)+"px)");
                    $slider.css("left",(scroll-(scroll+i*WIDTH)*progress/1000)+"px");
                    $line.css("left",(lineLeft-(lineLeft-i*w)*progress/1000)+'px');
                    if((i==0 && sumx>0) || (i==SIZE-1 &&sumx<0)){
                        $line.css("width",curW+(-curW+w)*progress/1000+"px");
                    }
                    requestAnimationFrame(step);
                }
            }
            var timer=requestAnimationFrame(step);
        }
       $(window).resize(function(){
            WIDTH = $li.width();
            $(".my_indicators li").removeClass("active");
            $(".my_indicators li").eq(0).addClass("active");
            i=0;
            //$slider.css("transform","translateX(0px)");//归位
            $slider.css("left","0px");//归位
            $line.css("left",'0px');
        });
        $(".my_indicators").on("click","li",function(){
            //var scroll=parseFloat($slider.css("transform").split(",")[4]);
            var scroll=parseFloat($slider.css("left"));
            if(isNaN(scroll)){
                scroll=0;
            }
            var WIDTH=$('.pdt_thumbnail .carousel-inner>div').width();
            var w=$(".line-nav .cur").width();
            var i=$(this).index();
            var start = null;
            function step(timestamp){
                if (!start) start = timestamp;
                var progress = timestamp - start;
                if(progress>1000){
                    //$slider.css("transform","translateX("+(-i)*WIDTH+"px)");
                    $slider.css("left",(-i)*WIDTH+"px");
                    cancelAnimationFrame(timer);
                }else{
                    //$slider.css("transform","translateX("+(scroll-(scroll+i*WIDTH)*progress/1000)+"px)");
                    $slider.css("left",(scroll-(scroll+i*WIDTH)*progress/1000)+"px");
                    requestAnimationFrame(step);
                }
            }
            var timer=requestAnimationFrame(step);
        })
    }
    //计算总金额
    function total_price(){
        var count=$(".buy_count").val();
        var p1=parseFloat($(".pdt_price").html().split("￥")[1]);
        var p2=0;
        var p3=0;
        if($(".over_text .over_add").length>0){
            p2=parseFloat($(".over_text .over_add").html().split("￥")[1]);
        }
        if($(".over_text .over_ser").length>0){
            p3=parseFloat($(".over_text .over_ser").html().split("￥")[1]);
        }
        var t_price=(p1+p2+p3)*count;
        $(".over_total").html("￥"+t_price);
    }
    function jump(btn){
        var i=1;
        btn.html("提交中.")
        setInterval(function(){
            i++;
            if(i%3==1){
                btn.html("提交中.");
            }else if(i%3==2){
                btn.html("提交中..");
            }else if(i%3==0){
                btn.html("提交中...");
            }
        },1000);
    }
})
