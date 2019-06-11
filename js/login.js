$(function(){
    var  userId=localStorage.getItem("uid");
    if(userId!=undefined && $('.chtml').val()=='login'){
        location.href="index.html";
    }
	var r;
	if($('.chtml').val()=='shop_detail'){
		r="../";
	}else{
		r="";
	}
    $(".tel").blur(function(){
        vtel();
    }).focus(function(){
        $(".tel_text").html("");
    })
    $(".pwd").blur(function(){
        vpwd();
    }).focus(function(){
        $(".pwd_text").html("");
    })

    $(".login_btn").click(function(){
        check();
    })

    $(".register_btn").click(function(){
        location.href=r+"register.html";
    })
    function vtel(){
        var telnum=$(".tel").val();
        if(telnum==""){
            $(".tel_text").html("请输入手机号码");
        }else if(!/^1[34578]\d{9}$/.test(telnum)){
            $(".tel_text").html("手机号码格式不正确");
        }else{
            checkTel()
        }
    }
    function checkTel(){
        var telnum=$(".tel").val();
        $.ajax({
            type:'POST',
            url:r+"data/checkPhone.php",
            data:'phone='+telnum,
            success:function(data){
                if(data[0].code<0){
                    $(".tel_text").html(data[0].msg);
                }else{
                    $(".tel_text").html("");
                }
            },
            error:function(){
                $(".tel_text").html("检测手机号码是否存在程序出错！");
                return false;
            }
        })
    }
    function vpwd(){
        var pwdnum=$(".pwd").val();
        if(pwdnum==""){
            $(".pwd_text").html("请输入密码");
        }else if(pwdnum.length<6||pwdnum.length>12){
            $(".pwd_text").html("密码长度在6到12之间");
        }else{
            $(".pwd_text").html("");
        }
    }
    function checkMate(){
        var telnum=$(".tel").val();
        var pwdnum=$(".pwd").val();
        $.ajax({
            type:'POST',
            url:r+'data/checkMate.php',
            data:'phone='+telnum+'&'+'upwd='+pwdnum,
            success:function(data){
                if(data[0].code<0){
                    $(".err").html(data[0].msg);
                }else{
                    $(".err").html("");
                    localStorage.setItem("uid",data[0].uid);
                    if($(".chtml").val()=='login'){
                        location.href=r+"index.html";
                    }else if($(".nextHTML").val()=="cart"){
                        insertCart();
                    }else if($(".nextHTML").val()=="buy"){
                        location.href=r+"buy.html";
                    }
                }
            },
            error:function(){
                $(".err").html("检查手机号与密码匹配程序出错！");
                return false;
            }
        })

    }
    function check(){
        var telnum=$(".tel").val();
        var pwdnum=$(".pwd").val();
        var telerror=$(".tel_text").html();
        var pwderror=$(".pwd_text").html();
        if(telnum==""){
            $(".tel_text").html("请输入手机号码");
        }else if(pwdnum==""){
            $(".pwd_text").html("请输入密码");
        }else if(telerror=="" &&pwderror==""){
            checkMate();
        }
    }
})
