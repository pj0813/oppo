<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    $sql="SELECT * FROM orders WHERE uid=$uid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询订单信息失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
           echo '[{"code":-1,"msg":"未查到相应的订单信息"}]';
       }else{
            for($i=0;$i<count($row);$i++){
               $oid[$i]=$row[$i]['oid'];
               $dsql[$i]="SELECT * FROM order_detail WHERE orderId=$oid[$i] ORDER BY did DESC";
               $dresult[$i]=mysqli_query($conn,$dsql[$i]);
               if($dresult[$i]==false){
                  echo '[{"code":-3,"msg":"查询订单详情信息失败"}]';
               }else{
                  $drow[$i]=mysqli_fetch_all($dresult[$i],MYSQLI_ASSOC);
                  if($drow[$i]==null){
                     echo '[{"code":-4,"msg":"未查到相应的订单详情信息"}]';
                  }else{
                     $row[$i]['detail']=$drow[$i];
                  }
               }
            }
            $str=json_encode($row);
            echo ($str);
       }
    }
?>