<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    $sql="SELECT * FROM addrs WHERE uid=$uid  ORDER BY aid DESC";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询收货地址信息失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
          echo '[{"code":-1,"msg":"未查到相应的收货地址"}]';
       }else{
          $str=json_encode($row);
       		echo ($str);
       }

    }
?>