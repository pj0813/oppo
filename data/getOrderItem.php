<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    @$oid=$_REQUEST['oid'];
    $sql="SELECT * FROM orders WHERE uid=$uid AND oid=$oid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询订单信息失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
           echo '[{"code":-1,"msg":"未查到相应的订单信息"}]';
       }else{
            $addrid=$row[0]["addrid"];
            $asql="SELECT * FROM addrs WHERE uid=$uid AND aid=$addrid";
            $aresult=mysqli_query($conn,$asql);
            if($aresult==false){
                echo '[{"code":-5,"msg":"查询收货地址信息失败"}]';
            }else{
                $arow=mysqli_fetch_all($aresult,MYSQLI_ASSOC);
                if($arow==null){
                    echo '[{"code":-6,"msg":"未查到相应的收货地址信息"}]';
                }else{
                    $row[0]['addr']=$arow;
                }
            }
           $dsql="SELECT * FROM order_detail WHERE orderId=$oid ORDER BY did DESC";
           $dresult=mysqli_query($conn,$dsql);
           if($dresult==false){
                 echo '[{"code":-3,"msg":"查询订单详情信息失败"}]';
           }else{
                $drow=mysqli_fetch_all($dresult,MYSQLI_ASSOC);
                if($drow==null){
                    echo '[{"code":-4,"msg":"未查到相应的订单详情信息"}]';
                }else{
                   $row[0]['detail']=$drow;
                }
           }
           $str=json_encode($row);
           echo ($str);
       }
    }
?>