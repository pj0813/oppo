var requestAnimation=function() {
    //requestAnimationFrame的兼容性
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    var prefix;
//requestAnimationFrame的兼容性
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    var prefix;
//通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
    for( var i = 0; i < prefixes.length; i++ ) {
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
        cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
    }

//如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
    if ( !requestAnimationFrame || !cancelAnimationFrame ) {
        requestAnimationFrame = function( callback, element ) {
            var currTime = new Date().getTime();
            //为了使setTimteout的尽可能的接近每秒60帧的效果
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function() {
                callback( currTime + timeToCall );
            }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function( id ) {
            window.clearTimeout( id );
        };
    }

//得到兼容各浏览器的API
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
}
window.getWidth= function(){
    if(window.innerHeight!= undefined){
        return window.innerHeight;
    }
    else{
        var B= document.body, D= document.documentElement;
        return Math.min(D.clientHeight, B.clientHeight);
    }
}
$(function() {

	requestAnimation();
	var head="",foot="";
    $(".header").load("header.html",function(){
        var  userId=localStorage.getItem("uid");
        if(userId!=undefined){
            $(".isLogin").html("退出账号");
            $(".login_info").click(function(e){
                e.preventDefault();
                localStorage.removeItem("uid");
                location.reload();
            })
        }else{
            $(".isLogin").html("登录");
        }
        $(".phone>a").click(function(e){
            e.preventDefault();
        })
        $(document).click(function(e){
			var x=e.clientX;
			var y=e.clientY;
			var btn=$(".header .navbar-toggle");
			var divT=btn.offset().top;
			var divL=btn.offset().left;
			var w=btn.width();
			var h=btn.height();
	
			if((x>=divL&&x<=(divL+w))&&(y>=divT&&y<=(divT+h))){
				
			}else{
				
			}
        })
        $(".header .navbar-toggle").click(function(){
            $(this).toggleClass("active");
            $('.header').toggleClass("headBg");
            $("#oppobar>.navbar-nav").css("padding","40px");
            if($(this).hasClass("active")){
                $(document.body).css("position","fixed");
                $(".header").addClass("div_fixed");
                $(".navbar-header").addClass("h_fixed");
                $(".menu").addClass("m_fixed");
            }else{
                $(document.body).css("position","static");
                $(".header").removeClass("div_fixed");
                $(".navbar-header").removeClass("h_fixed");
                $(".menu").removeClass("m_fixed");
            }
        });
        var w=window.innerWidth ||document.documentElement.clientWidth;
        var h = $(window).height();
        if(w<767){
            clickPhone();
        }else{
            phoneCateStyle();
            hoverPhone();
        }
    })

  $(".footer").load("footer.html",function(){
        $('.footer dl').on('click','span',function(e){
            var elem=$(e.target).parents('dl');
            if(elem.hasClass('active')){
                elem.removeClass('active');
            }else{
                elem.addClass('active')
            }
        })

      var w=window.innerWidth ||document.documentElement.clientWidth;
      if(w<767){
          $('.footer dl dt>span').addClass('iconfont icon-jia');
      }
    })
    var w=window.innerWidth ||document.documentElement.clientWidth;
    var h = $(window).height();
    if(w<767){
        headFoot();
    }else{

	}
    $("#banner").css("height", h);
    $("#shop_banner").css("height", h);
	center_img();
    //窗口变化大小后显示样式
    $(window).resize(function() {
        $("#banner").css("height",$(this).height());
        $("#shop_banner").css("height",$(this).height());
        w=window.innerWidth ||document.documentElement.clientWidth;
        //轮播图背景
        $(".phone").off("mouseenter").off("mouseleave");
        $(".phone>a").off("click");
        $(".phoneDown").removeClass("phoneUp");
        if(w<=767){
            headFoot();
            $('.footer dl dt>span').addClass('iconfont icon-jia');
            $(".phone_cate").removeAttr("style");
           clickPhone();
            $(".hover_pic").removeAttr("style");
        }else{
            $(".navbar-toggle").removeClass('active');
            $("#oppobar>.navbar-nav").css("padding","0");
            setMenuWidth(280);
            $("#oppobar").removeClass("in");
            //$('.banner .btn').show();
            $('.footer dl dt>span').removeClass('iconfont icon-jia');
            $(".header").removeClass("headBg");
            $(".phone_cate").hide();
            $(document.body).css("position","static");
            $(".header").removeClass("div_fixed");
            $(".navbar-header").removeClass("h_fixed");
            $(".menu").removeClass("m_fixed");
            phoneCateStyle();
            hoverPhone();
        }
       // bannerWH();
        //图片只显示中间部分两边去掉
        center_img();
    })
    function headFoot(){
        setMenuWidth($(window).width());
        //$('.banner .btn').hide();
    }
    function setMenuWidth(w){
        $('.menu .dropdown-menu').outerWidth(w);
    }

//轮播
    if($('.banner_bg').eq(0).hasClass('white')){
        $('.header').addClass('headWhite');
    }
    $('.banner').on('slide.bs.carousel', function (event) {
        $items = $(event.relatedTarget);
        if($items.find(".banner_bg").hasClass('white')){
            $('.header').addClass('headWhite');
        }else{
            $('.header').removeClass('headWhite');
        }
    });
   $(".banner_head").carousel({
        interval: 4000,
        pause: 'none'
    })
    circleLi($(".banner_head"),$(".banner_head .item").eq(0));
    $(".banner_head").on('slide.bs.carousel', function (event) {
        $items = $(event.relatedTarget);
        var dir=$(event.direction).selector;
        circleLi($(this),$items);
        var item0=$items.find(".banner_desc");
        var item1=$items.find(".banner_img");
        item0.css("visibility","hidden");
        item1.css("visibility","hidden");
        if(dir=="left"){
            if(item1.find("img").length>0){
                leftMove(item1,function(){
                    leftMove(item0);
                })
            }else{
                leftMove(item0);
            }
        }else if(dir=="right"){
            if(item1.find("img").length>0){
                rightMove(item1,function(){
                    rightMove(item0);
                })
            }else{
                rightMove(item0);
            }
        }
    })
    function leftMove(item,callback){
        item.css("visibility","visible");
        item.css("transform","matrix(1,0,0,1,500,0)");
        item.css("opacity",0);
        var start = null;
        function step(timestamp){
            if (!start) start = timestamp;
            var progress = timestamp - start;
            if(progress>1000){
                item.css("opacity",1);
                item.css("transform","matrix(1,0,0,1,0,0)");
                cancelAnimationFrame(timer);
                if(callback){
                    callback && callback();
                }
            }else{
                item.css("transform","matrix(1,0,0,1,"+(500-progress/10*5)+",0)");
                item.css("opacity",progress/1000);
                requestAnimationFrame(step);
            }
        }
        var timer=requestAnimationFrame(step);
    }
    function rightMove(item,callback){
        item.css("visibility","visible");
        item.css("transform","matrix(1,0,0,1,-500,0)");
        item.css("opacity",0);
        var start = null;
        function step(timestamp){
            if (!start) start = timestamp;
            var progress = timestamp - start;
            if(progress>1000){
                item.css("opacity",1);
                item.css("transform","matrix(1,0,0,1,0,0)");
                cancelAnimationFrame(timer);
                if(callback){
                    callback && callback();
                }
            }else{
                item.css("transform","matrix(1,0,0,1,"+(-500+progress/10*5)+",0)");
                item.css("opacity",progress/1000);
                requestAnimationFrame(step);
            }
        }
        var timer=requestAnimationFrame(step);
    }

    //轮播广告圆点的动画
    function circleLi(banner,item){
        var $hoder = banner.find('.item');
        var curIndex= $hoder.index(item);//当前索引
        //获取当前li元素
        var curLi=banner.find(".carousel-indicators>li").eq(curIndex);
        var svgCircle=curLi.find(".c1");
        if(item.find(".banner_bg").hasClass("white")){
            svgCircle.attr("stroke","#fff");
        }else{
            svgCircle.attr("stroke","#333");
        }
        var percent = 0;
        var perimeter = Math.PI * 2 * 6;
        var start = null;
        function step(timestamp){
            if (!start) start = timestamp;
            var progress = timestamp - start;
            if(progress>4000){
                cancelAnimationFrame(timer);
            }else{
                percent=progress/4000;
                svgCircle.attr("stroke-dasharray",perimeter * percent + " " + perimeter * (1- percent))
                requestAnimationFrame(step);
            }
        }
        var timer=requestAnimationFrame(step);
    }

    //手机hover
	function phoneCateStyle(){
		var l=$("#oppobar>.nav").offset().left;
		$(".phone_cate").css("left",-l);
		$(".phone_cate").css("width",$(window).width()-1);
	}

	function hoverPhone(){
		$(".phone").on("mouseenter",function(){
			$(".phone_cate").show(0,function(){
                $(".hover_pic").each(function(i){
                    var that=$(this);
                    that.css("opacity",0);
                    setTimeout(function(){
                        that.css("visibility","inherit");
                        that.addClass("up");
                        var start = null;
                        function step(timestamp){
                            if (!start) start = timestamp;
                            var progress = timestamp - start;
                            if(progress>100){
                                that.css("opacity",1);
                                cancelAnimationFrame(timer);
                            }else{
                                that.css("opacity",progress/100);
                                requestAnimationFrame(step);
                            }
                        }
                        var timer=requestAnimationFrame(step);
                    },i*20)
                })
            });
			$(".header").addClass("headBg");
		})
		$(".phone").on("mouseleave",function(){
            $(".hover_pic").each(function(i){
                var that=$(this);
               setTimeout(function(){
                   that.css("visibility","hidden");
                   that.removeClass("up");
                   var start = null;
                   function step(timestamp){
                       if (!start) start = timestamp;
                       var progress = timestamp - start;
                       if(100-progress<0){
                           that.css("opacity",0);
                           cancelAnimationFrame(timer);
                       }else{
                           that.css("opacity",(100-progress)/100);
                           requestAnimationFrame(step);
                       }
                   }
                   var timer=requestAnimationFrame(step);
                },(7-i)*20)
            })
            setTimeout(function(){
                $(".phone_cate").hide();
                $(".header").removeClass("headBg");
            },500)
		})
	}
    function clickPhone(){
        $(".phone>a").on("click",function(e){
            e.preventDefault();
            if($(".phone_cate").css("display")=="none"){
                $(".phone_cate").show();
                $(".phoneDown").addClass("phoneUp");
            }else{
                $(".phone_cate").hide();
                $(".phoneDown").removeClass("phoneUp");
            }
        })
        $(".menu>a").click(function(){
            $(".phone_cate").hide();
        })
    }
})

//  图片居中显示
function center_img(){
    $(".center_img").each(function(){
        $(this).removeAttr("style");
        var imgSrc=$(this).attr("src");
        var realWidth;//真实的宽度
        var realHeight;//真实的高度
        var that=$(this);
        var setW=function(p){
            realWidth = p.width;
            realHeight = p.height;
            var pw=that.parents(".center_p").width();
            var ph=that.parents(".center_p").height();
            var sw=(ph/realHeight)*realWidth;//设置图片宽度
            if(sw>=pw){
                leftPosition=-(sw-pw)/2;
                that.css("height",ph);
                that.css("left",leftPosition);
            }else{
                that.css("width",pw);
            }
        }
        $.ajaxSetup({cache:false});
        $("<img/>").prop("src",imgSrc).load(function(){
            setW(this);
        })
        var Browser=new Object();
        Browser.userAgent=window.navigator.userAgent.toLowerCase();
        Browser.ie=/msie 8.0/.test(Browser.userAgent);
        if(Browser.ie){
            var img=new Image();
            img.onreadystatechange =function(){
                if(img.readyState=="complete"||img.readyState=="loaded"){
                    setW(this);
                }
            }
            img.src=imgSrc;
        }

    })
}


