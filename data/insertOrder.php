<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    $oid=date(ymdHis).''.mt_rand(100,999);
   $ks=array_keys($_POST["order"]);
   $vals=array_values($_POST["order"]);
   $str1=implode(",",$ks);
   $str2=implode("','",$vals);
   $sql="INSERT INTO orders (oid,".$str1.") VALUES('$oid','".$str2."')";
   $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"插入订单表失败"}]';
    }else{
       $count=mysqli_affected_rows($conn);
       if($count>0){
          $detail=$_POST["detail"];
          $dsql=[];
          for($i=0;$i<count($detail);$i++){
            $dstr1=implode(",",array_keys($detail[$i]));
            $dstr2=implode("','",array_values($detail[$i]));
            $dsql[$i]="INSERT INTO order_detail (did,orderId,".$dstr1.") VALUES(NULL,'$oid','".$dstr2."')";
            $result=mysqli_query($conn,$dsql[$i]);
            if($result==false){
               echo '[{"code":-3,"msg":"插入订单详情表失败"}]';
            }else{
              $count=mysqli_affected_rows($conn);
              if($count==0){
                 echo '[{"code":-4,"msg":"插入订单详情表不成功"}]';
              }
            }
          }
          echo '[{"code":1,"msg":"插入订单表、订单详情表成功","oid":'.$oid.'}]';
       }else{
          echo '[{"code":-2,"msg":"插入订单表不成功"}]';
       }
    }
?>