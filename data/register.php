<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$phone=$_REQUEST['phone'];
    $sql="INSERT INTO user_list VALUES(null,'$phone','11111111')";
    $result=mysqli_query($conn,$sql);
    $id=mysqli_insert_id($conn);
    if($result==false){
      echo '[{"code":-1,"msg":"新用户注册失败"}]';
    }else{
      echo '[{"code":0,"msg":"新用户注册成功","uid":'.$id.'}]';
    }
?>