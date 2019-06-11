<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$phone=$_REQUEST['phone'];
    @$upwd=$_REQUEST['upwd'];
    $sql="SELECT * FROM user_list WHERE phoneNum='$phone' and pwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询手机号码与密码是否匹配失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
          echo '[{"code":-1,"msg":"手机号码或密码有误"}]';
       }else{
          $info='[{"code":1,"msg":"手机号码与密码一致"}]';
          $str=json_encode(array_merge($row,json_decode($info)));
          echo $str;
       }
    }
?>