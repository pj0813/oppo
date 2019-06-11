<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$oid=$_REQUEST['oid'];
    @$status=$_REQUEST['status'];
    $sql="UPDATE orders SET status=$status WHERE oid=$oid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"更新订单状态失败"}]';
    }else{
       $count=mysqli_affected_rows($conn);
       if($count>0){
          echo '[{"code":1,"msg":"更新订单状态成功"}]';
       }else{
          echo '[{"code":-2,"msg":"更新订单状态不存在"}]';
       }
    }
?>