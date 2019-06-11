<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    @$sid=$_REQUEST['sid'];
    $sql="SELECT * FROM sales WHERE uid=$uid AND sid='$sid'";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询优惠码信息失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
          echo '[{"code":-1,"msg":"未查到相应的优惠码"}]';
       }else{
          $str=json_encode($row);
       		echo ($str);
       }
    }
?>