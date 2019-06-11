<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    $isD=$_REQUEST['isdefault'];
    $uid=$_REQUEST['uid'];
    if($isD==1){
      $sql1="UPDATE addrs SET isdefault=0 WHERE uid=$uid AND isdefault=1";
      $result1=mysqli_query($conn,$sql1);
      if($result1==false){
         echo '[{"code":-3,"msg":"更新默认值失败"}]';
      }
    }
    $ks=array_keys($_POST);
    $vals=array_values($_POST);
    $str1=implode(",",$ks);
    $str2=implode("','",$vals);
    $sql="INSERT INTO addrs (aid,".$str1.") VALUES(NULL,'".$str2."')";
   $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"插入收货地址信息失败"}]';
    }else{
       $count=mysqli_affected_rows($conn);
       if($count>0){
          $id=mysqli_insert_id($conn);
          echo '[{"code":1,"msg":"插入收货地址信息成功","inserId":'.$id.'}]';
       }else{
          echo '[{"code":-2,"msg":"插入收货地址信息不成功"}]';
       }
    }
?>