$(function(){
    var cuid=localStorage["uid"];
    if(cuid==undefined){
        location.href="login.html";
    }
    //获取页面信息
    $.ajax({
        type:'GET',
        url:'data/getOrder.php',
        data:'uid='+cuid,
        success:function(data){
            if(data[0].code<0){
                console.log(data[0].msg)
            }else{
                var oHtml="";
                var d=[];
                var Ostatus=[];
                for(var i=0;i<data.length;i++){
                    switch (data[i].status){
                        case '1':
                            Ostatus[i]="未付款";
                            break;
                        case '2':
                            Ostatus[i]="已付款";
                            break;
                        case '3':
                            Ostatus[i]="已取消";
                            break;
                        case '4':
                            Ostatus[i]="已发货";
                            break;
                        case '5':
                            Ostatus[i]="已完成";
                            break;
                    }
                    oHtml+='<div class="row order_item"><div class="col-sm-12"><div class="row order_title"><div class="col-xs-9 col-sm-10"><span>订单号:<span class="orderId"><a href="">'+data[i].oid+'</a></span></span>';
                    oHtml+='<span class="orderTime">'+$.myTime.UnixToDate(data[i].orderTime,true)+'</span></div><div class="col-xs-3 col-sm-2 text-right pay_status">'+Ostatus[i]+'</div></div>';
                    oHtml+='<div class="row order_shp"><div class="col-sm-2 order_tab hidden-xs">商品清单</div><div class="col-sm-10">';
                    var d=data[i].detail;
                    for(var j=0;j<d.length;j++){
                        oHtml+='<div class="row order_shp_item"><div class="col-sm-12"><div class="row"><div class="col-xs-3 col-sm-2"><img src="'+d[j].pic+'" alt=""/></div>';
                        oHtml+='<div class="col-xs-5"><a href="#">'+d[j].pdtname+'</a></div><div class="col-xs-4 col-sm-5">X'+d[j].count+'</div></div>';
                        if(d[j].zeng!=null){
                        oHtml+='<div class="row"><div class="col-xs-5 col-xs-push-3 col-sm-push-2"><a href="#">'+d[j].zeng+'</a></div><div class="col-xs-4 col-sm-5 col-xs-push-3 col-sm-push-2">X'+d[j].count+'</div></div>';
                        }
                        if(d[j].pdtadd!=null) {
                            oHtml += '<div class="row"><div class="col-xs-5 col-xs-push-3 col-sm-push-2"><a href="#">' + d[j].pdtadd + '</a></div><div class="col-xs-4 col-sm-5 col-xs-push-3 col-sm-push-2">X' + d[j].count + '</div></div>';
                        }
                        if(d[j].service!=null) {
                            oHtml += '<div class="row"><div class="col-xs-5 col-xs-push-3 col-sm-push-2"><span>' + d[j].service + '</span></div><div class="col-xs-4 col-sm-5 col-xs-push-3 col-sm-push-2">X' + d[j].count + '</div></div>';
                        }
                        oHtml+='</div></div>';
                    }
                    oHtml+='</div></div>'
                    oHtml+='<div class="row order_footer"><div class="col-xs-6 col-sm-2 order_tab">订单金额</div><div class="col-xs-6 col-sm-2 order_price">￥'+data[i].price+'</div>';
                    if(data[i].status=='1') {
                        oHtml += '<div class="col-xs-12 col-sm-8 order-btn text-right"><a href="" class="cancel">取消订单</a><a href="pay.html?oid=' + data[i].oid + '" class="bar">立即支付</a></div>';
                    }
                    oHtml+='</div></div></div>';
                }
                $(".content_right").append(oHtml)
            }
        },
        error:function(){
            console.log("获取所有订单程序出错")
        }
    })
    //取消按钮
    $(document).on("click",".cancel",function(e){
        e.preventDefault();
        var oid=$(this).parents(".order_item").find(".orderId>a").html();
        var oStatus=3;
        var that=$(this);
        $.ajax({
            type:'GET',
            url:'data/updateOrderStatus.php',
            data:"oid="+oid+"&status="+oStatus,
            success:function(data){
                if(data[0].code<0){
                    console.log(data[0].msg)
                }else{
                    that.parents(".order_item").find(".pay_status").html("已取消");
                    that.parents(".order_item").find(".order-btn").remove();
                }
            },
            error:function(){
                console.log("更新状态程序出错！")
            }
            })


    })
})
