<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    @$aid=$_REQUEST['aid'];
    $isD=$_REQUEST['isdefault'];
        if($isD==1){
          $sql1="UPDATE addrs SET isdefault=0 WHERE uid=$uid AND isdefault=1";
          $result1=mysqli_query($conn,$sql1);
          if($result1==false){
             echo '[{"code":-3,"msg":"更新默认值失败"}]';
          }
        }
    $str="";
    $arr=$_POST;
    unset($arr['uid'],$arr['aid'],$arr['curaddr']);
    foreach($arr as $k=>$v){
      $str.=$k."='".$v."',";
    }
    $sqlstr=rtrim($str, ",");
    $sql="UPDATE addrs SET $sqlstr WHERE uid=$uid AND aid=$aid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"更新收货地址信息失败"}]';
    }else{
       $count=mysqli_affected_rows($conn);
       if($count>0){
          echo '[{"code":1,"msg":"更新收货地址信息成功"}]';
       }else{
          echo '[{"code":-2,"msg":"更新收货地址信息不存在"}]';
       }
    }
?>