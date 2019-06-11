$(document).ready(function(){
    //获得配件信息
    $.ajax({
        type:'GET',
        url:'data/getAccessories.php',
        success:function(data){
            if(data[0].code==undefined){
                var h="";
                var dh="";
                function tablecss(str){
                    var t=str.substr(0,2);
                    if(t=="立减"){
                        return "sale";
                    }else if(t=="新品"){
                        return "new";
                    }
                }
                for(var i=0;i<data.length;i++){
                    if(i==0){
                        h+="<li class='active'><a href='#Acs"+data[i].cid+"' data-toggle='tab'>"+data[i].catename+"</a></li>";
                    }else{
                        h+="<li><a href='#Acs"+data[i].cid+"' data-toggle='tab'>"+data[i].catename+"</a></li>";
                    }
                    dh+='<div class="tab-pane" id="Acs'+data[i].cid+'">';
                    var c=data[i].adetail;
                    for(var j=0;j<c.length;j++){
                        if(j==0 || (j-3)%4==0){
                            dh+="<div class='row'>";
                        }
                        if(j==0){
                            dh+="<div class='col-xs-12 col-sm-6 first-other'><div class='col-xs-12'>";
                            dh+="<a href=''><img src='"+c[j].pic+"'/><div class='other-desc'><p>"+c[j].accname+"</p>";
                            dh+="<p>¥"+c[j].price+"</p></div><span class='tables "+tablecss(c[j].tables)+"'>"+c[j].tables+"</span></a></div></div>";
                        }else if((j-1)%2==0){
                            dh+="<div class='col-xs-12 col-sm-6'>";
                        }
                        if(j!=0){
                            dh+="<div class='col-xs-6'>";
                            dh+="<a href=''><img src='"+c[j].pic+"'/><div class='other-desc'><p>"+c[j].accname+"</p>";
                            dh+="<p>¥"+c[j].price+"</p></div><span class='tables "+tablecss(c[j].tables)+"'>"+c[j].tables+"</span></a></div>";

                        }
                        if((j!=0 && (j-1)%2==1) ||j==c.length-1){
                            dh+="</div>";
                        }
                        if(j%4==2 ||j==c.length-1){
                            dh+="</div>";
                        }
                    }
                    dh+='</div>';
                }
                $(".other_nav>.nav").html(h);
                $(".other_detail").html(dh);
                $(".other_detail .tab-pane:first-child").addClass("active");
            }else if(data[0].code<0){
                console.log(data[0].msg);
            }
        },
        error:function(){
            console.log("获取配件程序出错")
        }
    })
    //配件选择显示
    $(document).on("mouseenter",".other_nav li",function(){
        var i=$(this).index();
        var tp=$(".other_detail>.tab-pane").eq(i);
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        tp.siblings().removeClass("active");
        tp.addClass("active");
    })
    //页面滚动动画
    scrollRun();
    $(window).scroll(function(){
        scrollRun();
    })
    function scrollRun(){
        var wst=$(window).scrollTop();
        var wh=$(window).height();
        $(".scroll_item").each(function(){
            var et=$(this).offset().top;
            if(et<wst+wh){
                $(this).addClass("sup");
            }
        })
    }
    //手机分类信息获取
    $.ajax({
        type:'GET',
        url:'data/getPhone.php',
        success:function(data){
            if(data[0].code==undefined){
                var ph="";
                var bh="";
                var k=0;
                for(var i=0;i<data.length;i++){
                    if(data[i].isBanner==1){
                        var pdata=data[i].pdetail;
                        bh+='<div class="carousel banner center_p scroll_item '+(i%2==0?"event":"odd")+'" id="P'+data[i].pcid+'"><div class="carousel-inner">';
                        var buh='';
                        buh+='<ul class="carousel-indicators">';
                        for(var j=0;j<pdata.length;j++){
                            bh+='<div class="item '+(j==0?'active':'')+' row">';
                            bh+='<div class="banner_bg"><img src="'+pdata[j].pic+'" class="center_img sm_img">';
                            bh+='<a href="pdt/'+pdata[0].pid+'.html" class="xs_img" target="_blank"><img src="'+pdata[j].xslpic+'" class="s_left"/><img src="'+pdata[j].xsrpic+'" class="s_right"/></a></div>';
                            bh+='<div class="banner_detail"><div class="col-xs-12 col-sm-6 '+(i%2==0?'col-sm-push-6':'show_right')+'"><div class="desc'+(pdata[j].isWhite==1?' textWhite':'')+'"><h3>'+data[i].pcname+'</h3><h2>'+pdata[j].psize+' ，'+pdata[j].pdesc+'</h2><div>';
                            bh+='<h3 class="price">'+pdata[j].price+'</h3><a href="pdt/'+pdata[0].pid+'.html" class="btn btn-type4 hidden-xs" target="_blank">立即购买</a></div></div></div></div></div>';
                            buh+='<li '+(j==0?'class="active"':'')+' data-target="#P'+data[i].pcid+'" data-slide-to="'+j+'" data-id="'+pdata[j].pid+'" data-color="'+pdata[j].pcolor+'" data-border-color="'+pdata[j].pbcolor+'" data-mx="'+pdata[j].mx+'" data-bgcolor="'+pdata[j].bgcolor+'"><i class="out_circle"></i><i class="circle"></i></li>';
                        }
                        bh+='</div>';
                        bh+=buh;
                        bh+='</ul></div>';
                    }else if(data[i].isBanner==0){
                        var pdata=data[i].pdetail;
                        if(pdata.length>0){
                        if(k%2==0){
                            ph+='<div class="row">';
                        }
                        ph+='<div class="col-xs-12 col-sm-6 scroll_item"><a href="pdt/'+pdata[0].pid+'.html" class="item_link" target="_blank"><div class="carousel slide banner" id="P'+data[i].pcid+'"><div class="carousel-inner">';
                        var uh="";
                        uh+='<ul class="carousel-indicators">';
                        for(var j=0;j<pdata.length;j++){
                            ph+='<div class="item '+(j==0?'active':'')+'"><div class="banner_bg"><img src="'+pdata[j].pic+'" class="phone-img sm_banner"></div></div>';
                            uh+='<li '+(j==0?'class="active"':'')+' data-target="#P'+data[i].pcid+'" data-slide-to="'+j+'" data-id="'+pdata[j].pid+'" data-size="'+pdata[j].psize+'" data-price="'+pdata[j].price+'" data-desc="'+pdata[j].pdesc+'" data-color="'+pdata[j].pcolor+'" data-border-color="'+pdata[j].pbcolor+'" data-mx="'+pdata[j].mx+'"><i class="out_circle"></i><i class="circle"></i></li>';
                        }
                        ph+='</div>';
                        uh+='</ul>';
                        ph+=uh;
                        ph+='</div><div class="phone_desc"><h3>'+data[i].pcname+'</h3><h4 class="p_desc">'+pdata[0].psize+'|'+pdata[0].pdesc+'</h4><p class="p_price">¥'+pdata[0].price+'</p></div></a></div>';
                        if(k%2==1){
                            ph+='</div>';
                        }
                        k++;
                        }
                    }
                }
                if(k%2==1){
                    ph+='</div>';
                }
                $(".product_phone").html(ph);
                $(".p_banner").html(bh);
                center_img();
                $(".p_banner>div").each(function(){
                    var c=$(this).find(".carousel-indicators li.active").data("bgcolor");
                    $(this).css("backgroundColor",c);
                })
                $(".out_circle").each(function(){
                    $(this).css("border-color",$(this).parent().data("border-color"));
                })
                $(".circle").each(function(){
                    var c=$(this).parent().data("color").split("#");
                    if(c.length==2){
                        $(this).css("background-color","#"+c[1]);
                    }else if(c.length==3){
                        $(this).css("background-image","linear-gradient(to right bottom,#"+c[1]+",#"+c[2]+")");
                        $(this).css("filter","progid:DXImageTransform.Microsoft.gradient(startColorstr=#ff"+c[1]+",endColorstr=#ff"+c[2]+")");
                    }
                })

            }if(data[0].code<0){
                console.log(data[0].msg);
            }
        },
        error:function(){
            console.log("获取手机信息出错");
        }
    })
    //选择手机
    $(document).on("click",".item_link .carousel-indicators li",function(){
        var pd=$(this).parents(".item_link").find(".phone_desc");
        pd.find(".p_desc").html($(this).data("size")+" | "+$(this).data("desc"));
        pd.find(".p_price").html("¥"+$(this).data("price"));
        $(this).parents(".item_link").attr("href","pdt/"+$(this).data("id")+".html");

    })
    $(document).on("click",".p_banner .carousel-indicators li",function(){
        var c=$(this).data("bgcolor");
        $(this).parents(".scroll_item").css("backgroundColor",c);
        $(this).parents(".scroll_item").find(".item.active .btn").attr("href","pdt/"+$(this).data("id")+".html");
        $(this).parents(".scroll_item").find(".item.active .banner_bg>.xs_img").attr("href","pdt/"+$(this).data("id")+".html");
    })
})
