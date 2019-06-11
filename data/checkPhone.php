<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$phone=$_REQUEST['phone'];
    $sql="SELECT * FROM user_list WHERE phoneNum=$phone";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询手机号码失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
          echo '[{"code":-1,"msg":"手机号码未注册"}]';
       }else{
          echo '[{"code":1,"msg":"手机号码已注册"}]';
       }
    }
?>