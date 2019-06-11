$(function(){
    var cuid=localStorage["uid"];
    var formInit="";
    var defaultInit="";
    var arrCid=[];
    if(cuid==undefined){
        location.href="login.html";
    }
    //进入页面
    if(location.search==""){
        //从购物车获得信息
        $.ajax({
            type:'POST',
            url:'data/getcart_buy.php',
            data:'uid='+cuid+'&isbuy=1',
            success:function(data){
                if(data[0].code<0){
                    console.log(data[0].msg)
                }else{
                    var sHtml="";
                    for(var i=0;i<data.length;i++){
                        sHtml+=getPdtHtml(data[i]);
                        arrCid.push(data[i].cid);
                    }
                    $(".shp_intro").html(sHtml);
                    getprice();
                    payPrice();
                }
            },
            error:function(){
                console.log("获取立即购买信息出错！")
            }
        })
    }else{
        //从缓存中获得信息
        var sHtml=getPdtHtml(sessionStorage);
        $(".shp_intro").html(sHtml);
        getprice();
        payPrice();
    }
    //小屏幕下编辑收货地址
    $(document).on("click",".curAddr .xs_edit",function(){
        $(document.body).css("position","fixed");
        $(".addrs").addClass("addrs_fixed");
        $(".addrs_title").show();
        $(".xs_edit").hide();
        $(".edit").show();
        $(".new_addr").css("display","block");
        $(".addr").css("display","block")
    })
    $(".addr_back").click(function(){
        $(document.body).css("position","static");
        $(".addrs").removeClass("addrs_fixed");
        $(".addrs_title").hide();
        $(".addr:not(.curAddr)").hide();
        $(".curAddr .xs_edit").show();
        $(".edit").hide();
        $(".new_addr").hide();
        $(".add_addr").hide();
        $(".curAddr").show();
        $(".addr_list").css("top","");
        $(".add_addr").css("top","");
    })
    //页面结算区价格信息
    function getprice(){
        var prices=0;
        var counts=0;
        $(".item_total").each(function(){
            prices+=parseFloat($(this).val());
        })
        $(".all_count").each(function(){
            counts+=parseInt($(this).val());
        })
        $(".total_price").html("￥"+prices.toFixed(2));
        $(".total_count").html(counts);
    }
    //计算付款金额
    function payPrice(){
        var total_price=parseFloat($(".total_price").html().split("￥")[1]);
        var sale=parseFloat($(".sale_price").html().split("￥")[1]);
        var post=parseFloat($(".postage").html().split("￥")[1]);
        var p=parseFloat(total_price-sale+post);
        $(".all_price").html(p.toFixed(2));
    }
    //生成商品清单页面信息
    function getPdtHtml(pdtOp){
        var sHtml='<div class="row shp_item"><div class="hidden-xs col-sm-2 cart_left"><img src="'+pdtOp.pic+'" class="cart_img"></div>';
        sHtml+='<div class="col-sm-10 cart_right"><div class="row cart_name"><div class="col-xs-6 col-sm-5"><img src="'+pdtOp.pic+'" class="xs_cart_img">';
        sHtml+='<a href="shop_detail.html" class="pdt_name">'+pdtOp.pdtname+'</a></div>';
        sHtml+='<div class="col-xs-4 col-sm-3 pdt_price">￥<span>'+pdtOp.price+'</span></div>';
        sHtml+='<div class="col-xs-2 col-sm-4 text-right"><div>×<span class="pdt_count">'+pdtOp.pdtcount+'</span></div></div></div>';

        if(pdtOp.pdtadd!=null){
            sHtml+='<div class="row cart_add"><div class="col-xs-6 col-sm-5"><span class="cart_labels">加价购</span><a href="#" class="add_name">'+pdtOp.pdtadd+'</a></div>';
            sHtml+='<div class="col-xs-4 col-sm-3 add_price">￥<span>'+pdtOp.addprice+'</span></div>';
            sHtml+='<div class="hidden-xs col-sm-4 text-right"><div>×<span class="add_count">'+pdtOp.pdtcount+'</span></div></div></div>';
        }
        if(pdtOp.service!=null) {
        sHtml+='<div class="row cart_service"><div class="col-xs-6 col-sm-5"><span class="cart_labels">服务</span><span class="sname">'+pdtOp.service+'</span></div>';
        sHtml+='<div class="col-xs-4 col-sm-3 service_price">￥<span>'+pdtOp.sprice+'</span> </div>';
        sHtml+='<div class="hidden-xs col-sm-4 text-right"><div>×<span class="s_count">'+pdtOp.pdtcount+'</span></div></div></div>';
		}
        if(pdtOp.zeng!=null){
            sHtml+='<div class="row cart_z"><div class="col-xs-12"><div class="cart_z_name"><img src="'+pdtOp.zenpic+'"/><a href="">'+pdtOp.zeng+'</a></div></div></div>';
        }
        sHtml+='</div><input type="hidden" class="item_total" value="'+pdtOp.allprice+'"><input type="hidden" class="all_count" value="'+pdtOp.allcount+'"><input type="hidden" class="huafen" value="'+(pdtOp.huafen!=null?pdtOp.huafen:0)+'"><input type="hidden" class="mx" value="'+pdtOp.mx+'"></div>';
        return sHtml;
	}
    //收货地址
    function addrHtml(ops){
        var addrHtml='<div class="addr'+(ops.isdefault==1 ||ops.curaddr==1?' curAddr':'')+'"><p class="customer"><span class="cname">'+ops.aname+'</span>';
        addrHtml+='<span class="ctel">'+ops.atel+'</span></p>';
        addrHtml+='<p class="detail">'+(ops.isdefault==1?'<span class="default">默认</span>':'')+'<span class="detail_addr">'+ops.pro+' '+ops.city+' '+ops.dis+' '+ops.detail+'</span></p>';
        addrHtml+='<span class="iconfont icon-bianji edit" data-adrId="'+ops.aid+'"></span><span class="iconfont icon-qianjin xs_edit" data-adrId="'+ops.aid+'"></span></div>';
        return addrHtml;
    }
    //从数据库获取收货地址
    $.ajax({
        type:'GET',
        url:'data/getaddr.php',
        data:'uid='+cuid,
        success:function(data){
            if(data[0].code<0){
                console.log(data[0].msg);
            }else{
                var aHtml="";
				for(var i=0;i<data.length;i++){
                    aHtml+=addrHtml(data[i]);
				}
				$(".new_addr").before(aHtml);
                if($(".edit_addr .curAddr").length==0){
                    $(".edit_addr .addr:first").addClass("curAddr");
                }
                $(".p_name").val($(".curAddr .cname").html());
            }
        },
        error:function(){
            console.log("收货地址获取程序出错！");
        }
    })
//修改收货地址
	$(document).on("click",".edit",function(){
        console.log("aaa");
      $(".add_addr").css("display","block")
        $(".add_addr_content").removeClass("new");
		$(".add_addr_content .help-block").html("");
		$(".add_addr_content .form-group").removeClass("error");
        var p=$(this).parents(".addr");
		$(".user_name").val(p.find(".cname").html());
		$(".user_tel").val(p.find(".ctel").html());
		var addr=p.find(".detail_addr").html();
		var arr=addr.split(" ");
		$(".addr_pro").distpicker('destroy');
		$(".addr_pro").distpicker({
			province: arr[0],
			city: arr[1],
			district: arr[2]
		});
		$(".addr_detail").val(arr[3]);
		$(".city").show();
		$(".district").show();
        $(".save").attr("data-addrId",$(this).attr("data-adrid"))
        formInit=$(".add_addr_content").serialize();
        if(p.find(".default").length>0){
            defaultInit=1;
            $(".setDefault .select_item").addClass("active");
        }else {
            defaultInit=0;
            $(".setDefault .select_item").removeClass("active");
        }
        var w=window.innerWidth ||document.documentElement.clientWidth;
        if(w<=767){
            p.hide();
            p.siblings().show();
            $(".new_addr").hide();
            $(".addr_list").css("top","27rem");
            $(".add_addr").css("top","0rem");
        }else{
            $(".new_addr").show();
            $(".addr_list").css("top","");
            $(".add_addr").css("top","");
        }
	})
    //新增收货地址
	$(".new_addr").click(function(){
        $(".add_addr").show();
        var w=window.innerWidth ||document.documentElement.clientWidth;
        $(".add_addr_content").addClass("new");
        $(".city").hide();
        $(".district").hide();
        $(".setDefault .select_item").removeClass("active");
        if(w<=767){
            $(".new_addr").hide();
            $(".addr_list").css("top","27rem");
            $(".add_addr").css("top","0rem");
        }else{
            $(".new_addr").show();
            $(".addr_list").css("top","");
            $(".add_addr").css("top","");
        }
        $(".addr_pro").distpicker('reset',true);
        $(".add_addr_content input").val("");
        $(".save").removeAttr("data-addrId");
	})
	$(".province>select").change(function(){
		if(!$(this).find(":first-child").is(":selected")){
			$(".city").show();
			$(".district").show();
		}
	})
    //收货地址取消按钮
	$(".cancel").click(function(){
        var w=window.innerWidth ||document.documentElement.clientWidth;
		$(".add_addr").hide();
		$(".add_addr_content .help-block").html("")
		$(".add_addr_content .form-group").removeClass("error");
        if(w<=767){
            $(".new_addr").show();
            $(".addr_list").css("top","");
            $(".addr").show();
        }
	})
	$(".user_tel").blur(function(){
		if(!/^1[34578]\d{9}$/.test($(this).val())&&$(this).val()!=""){
            $(this).next().show();
			$(this).next().html("请输入有效的手机号码");
			$(this).parents(".form-group").addClass("error");
		}
	})
	$(".form-control").focus(function(){
		$(this).next().html("");
		$(this).parents(".form-group").removeClass("error");
	})
    //收货地址保存
	$(document).on("click",".save",function(){
		var pass=true;
		$(".add_addr_content .form-control").each(function(){
			var errInfo="";
			if($(this).val()==""){
				if($(this).hasClass("user_name")){
					errInfo="姓名不能为空";
				}
				if($(this).hasClass("user_tel")){
					errInfo="请输入有效的手机号码";
				}
				if($(this).hasClass("addr_detail")){
					errInfo="详细地址不能为空";
				}
				if($(this).prop("tagName")=="SELECT"){
					errInfo="此为必填信息。";
				}
                $(this).next().show();
				$(this).next().html(errInfo);
				$(this).parents(".form-group").addClass("error");
			}
		})
		$(".add_addr_content .form-group").each(function(){
			if($(this).hasClass("error")){
				pass=false;
				return false;
			}
		})
        var isD=0;
        if($(".setDefault .select_item").hasClass("active")){
            isD=1;
        }
		if(pass){
            var formtext = $(".add_addr_content").serialize();
             $(".add_addr_content").serialize();
            if($(".add_addr_content").hasClass("new")){
                $.ajax({
                    type: 'POST',
                    url: 'data/insertaddr.php',
                    data:formtext+'&uid='+cuid+'&isdefault='+isD,
                    success: function (data){
                        if(data[0].code>0){
                            $(".addr").removeClass("curAddr");
                            var addr=parse(decodeURI(formtext)+'&uid='+cuid+'&isdefault='+isD+'&aid='+data[0].inserId+'&curaddr=1');
                            var ahtml=addrHtml(addr);
                            if(isD==1){
                                $(".edit_addr .default").remove();
                            }
                            $(".edit_addr").prepend(ahtml);
                            $(".p_name").val($(".user_name").val());
                            $(".add_addr").hide();
                            var w=window.innerWidth ||document.documentElement.clientWidth;
                            if(w<=767){
                                $(".addr_list").css("top","");
                                $(".addr").show();
                                $(".new_addr").show();
                            }

                        }else{
                            console.log(data[0].msg);
                        }
                    },
                    error: function () {
                        console.log("插入收货地址程序出错")
                    }
                })
            }else{
                if(formtext!=formInit || isD!=defaultInit){
                    var addrid=$(this).attr("data-addrid");
                    $.ajax({
                        type: 'POST',
                        url: 'data/updateaddr.php',
                        data: formtext+'&uid='+cuid+'&aid='+addrid+'&isdefault='+isD,
                        success: function (data) {
                            if(data[0].code>0){
                                var addr=parse(decodeURI(formtext)+'&aid='+addrid+'&isdefault='+isD+'&curaddr=1');
                                var ahtml=addrHtml(addr);
                                if(isD==1){
                                    $(".edit_addr .default").remove();
                                }
                                $("[data-adrid="+addrid+"]").parents(".addr").replaceWith(ahtml);
                                $(".p_name").val($(".user_name").val());
                                $(".add_addr").hide();
                                $("[data-adrid="+addrid+"]").parents(".addr").show();
                                var w=window.innerWidth ||document.documentElement.clientWidth;
                                if(w<=767){
                                    $(".addr_list").css("top","");
                                    $(".addr").show();
                                    $(".new_addr").show();
                                }

                            }else{
                                console.log(data[0].msg);
                            }
                        },
                        error: function () {
                            console.log("插入收货地址程序出错")
                        }
                    })
                }
            }
        }
	})
    //收货地址的选择
    $(document).on("click",".addr",function(){
        $(".addr").removeClass("curAddr");
        $(this).addClass("curAddr");
        $(".p_name").val($(this).find(".cname").html())
    })
    //选择默认地址
    $(".setDefault .select_item").click(function(){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
    })
	//发票
	$(".fapiao .select_item").click(function(){
		if(!$(this).hasClass("active")){
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			if($(this).index()==0){
				$(".person").show();
				$(".company").hide()
			}else{
				$(".person").hide();
				$(".company").show()
			}
		}
	})
	$(".na_code").blur(function(){
		if(!/^[0-9A-Z]{15}$|^[0-9A-Z]{18}$|^[0-9A-Z]{20}$/.test($(this).val())&&$(this).val()!=""){
			$(this).next().html("请输入正确的15、18或20位纯数字或数字加大写字母组合。");
			$(this).parents(".form-group").addClass("error");
		}
	})
    //优惠码
    $(".discount").blur(function(){
        if(!/^\w{8,20}$/.test($(this).val())&&$(this).val()!=""){
            $(this).next().html("优惠码格式不正确");
            $(this).parents(".form-group").addClass("error");
        }
    })
    $(".discount").on("input propertychange",function(){
        if($(this).val()!=""){
            $(".use").removeClass("noallow");
        }else{
            $(".use").addClass("noallow");
        }
    })
    //使用优惠码
    $(".use").click(function(){
        if(!$(this).hasClass("noallow")){
            var saleId=$(".discount").val();
            $.ajax({
                type:'GET',
                url:'data/getsale.php',
                data:'uid='+cuid+'&sid='+saleId,
                success:function(data){
                    if(data[0].code<0){
                        console.log(data[0].msg);
                    }else{
                        console.log(data[0].state)
                        if(data[0].state==1){
                            $(".sale_price").html("-￥"+data[0].sprice);
                            payPrice();
                        }else{
                            console.log("优惠码已使用！")
                        }
                    }
                },
                error:function(){
                    console.log("获取优惠码程序出错")
                }
            })
        }

    })
    //付款
	$(".pay").click(function(e){
		var pass=true;
		e.preventDefault();
		$(".fapiao .form-control").each(function(){
			var errInfo="";
			if(!$(this).parents(".shp_f").is(":hidden")){
				if($(this).val()==""){
					if($(this).hasClass("p_name")){
						errInfo="请填写发票抬头。";
					}
					if($(this).hasClass("c_name")){
						errInfo="请填写纳税单位名称。";
					}
					if($(this).hasClass("na_code")){
						errInfo="请输入正确的15、18或20位纯数字或数字加大写字母组合。";
					}
					$(this).next().html(errInfo);
					$(this).parents(".form-group").addClass("error");
				}
			}	
		})
		$(".fuser .form-group").each(function(){
			if($(this).hasClass("error") && !$(this).is(":hidden")){
				pass=false;
				return false;
			}
		})
		if(pass){
            if(!$(".shp_sale .form-group").hasClass("error")){
                var addrId=$(".curAddr .edit").attr("data-adrid");
                var p=parseFloat($(".all_price").html()).toFixed(2);
                var status=1;//未付款
                var otime=$.myTime.CurTime();
                var hf=$(".shp_item").eq(0).find(".huafen").val();
                var arr=[];
                $(".mx").each(function(){
                    arr.push(parseInt($(this).val()));
                })
                var mxqs=Math.max.apply(null,arr);
                var orderJson={"addrid":addrId,"price":p,"status":status,"uid":cuid,"orderTime":otime,"huafen":hf,"mx":mxqs}
                if(!$(".person").is(":hidden")){
                    orderJson.fap=$(".p_name").val();
                }
                if(!$(".company").is(":hidden")){
                    orderJson.faccode=$(".na_code").val();
                    orderJson.facname=$(".c_name").val();
                }
                var detailJson=[];
                $(".shp_item").each(function(i){
                    var c=parseInt($(this).find(".pdt_count").html());
                    var n=$(this).find(".pdt_name").html();
                    var pic=$(this).find(".cart_img").attr("src");
                    detailJson[i]={"count":c,"pdtname":n,"pic":pic};
                    if($(this).find(".add_name").length>0){
                        detailJson[i].pdtadd=$(this).find(".add_name").html();
                    }
                    if($(this).find(".sname").length>0){
                        detailJson[i].service=$(this).find(".sname").html();
                    }
                    if($(this).find(".cart_z_name").length>0){
                        detailJson[i].zeng=$(this).find(".cart_z_name>a").html();
                    }
                })
                var t={"order":orderJson,"detail":detailJson};
                $.ajax({
                    type: 'POST',
                    url: 'data/insertOrder.php',
                    data:t,
                    success: function (data) {
                        if(data[0].code>0){
                            if(arrCid.length>0){
                                for(var i=0;i<arrCid.length;i++){
                                    $.ajax({
                                        type:'POST',
                                        url:'data/delcart.php',
                                        data:'uid='+cuid+'&cid='+arrCid[i],
                                        success:function(data){
                                            if(data[0].code>0){
                                                console.log("删除购物车信息成功！")
                                            }else{
                                                console.log(data[0].msg);
                                            }
                                        },
                                        error:function(){
                                            console.log("删除购物车信息程序出错！")
                                        }
                                    })
                                }
                            }
                            location.href = "pay.html?oid="+data[0].oid;
                        }else{
                            console.log(data[0].msg);
                        }
                    },
                    error: function () {
                        console.log("插入订单表程序报错")
                    }
                })
                }

            }
	})

    //将字符串转换为键值对
    function parse(str){
        var obj={};
        var objarr=str.split("&");
        for(var i=0;i<objarr.length;i++){
            var strarr=objarr[i].split("=");
            var keys=strarr[0];
            obj[keys]=strarr[1];
        }
        return obj;
    }
    //滚动地址的位置
    function addrScroll(){
        $(window).on("scroll",function(){
            var sH=$(document).scrollTop();
            var awH=$(".addrs").offset().top;
            var aH=$(".addrs").height();
            if(sH>awH+aH){
                $(".curAddr").addClass("fixed-addr");
            }else{
                $(".curAddr").removeClass("fixed-addr");
            }
        });
    }
    var w=window.innerWidth ||document.documentElement.clientWidth;
    if(w<767){
        addrScroll()
    }

    //返回
    $(".back").click(function(){
        history.go(-1);
    })
    //窗口变化大小后显示样式

    var n=0;
    $(window).resize(function() {
            var w=window.innerWidth ||document.documentElement.clientWidth;
            if(w<=767){
                addrScroll();
                if(!$(".addrs").hasClass(".addrs_fixed")){
                    $(".add_addr").hide();
                    $(".curAddr .xs_edit").show();
                    $(".edit").hide();
                    $(".new_addr").hide();
                    $(".addr:not(.curAddr)").hide();
                }else{
                    $(".addr").css("display","block");
                    $(".new_addr").css("display","block");
                    $(".addrs_title").hide();
                }
            }else{
                $(".addr_list").css("top","");
                $(".add_addr").css("top","");
                $(document.body).css("position","static");
                $(".addrs").removeClass("addrs_fixed");
                $(".addrs_title").hide();
                $(".new_addr").css("display","inline-block");
                $(".addr").css("display","inline-block");
                $(".curAddr .xs_edit").hide();
                $(".add_addr").hide();
                $(".curAddr").removeClass("fixed-addr");
                $(window).off("scroll");
            }
    })
    // 兼容IE9下的placeholder
    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $("[placeholder]").each(function(){
            var _this = $(this);
            var left = _this.css("padding-left");
            var top = _this.css("padding-top");
            _this.parent().append('<span class="placeholder" data-type="placeholder" style="left: ' + left + ';top:'+top+'">' + _this.attr("placeholder") + '</span>');

            if(_this.val() != ""){
                _this.parent().find("span.placeholder").hide();
            }
            else{
                _this.parent().find("span.placeholder").show();
            }
        }).on("focus", function(){
            $(this).parent().find("span.placeholder").hide();
        }).on("blur", function(){
            var _this = $(this);
            if(_this.val() != ""){
                _this.parent().find("span.placeholder").hide();
            }
            else{
                _this.parent().find("span.placeholder").show();
            }
        });
        // 点击表示placeholder的标签相当于触发input
        $("span.placeholder").on("click", function(){
            $(this).hide();
            $(this).siblings("[placeholder]").trigger("click");
            $(this).siblings("[placeholder]").trigger("focus");
        });
        $("[placeholder]").on("input propertychange",function(){
            if($(this).val() != ""){
                $(this).parent().find("span.placeholder").hide();
            }
            else{
                $(this).parent().find("span.placeholder").show();
            }
        })
    }
})