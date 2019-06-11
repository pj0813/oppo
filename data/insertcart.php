<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
   $ks=array_keys($_POST);
   $vals=array_values($_POST);
   $str1=implode(",",$ks);
   $str2=implode("','",$vals);
   $sql="INSERT INTO cart (cid,".$str1.") VALUES(NULL,'".$str2."')";
   $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"插入购物车信息失败"}]';
    }else{
       $count=mysqli_affected_rows($conn);
       if($count>0){
          echo '[{"code":1,"msg":"插入购物车信息成功"}]';
       }else{
          echo '[{"code":-2,"msg":"插入购物车信息不成功"}]';
       }
    }
?>