$(function(){
    var cuid=localStorage["uid"];
    if(cuid==undefined){
        location.href="login.html";
    }
    //获取购物车信息
    $.ajax({
        type:'POST',
        url:'data/getcart.php',
        data:'uid='+cuid,
        success:function(data){
            if(data[0].code==-1){
                $(".empty_cart").show();
                $(".cart_detail").hide();
            }else{
                var cartHtml="";
                for(var i=0;i<data.length;i++){
                    cartHtml+='<div class="row cart_item" data-id="'+data[i].cid+'"><div class="col-xs-1 col-sm-2 cart_left"> <div class="row"><div class="select_item active col-xs-12 col-sm-3"><span class="iconfont icon-dagou"></span></div>';
                    cartHtml+='<div class="hidden-xs col-sm-9"><img src="'+data[i].pic+'" class="cart_img"></div></div></div>';
                    cartHtml+='<div class="col-xs-11 col-sm-10 cart_right"><div class="row cart_name"> <div class="col-xs-8 col-sm-4"><img src="'+data[i].pic+'" class="xs_cart_img">'
                    cartHtml+='<a href="shop_detail.html">'+data[i].pdtname+'</a></div><div class="col-xs-4 col-sm-2 pdt_price">￥<span>'+data[i].price+'</span></div>';
                    cartHtml+='<div class="hidden-xs col-sm-5 select_count"><div><input type="text" class="buy_count" value="'+data[i].pdtcount+'"/><span class="minus sel iconfont icon-jian"></span><span class="add sel iconfont icon-jia"></span></div></div>';
                    cartHtml+='<div class="hidden-xs col-sm-1"><span class="iconfont icon-lajixiang del"></span></div></div>';
                    if(data[i].pdtadd!=null){
                        cartHtml+='<div class="row cart_add"><div class="col-xs-8 col-sm-4"><span class="cart_labels">加价购</span><a href="#">'+data[i].pdtadd+'</a></div><div class="col-xs-4 col-sm-2 add_price">￥<span>'+data[i].addprice+'</span></div><div class="hidden-xs col-sm-5"><p>×<span class="add_count">'+data[i].pdtcount+'</span></p></div><div class="hidden-xs col-sm-1"></div></div>';
                    }
                    if(data[i].service!=null){
                        cartHtml+='<div class="row cart_service"><div class="col-xs-8 col-sm-4"><span class="cart_labels">服务</span><span>'+data[i].service+'</span></div><div class="col-xs-4 col-sm-2 service_price">￥<span>'+data[i].sprice+'</span></div><div class="hidden-xs col-sm-5"><p>×<span class="s_count">'+data[i].pdtcount+'</span></p></div><div class="hidden-xs col-sm-1"></div></div>';
                    }
                    if(data[i].zeng!=null){
                        cartHtml+='<div class="row cart_z"><div class="col-xs-12"><span class="cart_labels">赠品</span><div class="cart_z_name"><img src="'+data[i].zenpic+'"/><a href="">'+data[i].zeng+'</a></div></div></div>';
                    }
                    cartHtml+='<div class="row xs_cart_count"><div class="col-xs-10 select_count"><div><input type="text" class="buy_count" value="'+data[i].pdtcount+'"/><span class="minus sel iconfont icon-jian"></span><span class="add sel iconfont icon-jia"></span></div></div><div class="col-xs-2"><span class="iconfont icon-lajixiang del"></span></div></div></div><input type="hidden" class="item_total" value="'+data[i].allprice+'"><input type="hidden" class="all_count" value="'+data[i].allcount+'"><input type="hidden" class="huafen" value="'+(data[i].huafen!=null?data[i].huafen:0)+'"><input type="hidden" class="mx" value="'+data[i].mx+'"></div>';

                }
                $(".cart_content").html(cartHtml);
                $(".buy_count").each(function(){
                   var count=$(this).val();
                    if(count==1){
                        $(this).siblings(".minus").addClass("disable");
                    }else{
                        $(this).siblings(".add").addClass("disable");
                    }
               });
                var total=0;
                $(".item_total").each(function(){
                    total+=parseFloat($(this).val());
                })
                $(".all_price").html(total.toFixed(2));
            }
        },
        error:function(){
            console.log("查询购物车信息程序出错！")
        }
    })

    //输入数量
$(document).on('keyup paste','.buy_count', function(){
    var bc=$(this).val();
   if(bc>=2){
        $(this).val(2);
		$(this).trigger("input");
    }else if(bc==''){
        $(this).val(1);
		$(this).trigger("input");
    }
})
    //点击减少按钮
$(document).on('click','.minus',function(){
	var cinput=$(this).parents(".select_count").find(".buy_count");
    var bc=cinput.val();
	var add=$(this).parents(".select_count").find(".add");
    if(bc==2){
        cinput.val(bc-1);
		cinput.trigger("input");
    }
})
    //点击增加按钮
$(document).on('click','.add',function(){
	var cinput=$(this).parents(".select_count").find(".buy_count");
	var minus=$(this).parents(".select_count").find(".minus");
    var bc=cinput.val();
    if(bc==1){
        cinput.val(parseInt(bc)+1);
		cinput.trigger("input");
    }
})
    //数量改变引起的值的改变
$(document).on("input propertychange",'.buy_count',function(){
	var cart=$(this).parents(".cart_item");
    var cartId=cart.attr("data-id");
    var count=parseInt($(this).val());
    var add_count=cart.find(".add_count");
    var s_count=cart.find(".s_count");
    var total_item=cart.find(".item_total");
    var total_count=cart.find(".all_count");
    var total_price=total_item.val();
    var counts=total_count.val();
    var isSelect=cart.find(".select_item").hasClass("active");
    var all_price=$(".all_price").html();
    var new_price;
    if(add_count){
        add_count.html(count);
    }
    if(s_count){
        s_count.html(count);
    }
    if($(this).parents().is(".cart_name")){
        cart.find(".xs_cart_count .buy_count").val(count);
    }else{
        cart.find(".cart_name .buy_count").val(count);
    }
    if(count==1){
        new_price=total_price/2;
        ncount=counts/2;
        total_item.val(new_price);
        total_count.val(ncount);
        cart.find(".minus").addClass("disable");
        cart.find(".add").removeClass("disable");
    }else if(count==2){
        new_price=total_price*2;
        ncount=counts*2;
        total_item.val(new_price);
        total_count.val(ncount);
        cart.find(".minus").removeClass("disable");
        cart.find(".add").addClass("disable");
    }
    if(isSelect){
        var c_total=all_price-total_price+new_price;
        $(".all_price").html(c_total);
    }
    //ajax更新数据
    $.ajax({
        type:'POST',
        url:'data/updatecart.php',
        data:'uid='+cuid+'&cid='+cartId+'&pcount='+count+'&allprice='+new_price+'&allcount='+ncount,
        success:function(data){
            if(data[0].code>0){
                console.log(data[0].msg);
            }else{
                console.log(data[0].msg);
            }
        },
        error:function(){
            console.log("更新购物车信息程序出错！")
        }
    })
})
/*选择按钮*/
$(document).on('click','.select_item',function(){
	$(this).toggleClass("active");
	var cart=$(this).parents(".cart_item");
    var cartId=cart.attr("data-id");
	var t_price=parseFloat($(".all_price").html());
	var c_price=parseFloat(cart.find(".item_total").val());
	if(!$(this).hasClass("active")){

		var c_total=t_price-c_price;
		if(c_total==0){
			$(".bar").addClass("disable");
		}
	}else{
		var c_total=t_price+c_price;
		if(c_total!=0 &&$(".bar").hasClass("disable")){
			$(".bar").removeClass("disable")
		}
	}
	$(".all_price").html(c_total);
})
/*删除按钮*/
$(document).on('click','.del',function(){
	var cart=$(this).parents(".cart_item");
    var cartId=cart.attr("data-id");
    //ajax删除数据
    $.ajax({
        type:'POST',
        url:'data/delcart.php',
        data:'uid='+cuid+'&cid='+cartId,
        success:function(data){
            if(data[0].code>0){
                var c_price=parseFloat(cart.find(".item_total").val());
                var t_price=parseFloat($(".all_price").html());
                cart.remove();
                if(cart.find(".select_item").hasClass("active")){
                    var c_total=t_price-c_price;
                }else{
                    var c_total=t_price;
                }
                if($(".cart_item").length>0){
                    $(".all_price").html(c_total);
                }else{
                    $(".empty_cart").show();
                    $(".cart_detail").hide();
                }
            }else{
                console.log(data[0].msg);
            }
        },
        error:function(){
            console.log("删除购物车信息程序出错！")
        }
        })
})
    //返回
    $(".back").click(function(){
        history.go(-1);
    })
    $(".bar").click(function(){
        $(".cart_item .select_item").each(function(){
            var cart=$(this).parents(".cart_item");
            var cartId=cart.attr("data-id");
            if($(this).hasClass("active")){
                $.ajax({
                    type:'POST',
                    url:'data/updatecart_buy.php',
                    data:'uid='+cuid+'&cid='+cartId+'&isbuy='+1,
                    success:function(data){
                        if(data[0].code>0){
                            console.log(data[0].msg);
                        }else{
                            console.log(data[0].msg);
                        }
                    },
                    error:function(){
                        console.log("更新购物车物品是否付款程序出错！")
                    }
                })
            }else{
                $.ajax({
                    type:'POST',
                    url:'data/updatecart_buy.php',
                    data:'uid='+cuid+'&cid='+cartId+'&isbuy='+0,
                    success:function(data){
                        if(data[0].code>0){
                            console.log(data[0].msg);
                        }else{
                            console.log(data[0].msg);
                        }
                    },
                    error:function(){
                        console.log("更新购物车物品是否付款程序出错！")
                    }
                })
            }
        })
        if(!$(this).hasClass("disable")){
            location.href="buy.html";
        }
    })

})