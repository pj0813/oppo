$(function(){
    var  userId=localStorage.getItem("uid");
    if(userId!=undefined){
        location.href="index.html";
    }
    $(".tel").blur(function(){
        vtel();
    }).focus(function(){
        $(".tel_text").html("");
    })
    $(".isAgree").click(function(){
        var isAgree=$(".isAgree").is(":checked");
        if(isAgree){
            $(".agree_text").html("");
        }else{
            $(".agree_text").html("未阅读并同意");
        }
    })
    var handlerEmbed = function (captchaObj){
        $(".reg_btn").click(function () {
            var telnum=$(".tel").val();
            var agreeText=$(".agree_text").html();
            var telerror=$(".tel_text").html();
            if(telnum==""){
                $(".tel_text").html("请输入手机号码");
                return false;
            }else if(agreeText!="" ||telerror!=""){
                return false;
            }else{
                var validate = captchaObj.getValidate();
                if (!validate) {
                    $("#notice")[0].className = "show";
                    setTimeout(function () {
                        $("#notice")[0].className = "hide";
                    }, 2000);
                    return false;
                }else{
                    reg();
                }
            }
        });
        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
        captchaObj.appendTo("#embed-captcha");
        captchaObj.onReady(function () {
            $("#wait")[0].className = "hide";
        });
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    };
    $.ajax({
        // 获取id，challenge，success（是否启用failback）
        url: "web/StartCaptchaServlet.php?type=pc&t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handlerEmbed);
        }
    });
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
            url:"data/checkPhone.php",
            data:'phone='+telnum,
            success:function(data){
                if(data[0].code==-1){
                    $(".tel_text").html("");
                }else{
                    $(".tel_text").html(data[0].msg);
                }
            },
            error:function(){
                $(".tel_text").html("检测手机号码是否存在程序出错！");
                return false;
            }
        })
    }
    function reg(){
        var telnum=$(".tel").val();
        $.ajax({
            type:'POST',
            url:"data/register.php",
            data:'phone='+telnum,
            success:function(data){
                if(data[0].code<0){
                    $(".err").html(data[0].msg);
                }else{
                    $(".err").html(data[0].msg);
                    localStorage.setItem("uid",data[0].uid);
                    location.href="index.html";
                }
            },
            error:function(){
                $(".err").html("注册程序出错！");
                return false;
            }
        })
    }
})
