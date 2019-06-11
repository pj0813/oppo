$(function(){
    //获取页面信息
    var oid=$.getUrlParam('oid');
    var cuid=localStorage["uid"];
    $.ajax({
        type:'GET',
        url:'data/getOrderItem.php',
        data:'uid='+cuid+'&oid='+oid,
        success:function(data){
            if(data[0].code<0){
                console.log(data[0].msg)
            }else{
                $(".order_price").html('￥'+data[0].price);
                var dHtml="";
                var addr=data[0].addr[0];
                var addr_detail=addr.pro+' '+addr.city+' '+addr.dis+' '+addr.detail;
                dHtml+='<div class="row"><div class="col-sm-4">'+addr.aname+'</div><div class="col-sm-4">'+addr.atel+'</div><div class="col-sm-12">'+addr_detail+'</div></div>';
                var o_detail=data[0].detail;
                for(var i=0;i<o_detail.length;i++){
                    dHtml+='<div class="row"><div class="col-sm-4">'+o_detail[i].pdtname+'</div>';
                    if(o_detail[i].zeng!=null){
                        dHtml+='<div class="col-sm-4">赠品：'+o_detail[i].zeng+'</div>';
                    }
                    if(o_detail[i].service!=null){
                        dHtml+='<div class="col-sm-4">服务：'+o_detail[i].service+'</div>';
                    }
                    if(o_detail[i].pdtadd!=null){
                        dHtml+='<div class="col-sm-4">加价购：'+o_detail[i].pdtadd+'</div>';
                    }
                    dHtml+='</div>';
                }
                $(".pay_detail_right").html(dHtml);
                var sixPrice=(data[0].price*0.6).toFixed(2);
                $(".sixPect").html(sixPrice);
                $(".fourPect").html((data[0].price*0.4).toFixed(2));
                var html=fenqi(data[0].price,data[0].mx);
                $(".xs-huabei").html(html);
                $(".sm-huabei").html(html);
                $(".other_huabei").html(fenqi(sixPrice,data[0].mx))
                if(data[0].huafen==0){
                    $(".pay_methods>li").eq(0).addClass("active");
                    $(".pay_methods>li").eq(0).find(".select_item").addClass("active");
                }else{
                    var k;
                    switch (data[0].huafen){
                        case '3':k=0;break;
                        case '6':k=1;break;
                        case '12':k=2;break;
                    }
                    $(".huabei").addClass("active");
                    $("#huabei").addClass("active");
                    $("#huabei>ul>li").eq(k).addClass("active");
                    var w=window.innerWidth ||document.documentElement.clientWidth;
                    if(w<=767){
                        $(".huabei .pay_method_item .select_item").hide();
                        $(".xs-huabei").show();
                    }
                    $(".xs-huabei>li").eq(k).find(".select_item").addClass("active");
                }
            }
        },
        error:function(){
            console.log("获取页面信息程序失败")
        }
    })
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
            if(rate==0){
                all=total;
            }else{
                all=parseFloat(total)+shouxu*qishu;
            }
            huaHtml+='<li><a href="#hua'+qishu+'" data-toggle="tab"><p>￥'+fenqiCharge+' x '+qishu+'期</p>';
            huaHtml+='<p><span class="t_price">共￥'+all+'</span><b class="'+(rate==0?"charge_0":"charge_N0")+'">手续费 ￥'+shouxu+' / 期 </b></p>'
            huaHtml+='<span class="iconfont icon-rightgou"></span><div class="select_item"><span class="iconfont icon-dagou"></span></div></a></li>';
        }
        return huaHtml;
    }
	//��������
	$(".order_detail").click(function(){
        var w=window.innerWidth ||document.documentElement.clientWidth;
		if(w<767){
			if($(this).hasClass("cur")){
				$(this).removeClass("cur");
				$(".icon-shangla").removeClass("open");
				$(".icon-xiala").addClass("open");
				$(".pay_detail_right").hide();	
			}else{
				$(this).addClass("cur");
				$(".icon-xiala").removeClass("open");
				$(".icon-shangla").addClass("open");
				$(".pay_detail_right").show();
			}
		}			
	})
		//֧����ʽ���
	$(".pay_methods").on("click","li",function(){
		$(".huabei_process").hide();
		$(".pay_desc").show();
		$(".carsh_huabei").removeClass("active");
		$(".hua_fenqi .select_item").removeClass("active");
		$(this).siblings().find(".pay_method_item .select_item").removeClass("active");
		$(this).find(".pay_method_item .select_item").addClass("active");
        var w=window.innerWidth ||document.documentElement.clientWidth;
		if($(this).hasClass("huabei")){
            if(w<767){
                $(".xs-huabei").show();
            }
			$(".huabei .pay_method_item .select_item").hide();
			if($(".xs-huabei .select_item.active").length==0){
				$(".xs-huabei .select_item:first").addClass("active");
			}
			if($("#huabei li.active").length==0){
				$("#huabei li:first").addClass("active");
			}
		}else{
            if(w<767){
                $(".huabei .pay_method_item .select_item").show();
            }
			$(".xs-huabei").hide();
		}		
	})
	$(".xs-huabei").on("click","li",function(){
        var w=window.innerWidth ||document.documentElement.clientWidth;
		if(w<=767){
			$(this).siblings().find(".select_item").removeClass("active");
			$(this).find(".select_item").addClass("active");
			var i=$(this).index();
			$("#huabei li").eq(i).siblings().removeClass("active");
			$("#huabei li").eq(i).addClass("active");
		}	
	})
	$(".other_huabei").on("click","li",function(){
		$(this).siblings().find(".select_item").removeClass("active");
		$(this).find(".select_item").addClass("active");
		
	})
	//����֧����ʽ-�ֽ���
	$(".hua_fenqi").click(function(e){
		e.preventDefault();
		$(this).addClass("active");
		$(".huabei_process").show();
		$(".pay_methods>li").each(function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active")
			}
		})
		$(".pay_desc").hide();
		$(".pay_methods .select_item").removeClass("active");
		$(".xs-huabei").hide();
		$(this).find(".select_item").hide();
		if($(".other_huabei .select_item.active").length==0){
			$(".other_huabei .select_item:first").addClass("active");
		}
        var w=window.innerWidth ||document.documentElement.clientWidth;
		if(w<=767){
			$(".huabei .pay_method_item .select_item").show();
		}
	})
    $("#huabei>ul").on('click','li',function(){
		var i=$(this).index();
		$(".xs-huabei li").eq(i).siblings().find(".select_item").removeClass("active");
		$(".xs-huabei li").eq(i).find(".select_item").addClass("active");
	})
	$(window).resize(function() {
        var w=window.innerWidth ||document.documentElement.clientWidth;
		if(w>767){
			$(".xs-huabei").hide();
			$(".huabei .pay_method_item .select_item").hide();
            $(".pay_detail_right").show();
		}else{
			if($(".huabei").hasClass("active")){
				$(".xs-huabei").show();
			}else{
                $(".huabei .select_item").show();
            }
           if($(".icon-xiala").hasClass("open")){
               $(".pay_detail_right").hide();
           }
		}
	})
    //返回
    $(".back").click(function(){
        history.go(-1);
    })
})