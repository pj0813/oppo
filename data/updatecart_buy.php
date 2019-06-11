<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    @$cid=$_REQUEST['cid'];
    @$isbuy=$_REQUEST['isbuy'];
    $sql="UPDATE cart SET isbuy=$isbuy WHERE userid=$uid AND cid=$cid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"更新购物车信息失败"}]';
    }else{
       $count=mysqli_affected_rows($conn);
       if($count>0){
          echo '[{"code":1,"msg":"更新购物车信息成功"}]';
       }else{
          echo '[{"code":-2,"msg":"更新购物车信息不存在"}]';
       }
    }
?>