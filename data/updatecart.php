<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    @$cid=$_REQUEST['cid'];
    @$aprice=$_REQUEST['allprice'];
    @$acount=$_REQUEST['allcount'];
    @$pcount=$_REQUEST['pcount'];
    $sql="UPDATE cart SET pdtcount=$pcount,allprice=$aprice,allcount=$acount WHERE userid=$uid AND cid=$cid";
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